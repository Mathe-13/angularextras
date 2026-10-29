import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceFichero {

  public url: string =
    'https://apipostfiles.azurewebsites.net/';

  constructor(private _http: HttpClient) { }

  public subirFichero(fileContent: string) {
    let datos = {fileContent: fileContent}
    return this._http.post(this.url, datos);
  }
}