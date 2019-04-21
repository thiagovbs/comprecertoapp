import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { Subcategoria } from '../../models/subcategoria.model';

import { Categoria } from '../../models/categoria.model';
import {Mercado } from '../../models/supermercado.model';

import { AlcanceService } from '../../services/alcance.service';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { SupermercadoService } from '../../services/supermercado.service';


@IonicPage()
@Component({
  selector: 'page-subcategoria',
  templateUrl: 'subcategoria.html',
})
export class SubcategoriaPage {

  categoria: Categoria;
  categoriaNome: string;

  subcategoriaNome: string = 'Todos';
  subcategorias: Subcategoria[];

  mercadoProdutos: MercadoProduto[]
  produtos: MercadoProduto[];
  filterProdutos: MercadoProduto[] = [];

  mercados:Mercado;

  constructor(
    private alcanceService: AlcanceService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private subcategoriaService: SubCategoriaService,
    private popoverCtrl: PopoverController,
    private mercadoService:SupermercadoService) {
  }

  ionViewWillEnter() {
    //retorna as categorias da pagina home
    this.categoria = this.navParams.get('cat');

    this.categoriaNome = this.categoria.nome;

    //listando as subcategorias
    this.subcategorias = this.categoria.subcategorias;

      //listar os produtos pelo mercado produto
        this.subcategoriaService.findProdutos(this.categoria.idCategoria).subscribe((resp: MercadoProduto[]) => {
          this.produtos = resp;
          console.log(this.produtos)
          if (this.produtos.length === 0) {
            this.produtos = undefined;
          }
        }, erro => {
          console.log(erro);
        }) 

  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoAlcance: boolean = false;
    if (this.alcanceService.getLocaAlcance()) {
      retornoAlcance = true;
    }
    else {
      let popover = this.popoverCtrl.create(AlcanceComponent, { showBackdrop: true, cssClass: 'custom-popover' });
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
      this.filterProdutos = this.produtos.filter((prod: MercadoProduto) => prod.produto.subcategoria.nome === sub);

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

  setSomaProduto(){

  }


}
