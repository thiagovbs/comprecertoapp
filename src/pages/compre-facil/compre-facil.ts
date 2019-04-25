import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverInfoCompraFacilComponent } from '../../components/popover-info-compra-facil/popover-info-compra-facil';
import { FormCompraFacilPopoverComponent } from '../../components/form-compra-facil-popover/form-compra-facil-popover';


@IonicPage()
@Component({
  selector: 'page-compre-facil',
  templateUrl: 'compre-facil.html',
})
export class CompreFacilPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
  }

   showInfoCompraFacil(){
    let popover = this.popoverCtrl.create(PopoverInfoCompraFacilComponent,{},{cssClass:'compra-facil'});
    popover.present();
   }

   showFormCompraFacil(ev){
    let popover = this.popoverCtrl.create(FormCompraFacilPopoverComponent,{},{cssClass:'form-compra-facil'});
    popover.present();
   }
     
    
  
}
