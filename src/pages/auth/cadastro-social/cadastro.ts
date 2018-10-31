import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Usuario } from '../../../models/usuario';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController,
              public menu:MenuController,
              private fb:Facebook) {
  }

  user:Usuario

  entrar(){
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  fbLogin(){
    this.fb.login(['public_profile','user_friends','email'])
    .then((res:FacebookLoginResponse) =>{
      if(res.status ==='connected'){
        this.fb.api('me?fields=id,name,email', [])
        .then(profile => {
          this.user = {
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
}
