import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, ModalController, AlertController, LoadingController, Loading, Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Usuario } from '../../../models/usuario';
import { GooglePlus } from '@ionic-native/google-plus';
import { InfoSignPopoverComponent } from '../../../components/info-sign-popover/info-sign-popover';
import { UserLogin } from '../../../models/userLogin';
import { UsuarioService } from '../../../services/usuario.service';
import { AuthService } from '../../../services/auth.service';

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
    public alertCrtl: AlertController,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private events: Events
  ) {


  }

  user: Usuario
  login: boolean;
  userLogin: UserLogin;

  entrar() {
    this.navCtrl.push('LoginPage');
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Login Pelo Facebook
  fbLogin() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        if (res.status === 'connected') {
          this.fb.api('me?fields=id,name,email', [])
            .then(profile => {
              console.log(profile)
              this.userLogin = {
                nome: profile.name,
                username: profile.email,
                password: profile.id
              }
              //Veirifica se o usuário existe no banco
              this.usuarioService.buscarPorEmail(this.userLogin.username).subscribe((response: Usuario) => {
                let loading: Loading = this.showLoading();
                this.meuAlert(response.nome);
                console.log(response)
                //Loggar Usuario automaticamente
                this.authService.autenticar(this.userLogin).subscribe(resp => {
                  loading.dismiss();
                  //armazena informações no localStorage
                  this.authService.armazenarToken(resp['access_token']);
                  this.authService.armazenarRefreshToken(resp['refresh_token']);
                  this.authService.successfullLogin(resp);
                  this.events.publish('user:LoggedIn')
                  this.navCtrl.setRoot('HomePage')
                  console.log("usuario loggado")
                }, err => {
                  loading.dismiss();
                  console.log(err)
                })

              }, erro => {
                this.AddModalAlert(this.userLogin);
              })
            });
        } else {
          alert('failed');
        }
      }).catch(e => console.log('erro para logar no facebook', e))
  }


  //Login pelo Google Plus
  googleLogin() {
    let loading: Loading = this.showLoading();
    this.googlePlus.login({
    })
      .then(res => {
        loading.dismiss();
        this.userLogin = {
          nome: res.displayName,
          username: res.email,
          password: res.userId
        }
        //buscar usuario no banco
        this.usuarioService.buscarPorEmail(this.userLogin.username).subscribe((response: Usuario) => {
          let loading: Loading = this.showLoading();
          console.log("achei o usuario")
          //loggar usuario caso exista
          this.authService.autenticar(this.userLogin).subscribe(resp => {
            loading.dismiss();
            //armazena informações no localStorage
            this.authService.armazenarToken(resp['access_token']);
            this.authService.armazenarRefreshToken(resp['refresh_token']);
            this.authService.successfullLogin(resp);
            this.events.publish('user:LoggedIn');
            this.navCtrl.setRoot('HomePage');
            
          }, err => {
            loading.dismiss();
            console.log(err)
          })

        }, erro => {
          loading.dismiss();
          this.AddModalAlert(this.userLogin);
        })
      })
      .catch(
        err => {
          loading.dismiss();
          console.error(err);
        });
  }

  cadastrar() {
    this.navCtrl.push('CadastroAppPage')
  }

  //Criar a pagina modal para o usuário preencher informações extras no cadastro pelo facebook e/ou google
  private AddModalAlert(perfil) {
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

  //metodo que retorna um loading na tela
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    })
    loading.present();
    return loading;
  }

}

