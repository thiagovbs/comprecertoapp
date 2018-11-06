import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthService } from '../services/auth.service';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'CadastroPage';
  

  pages: Array<{title: string, component: any, icon:string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private authService:AuthService) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon:'assets/icon/home.svg' },
      { title: 'Minha Sacola', component: 'SacolaPage' , icon:'assets/icon/minha-sacola.svg'},
      { title: 'Supermercados', component: 'SupermercadoPage', icon:'assets/icon/supermercado.svg'},
      { title: 'Alcance', component: 'HomePage', icon:'assets/icon/alcance.svg' },
      { title: 'Sugestões', component: 'SugestaoPage', icon:'assets/icon/sugestao.svg'},
      { title: 'Promoção', component: 'PromocaoPage', icon:'assets/icon/promocao.svg'},
      { title: 'Política de privacidade', component: 'PoliticaPrivacidadePage', icon:'assets/icon/politica-privacidade.svg'}
      
    ];

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
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

    // view my profile
    viewMyProfile() {
      this.nav.setRoot('HomePage');
    }

    sair(){
      this.authService.logout();
      this.nav.setRoot('CadastroPage');
    }
}
