import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';
import { Supermercado } from '../../models/supermercado.model';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  activeStar: Array<boolean> = [];
  
  supermercados: Supermercado;

  bucketS3:string

  constructor(public navCtrl: NavController, public supermercadoService:SupermercadoService) {
    
  }

  ionViewDidLoad() {
    
     this.supermercadoService.findAll()
     .subscribe(response =>{
      this.supermercados = response;
    }, erro =>{}) 

    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;
  }

  ActiveMercado(mercado, i){
    this.activeStar[i]=!this.activeStar[i]
  }

  onMercado(supermercado:Supermercado){
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: supermercado
    });
  }

  onSearch(){
    this.navCtrl.push('PesquisaPage')
  }
}
