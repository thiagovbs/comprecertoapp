import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, Loading, LoadingController, Events } from 'ionic-angular';
import { UserLogin } from '../../../models/userLogin';
import { AuthService } from '../../../services/auth.service';
import { FCM } from '@ionic-native/fcm';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  login: UserLogin = {} as UserLogin;

  constructor(private navCtrl: NavController,
    private menu: MenuController,
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    private events: Events,
    private fcm: FCM) {
  }

  onPageWillLeave(): void {
    this.events.unsubscribe('user:LoggedIn');
  }

  loggar() {
    let loading: Loading = this.showLoading();
    this.authService.autenticar(this.login).
      subscribe((data: any) => {
        loading.dismiss();
        this.authService.armazenarToken(data['access_token']);
        this.authService.armazenarRefreshToken(data['refresh_token']);
        this.authService.successfullLogin(data);
        console.log(data);
        this.fcm.getToken().then(token => {
        
        });
        this.events.publish('user:LoggedIn');
        this.navCtrl.setRoot('HomePage');

      }, error => {
        loading.dismiss();
      })
  }

  ionViewWillEnter() {
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

  onMinhaSenha() {
    this.navCtrl.push('EsqueciMinhaSenhaPage')
  }
}
