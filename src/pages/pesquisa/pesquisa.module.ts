import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PesquisaPage } from './pesquisa';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(PesquisaPage),
    
  ],
  declarations: [
    PesquisaPage,
    
  ],
  entryComponents:[
    
  ],
})
export class PesquisaPageModule {}
