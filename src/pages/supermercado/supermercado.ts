import { Component } from '@angular/core';
import { IonicPage, NavController, List} from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';

/**
 * Generated class for the SupermercadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  teste:boolean= false;
  
  // list of posts
  supermercados: [{desc:string,id:number,thumb:string, title:string}];

  constructor(public navCtrl: NavController, public supermercadoService:SupermercadoService) {
    
  }

  ionViewDidLoad() {
    
    this.supermercados = this.supermercadoService.getAll();
    
  }


  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }
}
