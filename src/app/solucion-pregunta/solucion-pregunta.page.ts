import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-solucion-pregunta',
  templateUrl: './solucion-pregunta.page.html',
  styleUrls: ['./solucion-pregunta.page.scss'],
})
export class SolucionPreguntaPage implements OnInit {

  itemPregunta: any = {
    id: '',
    descripcion: '',
    imagen: '',
    pregunta_abierta: '',
    resolucion: ''
  };

  constructor(public route: Router) {}

  ngOnInit() {
    console.log(this.route.getCurrentNavigation().extras.state);
    this.itemPregunta = this.route.getCurrentNavigation().extras.state;
  }

}
