import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { UserLogin } from '../../../models/userLogin';
import { AuthService } from '../../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login:UserLogin;
  
  

  constructor(public navCtrl: NavController,
              public menu:MenuController,
              public authService:AuthService) {
    this.login ={username:"",
                password:"",
                acessToken:""
              }
              
  
  }

  loggar(){
    this.authService.autenticar(this.login)
    .subscribe(response =>{
      console.log("ok");
      console.log(response.headers.get('Authorization'));
    }); 

  }
  

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  cadastrar(){
    this.navCtrl.push('CadastroAppPage')
  }


  
}
