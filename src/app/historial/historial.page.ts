import { Component, OnInit } from '@angular/core';
import {HistorialService} from '../servicios/historial.service';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  usercorrect: any;
  recordsHistorial: any = [];

  constructor(private srvHistorial: HistorialService,
              private storage: Storage) { }

  ngOnInit() {
    this.storage.get('user').then ((val)=>{
      this.usercorrect = JSON.parse(val);
      console.log(this.usercorrect);
      this.srvHistorial.GetHistorialById(this.usercorrect.id).subscribe( resp => {
        this.recordsHistorial = JSON.parse(resp);
        console.log(this.recordsHistorial);
      })
    });
  }

}
