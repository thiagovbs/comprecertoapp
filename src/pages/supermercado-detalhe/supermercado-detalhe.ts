import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Mercado } from '../../models/supermercado.model';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.model';
import { CategoriaService } from '../../services/categoria.service';
import { API_CONFIG } from '../../config/api.config';
import { SupermercadoService } from '../../services/supermercado.service';
import { MercadoProduto } from '../../models/mercado-produto.model';


@IonicPage()
@Component({
  selector: 'page-supermercado-detalhe',
  templateUrl: 'supermercado-detalhe.html',
})
export class SupermercadoDetalhePage {

  mercadoProduto: MercadoProduto[];
  //categorias: Array<number> = [];
  categorias:Observable<Categoria[]>
  mercado: Mercado
  mercadoNome: string;
  bucketS3: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private mercadoService: SupermercadoService,
    private categoriaService:CategoriaService
  ) {
  }


  ionViewDidLoad() {
    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;

    this.categorias =this.categoriaService.categorias;
    this.mercado = this.navParams.get('mercado');

    this.mercadoNome = this.mercado.nomeFantasia
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  onSubCategoria(item: Categoria) {
    this.navCtrl.push("SubcategoriaPage", {
      cat: item,
      mercadoNome:  this.mercadoNome,
      mercadoId: this.mercado.idMercado
    });
  }

}
