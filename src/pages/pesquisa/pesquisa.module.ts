import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaPage } from './pesquisa';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PesquisaPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PesquisaPage),
  ],
})
export class PesquisaPageModule {}
