import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompreFacilPage } from './compre-facil';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    CompreFacilPage,
    
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CompreFacilPage),
    PipesModule
  ],


})
export class CompreFacilPageModule {}
