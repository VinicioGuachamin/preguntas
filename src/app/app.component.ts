import {Component} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {Storage} from '@ionic/storage';
import {OneSignal} from '@ionic-native/onesignal/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private storage: Storage,
        private navCtrl: NavController,
        private oneSignal: OneSignal
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.IsLogin();
            this.OneSignalPush();
        });
    }

    IsLogin() {
        this.storage.get('user').then((val) => {
            if (val == null){
              this.navCtrl.navigateRoot('/login');
            }else {
              let user = JSON.parse(val);
              if(user.idTipoUsuario == 2){
                this.navCtrl.navigateRoot('/perfil');
              } else{
                this.navCtrl.navigateRoot('/registro');
              }
            }
        });
    }

    //MÉTODO PARA CONTROLAR LAS NOTIFICACIONES PUSH DE ONESIGNAL
    OneSignalPush() {
        this.oneSignal.startInit('8c481c75-5e80-4469-a404-537271f88af1', '1088796836410');

        this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

        //CUANDO RECIBO LA NOTIFICACIÓN
        this.oneSignal.handleNotificationReceived().subscribe(() => {
        });

        //CUANDO ABRO LA NOTIFICACIÓN
        this.oneSignal.handleNotificationOpened().subscribe((resp) => {

        });

        this.oneSignal.endInit();
        this.oneSignal.getIds().then(playerId => {
            this.storage.set('playerId', JSON.stringify(playerId.userId));
            //alert(JSON.stringify(playerId.userId))
        });
    }
}
