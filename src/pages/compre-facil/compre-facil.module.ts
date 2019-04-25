import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompreFacilPage } from './compre-facil';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    CompreFacilPage,
    
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(CompreFacilPage),
  ],


})
export class CompreFacilPageModule {}
