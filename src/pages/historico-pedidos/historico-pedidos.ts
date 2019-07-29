import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Pedido } from '../../models/pedido.model';
import { PedidosService } from '../../services/pedidos.service';


@IonicPage()
@Component({
  selector: 'page-historico-pedidos',
  templateUrl: 'historico-pedidos.html',
})
export class HistoricoPedidosPage {

  activeEntrega: boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private pedidosService: PedidosService) {
  }
  pedidos: Pedido[] = [];

  ionViewDidLoad() {
    this.getPedidosHistorico()
    this.setTimePedido()

  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {})
  }

  setProgress() {
    this.activeEntrega = true
  }

  setTimePedido() {
    let i = 0;
    setInterval(() => {
      i++;
      if (i === 60) {
        this.getPedidosHistorico();
        i = 0;
      }
    }, 1000)
  }

  getPedidosHistorico() {
    this.pedidosService.getPedidos().subscribe(resp => {
      console.log(resp)
      this.pedidos = resp;
    }, erro => {
      console.log(erro)
    })
  }

}
