import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { Subcategoria } from '../../models/subcategoria.model';
import { Produto } from '../../models/produto.model';
import { Categoria } from '../../models/categoria.model';
import { Supermercado } from '../../models/supermercado.model';
import { CarrinhoItem } from '../../models/carrinho-item.model';



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

  produtos: Produto[];
  filterProdutos: Produto[] = [];

  mercado:Supermercado[];


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private subcategoriaService: SubCategoriaService) {
  }

  ionViewWillEnter() {
    //retorna as categorias da pagina home
    this.categoria = this.navParams.get('cat');
    this.categoriaNome = this.categoria.nome;

    //listando as subcategorias
    this.subcategorias = this.categoria.subcategorias;

    //listar os produtos pela categoria
    this.subcategoriaService.findProdutosPorSubCategorias(this.categoria.idCategoria)
      .subscribe((resp: Produto[]) => {
        this.produtos = resp;
        if (this.produtos.length === 0) {
          this.produtos = undefined;
          
        }
      }, erro => { })
  }

  onSubCategoria(sub: string): Produto[] {
    this.subcategoriaNome = sub;
    //ao clicar no botão onSubCategoria o filterProdutos do html vai estar falso e o
    //conteúdo da div não vai aparecer quando houver uma subcategoria sem produto
    this.filterProdutos = undefined

    //verifica se há produtos dentro da categoria
    if (this.produtos) {
      //Filtro de produto por subcategorias
      this.filterProdutos = this.produtos.filter((prod: Produto) => prod.subcategoria.nome === sub);
      if (this.filterProdutos.length === 0) {
        this.filterProdutos = undefined;
      }
    }
    return this.filterProdutos;
  }

  onTodosProdutos(): Produto[] {
      return this.produtos
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

}
