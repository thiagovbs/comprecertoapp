import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController, } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/categoria.model';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { AlcanceService } from '../../services/alcance.service';
import * as Lodash from "lodash";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias: Categoria[];
  mercados: Mercado[];
  bucketS3: string;
  


  constructor(public navCtrl: NavController,
    private alcanceService: AlcanceService,
    private categoriaService: CategoriaService,
    private mercadoService: SupermercadoService,
    private popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {

    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;

    //Carregando as Categorias
    this.categoriaService.findAll().subscribe(resp=>{
      this.categorias = Lodash.orderBy(resp, 'nome','asc')
    })
    
/*     //Carregando os Mercados
    this.mercadoService.findAll()
      .subscribe(response => {
        this.mercados = response;
      }, erro => { }) */

     //iniciar o popover de alcance se o alcance não estiver no localStorage
    if (!this.alcanceService.getLocaAlcance()) {
      let popover = this.popoverCtrl.create(AlcanceComponent, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }
  }

  onSubCategoria(item: Categoria) {
    this.navCtrl.push("SubcategoriaPage", {
      cat: item
    });
  }

  onMaisBarato(barato: string) {
    console.log(barato)
  }

  onMercados(mercado) {
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: mercado
    });
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }



}
