import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Categoria } from '../../models/categoria.model';
import { API_CONFIG } from '../../config/api.config';
import { SupermercadoService } from '../../services/supermercado.service';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { AlcanceService } from '../../services/alcance.service';


@IonicPage()
@Component({
  selector: 'page-supermercado-detalhe',
  templateUrl: 'supermercado-detalhe.html',
})
export class SupermercadoDetalhePage {

  mercadoProduto: MercadoProduto[];
  //categorias: Array<number> = [];
  categorias: Observable<Categoria[]>
  mercado: any
  mercadoNome: string;
  bucketS3: string;
  mercadoCategoria: MercadoDetalheProd[] = [];
  idBairro:number

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private supermercadoService: SupermercadoService,
    private subcategoriaService: SubCategoriaService,
    private alcanceService:AlcanceService

  ) {


  }


  ionViewDidLoad() {
    
    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;

    this.idBairro =this.alcanceService.getLocaAlcance().idBairro

    //this.categorias =this.categoriaService.categorias;
    this.mercado = this.navParams.get('mercado');
    
    this.mercadoNome = this.mercado.nomeFantasia;

    this.subcategoriaService.findCategoriasPorMercadoEBairro(this.idBairro,this.mercado.idMercado)
      .subscribe((resp: MercadoDetalheProd[]) => {
        console.log(resp)
        this.mercadoCategoria = resp;
        //this.mercadoCategoria = this.supermercadoService.filtrarCategoriasPorMercadoProduto(resp);
        this.mercadoCategoria.sort((a,b)=>{
           if (a.nomeCategoria <= b.nomeCategoria) return -1
        })
      })
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  onSubCategoria(item: MercadoDetalheProd) {
    console.log(item)
    this.navCtrl.push("SubcategoriaPage", {
      cat: item.idCategoria,
      mercadoDetalhe: item,
      
    });
  }
}

export interface MercadoDetalheProd {
  idCategoria: number,
  idMercado: number,
  nomeMercado: string,
  nomeCategoria: string,
}

export interface MercadoDetalheSubcategoria {
  idCategoria:number,
  idSubcategoria:number,
  nomeSubcategoria:string
}
