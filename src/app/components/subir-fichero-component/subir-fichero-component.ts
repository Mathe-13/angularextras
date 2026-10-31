import { ChangeDetectorRef, Component } from '@angular/core';
import { ServiceFichero } from '../../services/service.fichero';
import { Fichero } from '../../models/fichero';

@Component({
  selector: 'app-subir-fichero-component',
  standalone: false,
  templateUrl: './subir-fichero-component.html',
  styleUrl: './subir-fichero-component.css',
})
export class SubirFicheroComponent {
  public fichero: File | null;
  public fileContent: string;
  public mensaje: string;
  public subiendo: boolean;

  constructor(
    private _service: ServiceFichero,
    private _cdr: ChangeDetectorRef
  ) {
    this.fichero = null;
    this.fileContent = '';
    this.mensaje = '';
    this.subiendo = false;
  }

  // Seleccionamos una imagen y la convertimos a Base64
  public seleccionarFichero(event: Event): void {
    let input = event.target as HTMLInputElement;
    this.fichero = null;
    this.fileContent = '';
    this.mensaje = '';
    if (input.files && input.files.length > 0) {
      let archivo = input.files[0];
      // Comprobamos que sea una imagen
      if (!archivo.type.startsWith('image/')) {
        this.mensaje = 'Debes seleccionar una imagen';
        return
      }

      // Creamos un lector de ficheros para navegador, esto se ha buscado
      //NO SE DIO EN CLASE
      let reader = new FileReader();
      //onload se ejecuta cuando termina la lectura
      reader.onload = () => {
        let resultado = reader.result as string;
        // Extraemos solamente el Base64
        let base64 = resultado.split(',')[1];
        //Elimina la cabecera y obtiene 
        //los datos Base64 que necesitamos enviar
        if (!base64) {
          this.mensaje = 'Error al convertir la imagen';
          this._cdr.detectChanges();
          return
        }

        this.fichero = archivo;
        this.fileContent = base64;
        this.mensaje = 'Imagen preparada correctamente';
        console.log('Nombre:', archivo.name);
        console.log('Imagen convertida a Base64');
        this._cdr.detectChanges();
      }

      reader.onerror = () => {
        this.mensaje = 'Error al leer la imagen';
        this._cdr.detectChanges();
      }
      reader.readAsDataURL(archivo);
      //Lee la imagen y la presenta mediante 
      //una cadena que contiene Base64
    }
  }

  // Enviamos la imagen al servidor
  public subirFichero(): void {
    if (this.subiendo) {return}
    if (this.fichero == null || this.fileContent == '') {
      this.mensaje = 'Selecciona primero una imagen';
      return
    }

    // Creamos el modelo con los datos de la imagen
    let archivo = new Fichero(
      this.fichero.name,
      this.fileContent
    )
    this.subiendo = true;
    this.mensaje = 'Subiendo imagen...';
    // Llamamos al servicio
    this._service.subirFichero(archivo).subscribe({
      next: (response) => {
        console.log('Respuesta de la API:', response);
        console.log('Nombre enviado:', archivo.fileName);
        this.mensaje = 'Respuesta del servidor: ' + response;
        this.subiendo = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.log('Error de la API:', error);
        this.mensaje =
          'Error al subir la imagen. Código: ' +
          error.status;
        this.subiendo = false;
        this._cdr.detectChanges();
      }
    })
  }
}
