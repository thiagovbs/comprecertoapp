import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import { AlcanceComponent } from '../components/alcance/alcance';
import { Usuario } from '../models/usuario';
import {Events} from 'ionic-angular';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>;
  user: Usuario;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private authService: AuthService,
    private userService: UsuarioService,
    public popoverCtrl: PopoverController,
    public events:Events) {

    this.user  =this.userService.getLocalUser();

    if (this.userService.getLocalUser() !== null) {
      this.rootPage = "HomePage";
    } else {
      this.rootPage = "CadastroPage";
    }

    events.subscribe('user:LoggedIn',()=>{
      this.user =this.userService.getLocalUser();
    })
    
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'assets/icon/home_Prancheta.svg' },
      { title: 'Minha Sacola', component: 'SacolaPage', icon: 'assets/icon/Minha_sacola_Prancheta.svg' },
      { title: 'Supermercados', component: 'SupermercadoPage', icon: 'assets/icon/supermercado_Prancheta.svg' },
      { title: 'Sugestões', component: 'SugestaoPage', icon: 'assets/icon/Sugestão_Prancheta.svg' },
      { title: 'Cupons', component: 'PromocaoPage', icon: 'assets/icon/Cupons-Icon.svg' },
      { title: 'Localidade', component: 'Localidade', icon: 'assets/icon/Localidade_Prancheta.svg' },
      { title: 'Configurações', component: 'PoliticaPrivacidadePage', icon: 'assets/icon/Termo-de-uso_Prancheta.svg' }
    ];
  }

  ionViewDidLoad() {

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component === 'Localidade') {
      this.alcanceAlert()
    } else {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }

  }

  // view my profile
  viewMyProfile() {
    this.nav.setRoot('HomePage');
  }

  alcanceAlert() {
    let popover = this.popoverCtrl.create(AlcanceComponent,{}, { showBackdrop: true, cssClass: 'custom-popover' });
    popover.present();
  }

  sair() {
    this.authService.logout();
    this.nav.setRoot('CadastroPage');
  }
}
