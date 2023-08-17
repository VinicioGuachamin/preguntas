import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescripcionHistorialPageRoutingModule } from './descripcion-historial-routing.module';

import { DescripcionHistorialPage } from './descripcion-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescripcionHistorialPageRoutingModule
  ],
  declarations: [DescripcionHistorialPage]
})
export class DescripcionHistorialPageModule {}
