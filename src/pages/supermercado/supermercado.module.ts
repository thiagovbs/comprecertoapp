import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupermercadoPage } from './supermercado';

@NgModule({
  declarations: [
    SupermercadoPage,
  ],
  imports: [
    IonicPageModule.forChild(SupermercadoPage)
  ],
})
export class SupermercadoPageModule {}
