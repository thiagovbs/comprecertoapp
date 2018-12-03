import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';
import { Supermercado } from '../../models/supermercado.model';

@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  activeStar: Array<boolean> = [];
  
  // list of posts
  supermercados: Supermercado;
  
  ativar:boolean = false;

  constructor(public navCtrl: NavController, public supermercadoService:SupermercadoService) {
    
  }

  ionViewDidLoad() {
    
     this.supermercadoService.findAll()
     .subscribe(response =>{
      this.supermercados = response;
    }, erro =>{}) 
  

  }

  ActiveMercado(mercado, i){
    this.activeStar[i]=!this.activeStar[i]
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }
}
