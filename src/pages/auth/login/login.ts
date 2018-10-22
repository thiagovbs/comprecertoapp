import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public menu:MenuController) {
  }


  

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

}
