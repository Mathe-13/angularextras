import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fichero } from '../models/fichero';

@Injectable({
  providedIn: 'root'
})
export class ServiceFichero {
  public url: string = 'https://apipostfiles.azurewebsites.net/api/TestingFiles';

  constructor(private _http: HttpClient) {}

  public subirFichero(fichero: Fichero): Observable<any> {
    let json = JSON.stringify(fichero);
    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json');
    return this._http.post(this.url,json,{headers: header, responseType:'text'})
  }
}
