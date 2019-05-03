import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController } from 'ionic-angular';
import { PopoverInfoCompraFacilComponent } from '../../components/popover-info-compra-facil/popover-info-compra-facil';
import { FormCompraFacilPopoverComponent } from '../../components/form-compra-facil-popover/form-compra-facil-popover';

import { CarrinhoItem } from '../../models/carrinho-item.model';
import { SacolaMercados } from '../../models/SacolaMercados.model';
import { CompraFacilService } from '../../services/compra-facil.service';
import { API_CONFIG } from '../../config/api.config';
import { CarrinhoService } from '../../services/carrinho.service';


@IonicPage()
@Component({
  selector: 'page-compre-facil',
  templateUrl: 'compre-facil.html',
})
export class CompreFacilPage {

  valorTotal: number;
  produtos: CarrinhoItem[];
  mercadosSacola: SacolaMercados[];
  foundItem: SacolaMercados;
  bucketS3: string;
  qntTotal: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private compraFacilService: CompraFacilService,
    private carrinhoService: CarrinhoService,
    private alertCtl: AlertController) {
  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoItems: boolean = false;
    if (this.carrinhoService.items.length !== 0) {
      retornoItems = true;
    }
    //AlcanceComponent, {}, { showBackdrop: true, cssClass: 'custom-popover' }
    else {
      let alert = this.alertCtl.create({
        title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
        message: 'Adicione algum produto para sua compra!',
        enableBackdropDismiss: false,
        cssClass: 'AlertCompraFacil',
        buttons: [
          { text: 'Ok' }
        ]
      })
      alert.present()
    }
    return retornoItems
  }

  ionViewDidLoad() {
    this.bucketS3 = API_CONFIG.s3Url;
    //retorna o valor total da pagina sacola
    this.valorTotal = this.navParams.get('valorTotal');
    this.produtos = this.navParams.get('produtos_sacola');

    //produtos do carrinho para o serviço de compre-facil
    this.compraFacilService.getItemsCarrinho(this.produtos);
    //serviço que modifica o carrinho para o modelo de SacolaMercados
    this.mercadosSacola = this.compraFacilService.getSacolaMercados();

  }

  //popover mostrar a msg de politicas do compre facil
  showInfoCompraFacil() {
    let popover = this.popoverCtrl.create(PopoverInfoCompraFacilComponent, {}, { cssClass: 'compra-facil' });
    popover.present();
  }

  //popover para mostrar o form para mercados que entregam produtos em casa
  showFormCompraFacil(ev) {
    let popover = this.popoverCtrl.create(FormCompraFacilPopoverComponent, {}, { cssClass: 'form-compra-facil' });
    popover.present();
  }

  //quantidade total de produtos na sacola de cada mercado
  setQuantidade(): number {
    if (this.foundItem) {
      return this.compraFacilService.getQntProdutosPorMercado(this.foundItem.carrinhoItem);
    }
  }
  //valor total de produtos na sacola de cada mercado
  setValorTotal(): number {
    if (this.foundItem) {
      return this.compraFacilService.getValorProdutosPorMercado(this.foundItem.carrinhoItem);
    }
  }

  //Verifica se mercado existe no carrinho 
  verificaMercadoNoCarrinho(item: SacolaMercados): boolean {
    this.foundItem = this.mercadosSacola.find((produtoItem) => produtoItem.sacolaMercado.idMercadoLocalidade === item.sacolaMercado.idMercadoLocalidade);
    return this.foundItem ? true : false;
  }


}

