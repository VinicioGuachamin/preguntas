import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Md5} from 'ts-md5';
import {Usuario} from '../clases/usuario';
import {UsuarioService} from '../servicios/usuario.service';
import {NavController} from '@ionic/angular';
import {GlobalService} from '../servicios/global.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    registroForm: FormGroup;
    usuario: Usuario = {
        id: '',
        usuario: '',
        pass: '',
        cedula: '',
        nombres: '',
        apellidos: '',
        correo: '',
        token: '',
        idTipoUsuario: '',
        codigo: '',
        nota_grado: '',
        estado: ''
    };

    constructor(public formBuilder: FormBuilder,
                private srvUsuario: UsuarioService,
                private navCtrl: NavController,
                public srvGlobal: GlobalService,
                private storage: Storage) {

        this.registroForm = this.formBuilder.group({
            cedula: new FormControl('', Validators.compose([Validators.required])),
            nombre: new FormControl('', Validators.compose([Validators.required])),
            apellido: new FormControl('', Validators.compose([Validators.required])),
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            edad: new FormControl('', Validators.compose([Validators.required])),
            pwd: new FormControl('', Validators.compose([Validators.required])),
            //fecha: new FormControl('',Validators.compose([Validators.required])),

        });
    }

    ngOnInit() {
    }

    Registrar(value: any) {

        this.usuario.usuario = value.cedula;
        this.usuario.pass = Md5.hashStr(value.pwd);
        this.usuario.cedula = value.cedula;
        this.usuario.nombres = value.nombre;
        this.usuario.apellidos = value.apellido;
        this.usuario.correo = value.email;
        this.usuario.token = null;
        this.usuario.idTipoUsuario = 2; // 1 = Admin, 2 = Estudiante
        this.usuario.codigo = null;
        this.usuario.nota_grado = null;
        this.usuario.estado = 1; // 1 = Activo, 0 = Inactivo

        console.log(this.usuario);

        this.srvUsuario.CrearUsuario(this.usuario).subscribe(resp => {
            console.log(resp);
            if (resp == 1) {
                this.navCtrl.navigateForward('/login');
                this.srvGlobal.ShowToast("Usuario guardado exitosamente", "success", "bottom");
            } else {
                this.srvGlobal.ShowToast("Error: Usuario no registrado, intentelo nuevamente", "danger", "bottom");
            }
        });
    }

    ExitApp() {
        this.storage.clear();
        this.navCtrl.navigateRoot('login');
    }
}
