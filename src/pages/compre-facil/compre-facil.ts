import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, AlertController, ModalController } from 'ionic-angular';
import { PopoverInfoCompraFacilComponent } from '../../components/popover-info-compra-facil/popover-info-compra-facil';
import { FormCompraFacilPopoverComponent } from '../../components/steps-pedido/form-compra-facil-popover/form-compra-facil-popover';

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
  produtos: CarrinhoItem[] = [];
  mercadosSacola: SacolaMercados[] = [];
  bucketS3: string;
  qntTotal: number = 0;
  dtValidade:Date;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    private compraFacilService: CompraFacilService,
    private carrinhoService: CarrinhoService,
    private alertCtl: AlertController,
    public modalCtrl: ModalController) {
  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoItems: boolean = false;
    if (this.carrinhoService.items.length !== 0) {
      retornoItems = true;
    }
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
    this.produtos = this.carrinhoService.items;
   
     //retorna o valor total da pagina sacola
    this.valorTotal = this.carrinhoService.total();
  
    //produtos do carrinho para o serviço de compre-facil
    this.carrinhoService.getItemsCarrinho();
    //serviço que modifica o carrinho para o modelo de SacolaMercados
    this.mercadosSacola = this.compraFacilService.sacolaMercados;
    console.log(this.mercadosSacola)
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
  setQuantidade(item): number {
    let foundItem = this.mercadosSacola.find((produtoItem) => produtoItem.sacolaMercado.idMercadoLocalidade === item.sacolaMercado.idMercadoLocalidade);
    if (foundItem) {
      return this.compraFacilService.getQntProdutosPorMercado(foundItem.carrinhoItem);
    }
  }
  //valor total de produtos na sacola de cada mercado
  setValorTotal(item) { 
    let foundItem = this.mercadosSacola.find((produtoItem) => produtoItem.sacolaMercado.idMercadoLocalidade === item.sacolaMercado.idMercadoLocalidade);
    return this.compraFacilService.getValorProdutosPorMercado(foundItem.carrinhoItem);
  }

  onFormPedido(mercado:SacolaMercados){
    let popover = this.modalCtrl.create('DynamicStepsPage', { 
      pedido: mercado,
      valorTotal:this.valorTotal 
    });
    popover.present();
  }

  onDetalhePedido(mercado:SacolaMercados){
    
    let popover = this.modalCtrl.create('DetalhePedidoPage', { 
      pedido: mercado,
      valorTotal:this.valorTotal 
    });
    popover.present();
  }

  getDataValidade(mercado:SacolaMercados){
    mercado.carrinhoItem.map(resp=>{
      this.dtValidade = resp.produto.dtValidadeMercadoProduto; 
    })
    return this.dtValidade;
  }
}

