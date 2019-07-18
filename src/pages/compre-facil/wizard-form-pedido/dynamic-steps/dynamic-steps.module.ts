import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DynamicStepsPage } from './dynamic-steps';
import {IonSimpleWizard} from '../../../../util/ion-simple-wizard/ion-simple-wizard.component'
import {IonSimpleWizardStep} from '../../../../util/ion-simple-wizard/ion-simple-wizard.step.component';
import { ComponentsModule } from '../../../../components/components.module';
import { BrMaskerModule } from 'brmasker-ionic-3';

@NgModule({
  declarations: [
    DynamicStepsPage,
    IonSimpleWizard,
    IonSimpleWizardStep
  ],
  imports: [
    IonicPageModule.forChild(DynamicStepsPage),
    ComponentsModule,
    BrMaskerModule
    
  ],
})
export class DynamicStepsPageModule {}
