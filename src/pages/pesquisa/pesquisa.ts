import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { MercadoProduto } from '../../models/mercado-produto.model';



@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {

  produtos: MercadoProduto[];
  filterProdutos: MercadoProduto[];  
  searchTerm: string;
  possuiMercadoNome: boolean;
  categoriaNome: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public mercadoProdutosService: SubCategoriaService) {
  }

  ionViewDidLoad() {

    this.possuiMercadoNome = false;
    this.produtos = null;
  
    this.filterProdutos =[]
    this.mercadoProdutosService.findProdutos()
      .subscribe((response: MercadoProduto[]) => {
        this.produtos = response;
      }, erro => { })
  }


  filtrarProduto(){
    if (this.searchTerm && this.filterProdutos) {
      this.filterProdutos = this.produtos.filter((produto: MercadoProduto) => (produto.nomeProduto.toLowerCase()
        .indexOf(this.searchTerm.toLowerCase()) > -1));
        if(this.filterProdutos.length === 0){
              
          this.filterProdutos = undefined
        }
          
    }else{
      
      this.filterProdutos = undefined
    }
  }

  changeInput(){   
    this.filterProdutos = [];
  }
}
