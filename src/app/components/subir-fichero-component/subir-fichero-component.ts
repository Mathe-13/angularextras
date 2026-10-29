import { Component } from '@angular/core';
import { ServiceFichero } from '../../services/service.fichero';

@Component({
  selector: 'app-subir-fichero-component',
  standalone: false,
  templateUrl: './subir-fichero-component.html',
  styleUrl: './subir-fichero-component.css',
})
export class SubirFicheroComponent {
 public fichero: File | null = null;
  public fileContent: string = '';
  public mensaje: string = '';

  constructor(private _service: ServiceFichero) {}

  public seleccionarFichero(event: Event): void {
    let input = event.target as HTMLInputElement;
    this.fichero = null;
    this.fileContent = '';
    this.mensaje = '';
    if (input.files && input.files.length > 0) {
      let archivo = input.files[0];
      if (!archivo.type.startsWith('image/')) {
        this.mensaje = 'Selecciona una imagen';
        return
      }
      this.fichero = archivo;
      let reader = new FileReader();
      reader.onload = () => {
        let resultado = reader.result as string;
        this.fileContent = resultado.split(',')[1];
        this.mensaje = 'Imagen seleccionada correctamente';
        console.log('Imagen convertida a Base64');
      }
      
      reader.onerror = () => {
        this.mensaje = 'Error al leer la imagen';
      }

      reader.readAsDataURL(archivo);
    }
  }
  public subirFichero(): void {
    if (this.fileContent == '') {
      this.mensaje = 'Selecciona una imagen primero';
      return;
    }
    this._service.subirFichero(this.fileContent)
      .subscribe({
        next: (response) => {
          console.log(response);
          this.mensaje = 'Petición realizada correctamente';
        },
        error: (error) => {
          console.log(error);
          this.mensaje = 'Error al subir el fichero';
        }
      })
  }
}