import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Usuario} from '../clases/usuario';
//import {} from '@ionic-native'

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

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

    CrearUsuario(user: Usuario) {
        return this.http.post(this.url + 'CrearUsuario.php', user, this.httpOptions);
    }

    Login(cedula:any, pass: any) {
        let user = JSON.stringify({
            cedula: cedula,
            pass: pass
        });
        return this.http.post(this.url + 'Login.php', user, this.httpOptions);
    }

    GetUserById(id: any){
        let user = JSON.stringify({
            id: id
        });
        return this.http.post(this.url + 'GetUserById.php', user, this.httpOptions);
    }

    EditNotaGrado(id:any, nota_grado: any) {
        let user = JSON.stringify({
            id: id,
            nota_grado: nota_grado
        });
        return this.http.post(this.url + 'EditNotaGrado.php', user, this.httpOptions);
    }
}
