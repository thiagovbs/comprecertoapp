import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Mercado } from '../../models/supermercado.model';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-supermercado-detalhe',
  templateUrl: 'supermercado-detalhe.html',
})
export class SupermercadoDetalhePage {

  categorias: Observable<Categoria[]>;
  mercado: Mercado
  mercadoNome: string;
  bucketS3: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private categoriaService: CategoriaService) {
  }


  ionViewDidLoad() {
    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;
    //Carregando as Categorias
    this.categorias = this.categoriaService.categorias;

    this.mercado = this.navParams.get('mercado');
    this.mercadoNome = this.mercado.nomeFantasia

  }


  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

}
