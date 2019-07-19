import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhePedidoPage } from './detalhe-pedido';

@NgModule({
  declarations: [
    DetalhePedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhePedidoPage),
  ],
})
export class DetalhePedidoPageModule {}
