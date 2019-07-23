import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroAppPage } from './cadastro-app';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    CadastroAppPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroAppPage),
    BrMaskerModule
  ],
})
export class CadastroAppPageModule {}
