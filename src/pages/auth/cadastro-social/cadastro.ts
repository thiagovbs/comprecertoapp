import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Usuario } from '../../../models/usuario';
import { GooglePlus } from '@ionic-native/google-plus';

import { HttpClient } from '@angular/common/http';
import { InfoSignPopoverComponent } from '../../../components/info-sign-popover/info-sign-popover';
import { AuthService } from '../../../services/auth.service';
import { UserLogin } from '../../../models/userLogin';

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
              public modalCtrl: ModalController,
              private authService: AuthService
              ) {
  }

  user:Usuario
  login:boolean =false;
  userLogin:UserLogin;

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
          this.userLogin ={
            username: profile.email,
            password: profile.id
          }
          if(this.loggarFacebookOuGmail(this.userLogin)){
            //loggar usuário
            this.navCtrl.setRoot('HomePage');       
          }else{
            this.AddModalAlert(profile);
          }    
        });
        //this.navCtrl.setRoot('HomePage');
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
      this.userLogin ={
        username: res.email,
        password: res.userId
      }
      
      if(this.loggarFacebookOuGmail(this.userLogin)){
        //loggar usuário
        this.navCtrl.setRoot('HomePage');       
      }else{
        this.AddModalAlert(res);
      }    
    })
    .catch(err => console.error(err));
  }
  
  cadastrar(){
    this.navCtrl.push('CadastroAppPage')
  }

  //Criar a pagina modal para o usuário preencher informações extras no cadastro pelo facebook e/ou google
  AddModalAlert( perfil){
    let profileModal = this.modalCtrl.create(InfoSignPopoverComponent, {usuario: perfil});
    profileModal.present();
  }

  //Função que retorna um boolean pra verficar se o usuário consegue ou n loggar no sistema
  loggarFacebookOuGmail(userLogin):boolean{
    this.authService.autenticar(userLogin).subscribe(response =>{
      
    })
    return this.login;
  }

}

