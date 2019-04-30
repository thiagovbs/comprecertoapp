import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { PopoverInfoCompraFacilComponent } from '../../components/popover-info-compra-facil/popover-info-compra-facil';
import { FormCompraFacilPopoverComponent } from '../../components/form-compra-facil-popover/form-compra-facil-popover';

import { CarrinhoItem } from '../../models/carrinho-item.model';
import { SacolaMercados } from '../../models/SacolaMercados.model';
import { CompraFacilService } from '../../services/compra-facil.service';
import { API_CONFIG } from '../../config/api.config';


@IonicPage()
@Component({
  selector: 'page-compre-facil',
  templateUrl: 'compre-facil.html',
})
export class CompreFacilPage {

  valorTotal: number;
  produtos: CarrinhoItem[];
  mercadosSacola: SacolaMercados[];
  foundItem:SacolaMercados;
  bucketS3: string;
  qntTotal:number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private compraFacilService: CompraFacilService) {
  }



  ionViewDidLoad() {
    this.bucketS3 = API_CONFIG.s3Url;
    //retorna o valor total da pagina sacola
    this.valorTotal = this.navParams.get('valorTotal');
    this.produtos = this.navParams.get('produtos_sacola');

    this.compraFacilService.getItemsCarrinho(this.produtos);
    this.mercadosSacola = this.compraFacilService.getSacolaMercados();
    console.log(this.mercadosSacola)
  }

  showInfoCompraFacil() {
    let popover = this.popoverCtrl.create(PopoverInfoCompraFacilComponent, {}, { cssClass: 'compra-facil' });
    popover.present();
  }

  showFormCompraFacil(ev) {
    let popover = this.popoverCtrl.create(FormCompraFacilPopoverComponent, {}, { cssClass: 'form-compra-facil' });
    popover.present();
  }

  setQuantidade():number{
    if(this.foundItem){
      return this.compraFacilService.getQntProdutosPorMercado(this.foundItem.carrinhoItem);
    }
  }

  setValorTotal():number{
    if(this.foundItem){
      return this.compraFacilService.getValorProdutosPorMercado(this.foundItem.carrinhoItem);
    }
  }

    //Verifica se produto existe no carrinho 
    verificaMercadoNoCarrinho(item: SacolaMercados): boolean {
      this.foundItem = this.mercadosSacola.find((produtoItem) => produtoItem.sacolaMercado.idMercadoLocalidade === item.sacolaMercado.idMercadoLocalidade);
      return this.foundItem ? true : false;
    }


}

