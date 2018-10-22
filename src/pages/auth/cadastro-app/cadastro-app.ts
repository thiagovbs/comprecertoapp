import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-cadastro-app',
  templateUrl: 'cadastro-app.html',
})
export class CadastroAppPage {

  constructor(public navCtrl: NavController,public menu:MenuController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroAppPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
}
