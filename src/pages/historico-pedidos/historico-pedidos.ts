import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CompraFacilService } from '../../services/compra-facil.service';
import { Pedido } from '../../models/pedido.model';


@IonicPage()
@Component({
  selector: 'page-historico-pedidos',
  templateUrl: 'historico-pedidos.html',
})
export class HistoricoPedidosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private compraFacilService: CompraFacilService) {
  }
  pedidos:Pedido[]=[];

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoPedidosPage');
    this.compraFacilService.getPedidos().subscribe(resp => {
      console.log(resp)
      this.pedidos = resp;
    }, erro => {
      console.log(erro)
    })
  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {})
  }

}
