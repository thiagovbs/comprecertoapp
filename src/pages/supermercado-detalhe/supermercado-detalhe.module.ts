import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupermercadoDetalhePage } from './supermercado-detalhe';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SupermercadoDetalhePage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SupermercadoDetalhePage),
  ],
})
export class SupermercadoDetalhePageModule {}
