import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(public toastCtrl: ToastController) { }

  //Function to showing a bar message
  async ShowToast(msg, color, positon) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: color,
      position: positon,
      buttons: [
        {
          text: 'X',
          role: 'cancel',
          handler: () => {
            // Evento al dar click
          }
        }
      ]
    });
    await toast.present();
  }

}
