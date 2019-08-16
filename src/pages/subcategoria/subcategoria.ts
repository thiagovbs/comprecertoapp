import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, Loading } from 'ionic-angular';
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
import { PacoteTipoServico } from '../../models/pacote-tipo-servico.model';
import { CarrinhoService } from '../../services/carrinho.service';


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
  tipoServico: PacoteTipoServico[] = [];

  subcategoriaNome: string = 'Todos';
  subcategorias: Subcategoria[];

  mercadoProdutos: MercadoProduto[]
  produtos: MercadoProduto[] = [];
  filterProdutos: MercadoProduto[] = [];

  mercados: Mercado;
  dataAtual: number;

  localidade: Bairro;
  possuiMercadoNome: boolean = false;
  page: number = 0;

  constructor(
    private alcanceService: AlcanceService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private subcategoriaService: SubCategoriaService,
    private popoverCtrl: PopoverController,
    private supermercadoService: SupermercadoService,
    private carrinhoService: CarrinhoService,
    private loadingCtrl: LoadingController) {


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
    this.page = 0;
    this.produtos = []
    this.localidade = this.alcanceService.getLocaAlcance();
    //listar os produtos pelo mercado produto
    if (!this.mercadoDetalhe) {
      this.listaProdutosPorCategoria()
    } else {
      this.listaProdutosPorMercadoECategoria()
    }
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
    this.subcategoriaNome = sub;
    //ao clicar no botão onSubCategoria o filterProdutos do html vai estar falso e o
    //conteúdo da div não vai aparecer quando houver uma subcategoria sem produto
    this.filterProdutos = undefined

    //verifica se há produtos dentro da categoria
    if (this.produtos) {
      //Filtro de produto por subcategorias
      this.filterProdutos = this.produtos.filter((prod: MercadoProduto) => {
        return prod.nomeSubcategoria === sub
      });

      if (this.filterProdutos.length === 0) {
        this.filterProdutos = undefined;
      }
    }
    return this.filterProdutos;
  }

  listaProdutosPorCategoria() {
    let loader = this.presenteLoading();
    this.subcategoriaService.findProdutosPorCategoria(this.categoria.idCategoria, this.localidade.idBairro, this.page, 20)
      .subscribe((resp: MercadoProduto[]) => {
        this.produtos = this.produtos.concat(resp)
        if (this.produtos.length === 0) {
          this.produtos = undefined;
        }
        loader.dismiss()
      }, erro => { loader.dismiss() })
  }

  listaProdutosPorMercadoECategoria() {
    let loader = this.presenteLoading();
    this.subcategoriaService.findProdutosPorCategoriaEMercadoEBairro(this.localidade.idBairro,this.mercadoDetalhe.idCategoria, this.mercadoDetalhe.idMercado, this.page, 20)
      .subscribe(resp => {
        
        this.produtos = this.produtos.concat(resp)
        //Não repetir as categorias
        this.mercadoSubCategoria = this.supermercadoService
          .filtrarSubcategoriasPorMercadoProduto(this.produtos);

        if (this.produtos.length === 0) {
          this.produtos = undefined;
        }
        loader.dismiss()
      }, erro => { loader.dismiss() })
  }

  onTodosProdutos(): MercadoProduto[] {
    return this.produtos
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {})
  }

  //ao sair da tela de produtos, os itens seão adicionados no localStorage
  ionViewDidLeave() {
    this.carrinhoService.setLocalSacola()
  }

  doInfinite(infiniteScroll) {
    this.page++
    if (this.possuiMercadoNome) {
      this.listaProdutosPorMercadoECategoria()
    } else {

      this.listaProdutosPorCategoria()
    }
    setTimeout(() => {

      infiniteScroll.complete()
    }, 10000)
  }

  presenteLoading(): Loading {

    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      //content: `<img src="assets/imgs/loading3.gif" height="50px" />`,
      duration: 50000,
      cssClass: 'my-loading-class'
    });
    loading.present();
    return loading
  }


}

