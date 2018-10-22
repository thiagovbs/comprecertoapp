import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SacolaPage } from './sacola';

import { ComponentsModule } from '../../components/components.module';




@NgModule({
  declarations: [
    SacolaPage,  
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SacolaPage),
  ],
  entryComponents: [
    
	],
})
export class SacolaPageModule {}
