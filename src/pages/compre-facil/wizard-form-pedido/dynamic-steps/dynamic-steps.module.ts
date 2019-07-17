import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicStepsPage } from './dynamic-steps';
import {IonSimpleWizard} from '../../../../util/ion-simple-wizard/ion-simple-wizard.component'
import {IonSimpleWizardStep} from '../../../../util/ion-simple-wizard/ion-simple-wizard.step.component';
import { ComponentsModule } from '../../../../components/components.module';


@NgModule({
  declarations: [
    DynamicStepsPage,
    IonSimpleWizard,
    IonSimpleWizardStep
  ],
  imports: [
    IonicPageModule.forChild(DynamicStepsPage),
    ComponentsModule
    
  ],
})
export class DynamicStepsPageModule {}
