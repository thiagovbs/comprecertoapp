import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubcategoriaPage } from './subcategoria';
import { ComponentsModule } from '../../components/components.module';




@NgModule({
  declarations: [
    SubcategoriaPage
    
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(SubcategoriaPage),
  ],
})
export class SubcategoriaPageModule {}
