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
              private authService:AuthService,
              private alertCtrl:AlertController) {
                
    this.login ={username:"",
                 password:""  }
              
  
  }

  loggar(){ 
    this.authService.autenticar(this.login).
    subscribe((data:any) =>{
      console.log(data)
      this.authService.successfullLogin(data);
      this.navCtrl.setRoot('HomePage')
    },error =>{
      let alert = this.alertCtrl.create({
          title: 'Erro',
          message: error.message,
          buttons: ['OK']
      });
      alert.present();
      });
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }
  
}
