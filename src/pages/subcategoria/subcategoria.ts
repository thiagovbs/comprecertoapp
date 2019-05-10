import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { Subcategoria } from '../../models/subcategoria.model';

import { Categoria } from '../../models/categoria.model';
import { Mercado } from '../../models/supermercado.model';

import { AlcanceService } from '../../services/alcance.service';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { MercadoDetalheProd, MercadoDetalheSubcategoria } from '../supermercado-detalhe/supermercado-detalhe';
import { SupermercadoService } from '../../services/supermercado.service';
import { Bairro } from '../../models/localidade';


@IonicPage()
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html',
})
export class SubcategoriaPage implements OnInit {

  categoria: Categoria;
  categoriaNome: string;


  mercadoDetalhe: MercadoDetalheProd = {} as MercadoDetalheProd
  mercadoSubCategoria: MercadoDetalheSubcategoria[] = [];

  subcategoriaNome: string = 'Todos';
  subcategorias: Subcategoria[];

  mercadoProdutos: MercadoProduto[]
  produtos: MercadoProduto[];
  filterProdutos: MercadoProduto[] = [];

  mercados: Mercado;
  dataAtual: number;

  localidade: Bairro;
  possuiMercadoNome: boolean = false;

  constructor(
    private alcanceService: AlcanceService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private subcategoriaService: SubCategoriaService,
    private popoverCtrl: PopoverController,
    private supermercadoService: SupermercadoService) {
  }

  ngOnInit() {

    this.possuiMercadoNome = false;
    this.mercadoDetalhe = this.navParams.get('mercadoDetalhe');

    //Verifica se são categorias que vem da pagina mercado-detalhe ou da Home
    if (this.mercadoDetalhe) {
      this.possuiMercadoNome = true;
      this.mercadoDetalhe.idCategoria = this.navParams.get('cat');
      this.mercadoDetalhe = this.navParams.get('mercadoDetalhe');
    } else {
      this.possuiMercadoNome = false;
      this.categoria = this.navParams.get('cat');
      this.categoriaNome = this.categoria.nome;
      this.subcategorias = this.categoria.subcategorias;
    }
  }


  ionViewWillEnter() {
    this.localidade = this.alcanceService.getLocaAlcance();
    console.log(this.localidade)
    //listar os produtos pelo mercado produto
    if (!this.mercadoDetalhe) {

      this.subcategoriaService.findProdutosPorCategoria(this.categoria.idCategoria,this.localidade.idBairro).subscribe((resp: MercadoProduto[]) => {
        this.produtos = resp;
        sortByFDestaque(this.produtos);
        sortByPreco(this.produtos)
        console.log(this.produtos)
        if (this.produtos.length === 0) {
          this.produtos = undefined;
        }
      }, erro => { })
    } else {
      this.subcategoriaService.findProdutosPorCategoriaEMercado(this.mercadoDetalhe.idCategoria, this.mercadoDetalhe.idMercado)
        .subscribe(resp => {
          this.produtos = resp;
          this.mercadoSubCategoria = this.supermercadoService
            .filtrarSubcategoriasPorMercadoProduto(this.produtos)

          sortByFDestaque(this.produtos);
          sortByPreco(this.produtos)

          if (this.produtos.length === 0) {
            this.produtos = undefined;
          }
        })
    }
    this.dataAtual = new Date().getTime();
  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoAlcance: boolean = false;
    if (this.alcanceService.getLocaAlcance()) {
      retornoAlcance = true;
    }
    else {
      let popover = this.popoverCtrl.create(AlcanceComponent, {}, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }
    return retornoAlcance
  }

  onSubCategoria(sub: string): MercadoProduto[] {
    console.log(this.possuiMercadoNome)
    this.subcategoriaNome = sub;
    //ao clicar no botão onSubCategoria o filterProdutos do html vai estar falso e o
    //conteúdo da div não vai aparecer quando houver uma subcategoria sem produto
    this.filterProdutos = undefined

    //verifica se há produtos dentro da categoria
    if (this.produtos) {
      //Filtro de produto por subcategorias
      this.filterProdutos = this.produtos.filter((prod: MercadoProduto) => {
        let dtEntrada = new Date(prod.dtValidadeMercadoProduto).getTime()

        //filtro com a data de entrada
        /* if(dtEntrada <=this.dataAtual){ */
        return prod.nomeSubcategoria === sub
        //}

      });

      if (this.filterProdutos.length === 0) {
        this.filterProdutos = undefined;
      }
    }
    return this.filterProdutos;
  }

  onTodosProdutos(): MercadoProduto[] {
    return this.produtos
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }



}
const sortByPreco = (produtos: MercadoProduto[]) => {
  produtos.sort((produtoA: MercadoProduto, produtoB: MercadoProduto) => {
    if (produtoA.precoMercadoProduto > produtoB.precoMercadoProduto) return 1;
    if (produtoA.precoMercadoProduto < produtoB.precoMercadoProduto) return -1;
    return 0;
  })
}

const sortByFDestaque = (produtos: MercadoProduto[]) => {
  produtos.sort((produtoA: MercadoProduto, produtoB: MercadoProduto) => {
    if (produtoA.fDestaqueMercadoProduto) return 1;
    if (!produtoB.fDestaqueMercadoProduto) return -1;
    return 0;
  })
}