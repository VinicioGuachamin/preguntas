import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Historial} from '../clases/historial';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  //url: string = 'http://localhost:8080/ApiPreguntas/api/';
  //url: string = 'http://pro-academia.com/apiphp/api/';
  url: string = 'https://solinteg360.com/ApiPreguntas/api/';
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': 'text/plain, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
      //'Content-Type': 'application/json' // We send JSON
    }),
    responseType: 'text' as 'json'  // We accept plain text as response.
  };

  constructor(private http: HttpClient) {
  }

  SaveRespuestas(historial: Historial){
    return this.http.post(this.url + 'CrearHistorial.php', historial, this.httpOptions);
  }

  GetHistorialById(idUsuario: any): Observable<any> {
    let data = JSON.stringify({
      idUsuario: idUsuario
    });
    return this.http.post(this.url + 'GetHistorialById.php',data, this.httpOptions);
  }

}
