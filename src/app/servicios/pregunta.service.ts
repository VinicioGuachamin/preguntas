import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Historial} from '../clases/historial';

@Injectable({
    providedIn: 'root'
})
export class PreguntaService {

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

    GetPreguntas(pregunta_abierta: any, numRecords: any): Observable<any> {
        let data = JSON.stringify({
            pregunta_abierta: pregunta_abierta,
            numRecords: numRecords
        });
        console.log(data);
        return this.http.post(this.url + 'GetPreguntas.php',data, this.httpOptions);
    }

    GetRespuestaById(idPregunta: any): Observable<any> {
        let data = JSON.stringify({
            idPregunta: idPregunta
        });
        return this.http.post(this.url + 'GetRespuestasById.php',data, this.httpOptions);
    }

}
