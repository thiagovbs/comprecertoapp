import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';

@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  activeStar: Array<boolean> = [];
  
  // list of posts
  supermercados: [{desc:string,id:number,thumb:string, title:string}];
  
  ativar:boolean = false;

  constructor(public navCtrl: NavController, public supermercadoService:SupermercadoService) {
    
  }

  ionViewDidLoad() {
    
/*     this.supermercadoService.findAll().subscribe(response =>{
      console.log(response);
    }, erro =>{}) */
    this.supermercados = this.supermercadoService.getAll();
    
  }

  ActiveMercado(mercado, i){
    
    this.activeStar[i]=!this.activeStar[i]
    
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }
}
