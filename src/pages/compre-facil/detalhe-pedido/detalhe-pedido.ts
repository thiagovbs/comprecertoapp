import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { CarrinhoItem } from '../../../models/carrinho-item.model';



@IonicPage()
@Component({
  selector: 'page-detalhe-pedido',
  templateUrl: 'detalhe-pedido.html',
})
export class DetalhePedidoPage {
  pedidosMercado: SacolaMercados = {} as SacolaMercados;
  produtos: CarrinhoItem[] = []
  valorTotal: number;
  infoMercado: any

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private viewCtrl: ViewController) {
    this.pedidosMercado = this.navParams.get('pedido');
    this.valorTotal = this.navParams.get('valorTotal');

    this.infoMercado = this.pedidosMercado.sacolaMercado
    this.produtos = this.pedidosMercado.carrinhoItem;
    
  }

  ionViewDidLoad() {
    console.log(this.produtos)
  }

  onClose() {
    this.viewCtrl.dismiss()
  }

  getValorTotalPorProduto(produto: CarrinhoItem): number {
    return produto.produto.precoMercadoProduto * produto.quantidade;
  }


  getProdutoToCaptalized(nomeProduto: string) {
    return nomeProduto.toLowerCase();
  }
}
