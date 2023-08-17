import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {UsuarioService} from '../servicios/usuario.service';
import {Md5} from 'ts-md5';
import {GlobalService} from '../servicios/global.service';
import { LoadingController } from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: string;
    pass: string;
    userlogin: any;
    usercorrect: any;

    constructor(private navCtrl: NavController,
                private srvUsuario: UsuarioService,
                public srvGlobal: GlobalService,
                public loadingController: LoadingController,
                private storage: Storage,
                private alertCtrl: AlertController) {

    }

    ngOnInit() {

    }
    async showLoading(loadingId: string, loadingMessage: string = 'Loading...') {
        const loading = await this.loadingController.create({
            id: loadingId,
            message: loadingMessage,
            spinner: 'circles'
        });
        return await loading.present();
    }

    async dismissLoader(loadingId: string) {
        return await this.loadingController.dismiss(null, null, loadingId).then(() => console.log('loading dismissed'));
    }

    IngresarPerfil() {
        //debugger;
        console.log(Md5.hashStr(this.pass))//pro@cademia2021$
        //this.showLoading('1', 'Cargando')
        //this.navCtrl.navigateForward('/perfil');
        this.srvUsuario.Login(this.user, Md5.hashStr(this.pass)).subscribe((resp:any) => {
            console.log(JSON.parse(resp));
            this.userlogin = JSON.parse(resp);
            console.log(this.userlogin.message);
            if(this.userlogin.message==false){
                this.srvGlobal.ShowToast("Cédula o contraseña, intentelo de nuevo", "danger", "bottom");
                //this.dismissLoader('1');
            } else {
                if (this.userlogin.message == undefined && this.userlogin.length > 0) {
                    this.usercorrect = this.userlogin[0];
                    this.storage.set('user',JSON.stringify(this.usercorrect));
                    if(this.usercorrect.idTipoUsuario == 2){
                        //this.dismissLoader('1');
                        this.navCtrl.navigateRoot('/perfil');
                    } else{
                        //this.dismissLoader('1');
                        this.navCtrl.navigateRoot('/registro');
                    }
                }
            }
        },error => {
            alert(JSON.stringify(error))
        })
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
                        this.storage.set('abierta',"SinLogueo");
                        this.showLoading('2', 'Cargando');
                        setTimeout(()=> {
                            this.navCtrl.navigateForward('/pregunta');
                            this.dismissLoader('2');
                        },1000);
                    }
                }
            ]
        });

        await alert.present();
    }

}
