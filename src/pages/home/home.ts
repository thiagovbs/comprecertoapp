import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController, Events, LoadingController, Loading, } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/categoria.model';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';

import { API_CONFIG } from '../../config/api.config';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { AlcanceService } from '../../services/alcance.service';
import * as Lodash from "lodash";
import { Usuario } from '../../models/usuario';
import { Bairro } from '../../models/localidade';
import { PacoteTipoServico } from '../../models/pacote-tipo-servico.model';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  categorias: Categoria[];
  mercados: Mercado[];
  bucketS3: string;
  user: Usuario;
  localidadeMercado: Bairro;
  tiposServico: PacoteTipoServico[]

  constructor(public navCtrl: NavController,
    private alcanceService: AlcanceService,
    private categoriaService: CategoriaService,
    private mercadoService: SupermercadoService,
    private popoverCtrl: PopoverController,
    private events: Events,
    private loadingCtrl: LoadingController) {

      let loader = this.presenteLoading();

    //Carregando as Categorias
    this.categoriaService.findAll().subscribe(resp => {
      loader.dismiss();
      this.categorias = Lodash.orderBy(resp, 'nome', 'asc')
    },erro=>loader.dismiss());
  }

  ionViewDidLoad() {

    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;

    //evento que adiciona os mercados por localidade na barra superior
    this.events.subscribe('alcance', () => {
      this.localidadeMercado = this.alcanceService.getLocaAlcance();
      if (this.localidadeMercado) {
        this.mercadoService.buscarMercadoprodutosPorBairro(this.localidadeMercado)
          .subscribe((resp: Mercado[]) => {
            this.mercados = resp;
          })
      }
    })

    this.localidadeMercado = this.alcanceService.getLocaAlcance();
    if (this.localidadeMercado) {
      this.mercadoService.buscarMercadoprodutosPorBairro(this.localidadeMercado)
        .subscribe((resp: Mercado[]) => {
          this.mercados = resp;
        })
    }



    //iniciar o popover de alcance se o alcance não estiver no localStorage
    if (!this.alcanceService.getLocaAlcance()) {
      let popover = this.popoverCtrl.create(AlcanceComponent, {}, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }
  }

  onSubCategoria(item: Categoria) {
    this.navCtrl.push("SubcategoriaPage", {
      cat: item,
      mercadoDetalhe: undefined
    });
  }

  onMaisBarato(barato: string) {
    console.log(barato)
  }

  onMercados(mercado: Mercado) {
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: mercado
    });
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  onCompraFacil() {
    this.navCtrl.push('CompreFacilPage', {})
  }

  presenteLoading(): Loading{
    let loading = this.loadingCtrl.create({
      spinner: 'dots',
      //content: `<img src="assets/imgs/loading3.gif" height="50px" />`,
      duration: 50000,
      cssClass: 'my-loading-class'
    });
    loading.present();
    return loading
  }

}
