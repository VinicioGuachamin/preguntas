import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {PreguntaService} from '../servicios/pregunta.service';
import {Storage} from '@ionic/storage';
import {Usuario} from '../clases/usuario';
import {UsuarioService} from '../servicios/usuario.service';
import {GlobalService} from '../servicios/global.service';


@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.page.html',
    styleUrls: ['./perfil.page.scss'],
})

export class PerfilPage implements OnInit {
    usercorrect: Usuario = {
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

    constructor(private navCtrl: NavController, public srvGlobal: GlobalService,
                private srvPregunta: PreguntaService,
                private srvUser: UsuarioService,
                private storage: Storage,
                private alertCtrl: AlertController) {

    }

    ngOnInit() {

        this.storage.get('user').then ((val)=>{
            this.usercorrect = JSON.parse(val);
            console.log(this.usercorrect);
            this.srvUser.GetUserById(this.usercorrect.id).subscribe((resp: any) => {
                this.usercorrect = JSON.parse(resp)[0];
                console.log(this.usercorrect);
                this.storage.set('user',JSON.stringify(this.usercorrect));
            })
        });
    }

    async EmpezarPrueba() {
          const alert = await this.alertCtrl.create({
              cssClass: 'my-custom-class',
              header: 'Confirmación',
              message: '¿Desea empezar a resolver el cuestionario?',
              buttons: [
                {
                  text: 'Cancelar',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                    console.log();
                  }
                }, {
                  text: 'Aceptar',
                  handler: () => {
                      this.navCtrl.navigateForward('/pregunta');
                    console.log('Aceptar');
                  }
                }
              ]
          });

        await alert.present();
    }

    IngresarHistorial() {
        this.navCtrl.navigateForward('/historial');
    }

    ExitApp() {
        this.storage.clear();
        this.navCtrl.navigateRoot('login');
    }

    ChangeNotaGrado(){
        this.EditNotaGrado();
    }

    async EditNotaGrado() {
        const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Edite su Nota de Grado',
            inputs: [
                {
                    name: 'Nota',
                    type: 'number',
                    placeholder: this.usercorrect.nota_grado
                }
            ],
            buttons: [
                {
                    text: 'Cancelar',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    }
                }, {
                    text: 'Guardar',
                    handler: (resp) => {
                        console.log(resp.Nota);
                        this.srvUser.EditNotaGrado(this.usercorrect.id, resp.Nota).subscribe(resp =>  {
                            console.log(resp);
                            if (resp == 1){
                                this.srvUser.GetUserById(this.usercorrect.id).subscribe((resp: any) => {
                                    this.usercorrect = JSON.parse(resp)[0];
                                    console.log(this.usercorrect);
                                    this.storage.set('user',JSON.stringify(this.usercorrect));
                                })
                            }else {
                                this.srvGlobal.ShowToast("Error: La nota no se actualizó, intente más tarde", "danger", "bottom");
                            }
                        })
                    }
                }
            ]
        });

        await alert.present();
    }
}
