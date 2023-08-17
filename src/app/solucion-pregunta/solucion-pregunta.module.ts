import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolucionPreguntaPageRoutingModule } from './solucion-pregunta-routing.module';

import { SolucionPreguntaPage } from './solucion-pregunta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolucionPreguntaPageRoutingModule
  ],
  declarations: [SolucionPreguntaPage]
})
export class SolucionPreguntaPageModule {}
