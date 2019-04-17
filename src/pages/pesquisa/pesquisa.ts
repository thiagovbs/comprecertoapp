import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';



@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html',
})
export class PesquisaPage {

  supermercados: Mercado[]
  filterMercados: Mercado[]
  searchTerm: string

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public supermercadoService: SupermercadoService) {
  }

  ionViewDidLoad() {


    this.filterMercados = null;

    this.supermercadoService.findAll()
      .subscribe((response: Mercado[]) => {
        this.supermercados = response;
      }, erro => { })
  }

  filterItems(event: any) {
    this.searchTerm = event.target.value
    if (this.searchTerm) {
      this.filterMercados = this.supermercados.filter((mercado: Mercado) => (mercado.nomeFantasia.toLowerCase()
        .indexOf(this.searchTerm.toLowerCase()) > -1));
    }
    console.log(this.filterMercados)
  }
}
