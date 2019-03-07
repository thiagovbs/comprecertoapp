import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Loading, LoadingController } from 'ionic-angular';
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
              public loadingCtrl: LoadingController) {
                
    this.login ={username:"",
                 password:""}
              
  
  }

  loggar(){ 
    let loading: Loading = this.showLoading();
    this.authService.autenticar(this.login).
    subscribe((data:any) =>{
      loading.dismiss();
      this.authService.successfullLogin(data);
      this.navCtrl.setRoot('HomePage')
    },error =>{
      loading.dismiss();
    });
  }
  
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

    //metodo que retorna um loading na tela
    private showLoading(): Loading {
      let loading: Loading = this.loadingCtrl.create({
        content: 'Aguarde...'
      })
      loading.present();
      return loading;
    }
  
}
