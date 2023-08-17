import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescripcionHistorialPage } from './descripcion-historial.page';

const routes: Routes = [
  {
    path: '',
    component: DescripcionHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescripcionHistorialPageRoutingModule {}
