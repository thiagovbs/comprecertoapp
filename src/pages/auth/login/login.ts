import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController } from 'ionic-angular';
import { UserLogin } from '../../../models/userLogin';
import { AuthService } from '../../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login:UserLogin;
  
  constructor(private navCtrl: NavController,
              private menu:MenuController,
              private authService:AuthService) {
                
    this.login ={username:"",
                 password:""}
              
  
  }

  loggar(){ 
    this.authService.autenticar(this.login).
    subscribe((data:any) =>{
      this.authService.successfullLogin(data);
      this.navCtrl.setRoot('HomePage')
    },error =>{
    });
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  
}
