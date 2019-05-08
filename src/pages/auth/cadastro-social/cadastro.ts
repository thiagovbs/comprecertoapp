import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController, AlertController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Usuario } from '../../../models/usuario';
import { GooglePlus } from '@ionic-native/google-plus';
import { InfoSignPopoverComponent } from '../../../components/info-sign-popover/info-sign-popover';
import { UserLogin } from '../../../models/userLogin';
import { UsuarioService } from '../../../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private fb: Facebook,
    private googlePlus: GooglePlus,
    public modalCtrl: ModalController,
    private usuarioService: UsuarioService,
    public alertCrtl: AlertController
  ) {


  }

  user: Usuario
  login: boolean;
  userLogin: UserLogin;

  entrar() {
    this.navCtrl.setRoot('LoginPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Login Pelo Facebook
  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status === 'connected') {
          this.fb.api('me?fields=id,name,email', [])
            .then(profile => {
              this.userLogin = {
                username: profile.email,
                password: profile.id
              }
              this.usuarioService.buscarPorEmail(this.userLogin.username).subscribe((response: Usuario) => {
                this.meuAlert(response.nome);
                this.navCtrl.push('LoginPage')
              }, erro => {
                console.log("Não existe usuário")
              })
            });
          //this.navCtrl.setRoot('HomePage');
        } else {
          alert('failed');
        }
      }).catch(e => console.log('erro para logar no facebook', e))
  }


  //Login pelo Google Plus
  googleLogin() {
    this.googlePlus.login({
    })
      .then(res => {
        this.userLogin = {
          username: res.email,
          password: res.userId
        }
        this.usuarioService.buscarPorEmail(this.userLogin.username).subscribe((response: Usuario) => {
          this.meuAlert(response.nome);

          this.navCtrl.push('LoginPage')
        }, erro => {
          console.log("Não existe usuário")
        })
      })
      .catch(err => console.error(err));
  }

  cadastrar() {
    this.navCtrl.push('CadastroAppPage')
  }

  //Criar a pagina modal para o usuário preencher informações extras no cadastro pelo facebook e/ou google
  AddModalAlert(perfil) {
    let profileModal = this.modalCtrl.create(InfoSignPopoverComponent, { usuario: perfil });
    profileModal.present();
  }

  meuAlert(nome: string) {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
      message: nome + ', Você já é cadastrado em nosso sistema!',
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }

}

