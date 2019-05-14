import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';



@IonicPage()
@Component({
  selector: 'page-politica-privacidade',
  templateUrl: 'politica-privacidade.html',
})
export class PoliticaPrivacidadePage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private authService: AuthService) {
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }

  politicDetail(){
    this.navCtrl.push('PoliticaPrivacidadeDetailPage')
  }

  termoUsoDetail(){
    this.navCtrl.push('TermoUsoDetailPage')
  }

  sair() {
    this.authService.logout();
    this.navCtrl.setRoot('CadastroPage');
  }
}
