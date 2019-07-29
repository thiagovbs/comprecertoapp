import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoPedidosPage } from './historico-pedidos';
import { PedidosService } from '../../services/pedidos.service';

@NgModule({
  declarations: [
    HistoricoPedidosPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoPedidosPage),   
  ],
  providers: [
    PedidosService
  ]
})
export class HistoricoPedidosPageModule {}
