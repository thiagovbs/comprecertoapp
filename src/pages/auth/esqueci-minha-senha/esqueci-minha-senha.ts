import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { UserLogin } from '../../../models/userLogin';

import { UsuarioService } from '../../../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-esqueci-minha-senha',
  templateUrl: 'esqueci-minha-senha.html',
})
export class EsqueciMinhaSenhaPage {
  
  login:UserLogin = {} as UserLogin;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private usuarioService:UsuarioService,
              private alertCrtl:AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    
  }

  enviarSenha(){
    let loading: Loading = this.showLoading();
    this.usuarioService.buscarPorEmail(this.login.username)
    .subscribe(resp=>{
      loading.dismiss();
      console.log("Seu email foi enviado !")
    },erro=>{
      loading.dismiss();
      this.meuAlert()
    })
  }

  meuAlert() {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
      message:  'Não achamos seu cadastro no nosso sistema!',
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    })
    loading.present();
    return loading;
  }

}
