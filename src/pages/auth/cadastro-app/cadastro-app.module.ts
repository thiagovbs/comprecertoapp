import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAppPage } from './cadastro-app';

@NgModule({
  declarations: [
    CadastroAppPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAppPage),
  ],
})
export class CadastroAppPageModule {}
