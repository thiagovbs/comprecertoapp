import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PromocaoPage } from './promocao';

@NgModule({
  declarations: [
    PromocaoPage,
  ],
  imports: [
    IonicPageModule.forChild(PromocaoPage),
  ],
})
export class PromocaoPageModule {}
