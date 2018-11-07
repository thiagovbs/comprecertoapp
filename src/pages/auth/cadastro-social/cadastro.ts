import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Usuario } from '../../../models/usuario';
import { GooglePlus } from '@ionic-native/google-plus';

import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController,
              public menu:MenuController,
              private fb:Facebook,
              private googlePlus: GooglePlus,
              private http: HttpClient,
              private authService:AuthService,
              ) {
  }

  user:Usuario

  entrar(){
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }


  //Login Pelo Facebook
  fbLogin(){
    this.fb.login(['public_profile','user_friends','email'])
    .then((res:FacebookLoginResponse) =>{
      if(res.status ==='connected'){
        this.fb.api('me?fields=id,name,email', [])
        .then(profile => {
          this.user = {
            accessToken: null,
            refreshToken:null,
            email: profile['email'],
            nome: profile['name'],
            login: profile['email'],
            senha: profile['id']
          }
          console.log(this.user)
        });
       
        console.log('Logado no facebook', res)
        
        this.navCtrl.setRoot('HomePage');
      }else{
        alert('failed');
      }
      
    }).catch(e => console.log('erro para logar no facebook', e))
  }


  //Login pelo Google Plus
  googleLogin(){
    this.googlePlus.login({
    })
    .then(res => {
      this.getData(res.accessToken);
    })
    .catch(err => console.error(err));
  }

  
  getData(token){
    this.http.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+ token)
    .subscribe((data:any) => {
      console.log(data);
      this.user={
        accessToken: token,
        refreshToken: "",
        nome: data.name,
        login:data.email,
        senha:data.id,
        email:data.email
      }
    })
  }

  cadastrar(){
    this.navCtrl.push('CadastroAppPage')
  }
}
