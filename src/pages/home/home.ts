import { Component } from '@angular/core';
import { NavController, IonicPage, PopoverController, Events, } from 'ionic-angular';
import { CategoriaService } from '../../services/categoria.service';

import { Categoria } from '../../models/categoria.model';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../../config/api.config';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { AlcanceService } from '../../services/alcance.service';
import * as Lodash from "lodash";
import { Usuario } from '../../models/usuario';
import { Bairro } from '../../models/localidade';
import { Filtros } from '../../util/filtros';
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
    private filtrosService: Filtros) {

    //Carregando as Categorias
    this.categoriaService.findAll().subscribe(resp => {
      this.categorias = Lodash.orderBy(resp, 'nome', 'asc')
    })
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
            
            this.mercadoService.setServicosPorMercado(this.mercados);
            this.tiposServico = this.mercadoService.getServicosPorMercado()
            this.filtrosService.sortByServicoPosicionamentoMercado(this.tiposServico)
            console.log(this.tiposServico)
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

  onMercados(mercado) {
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: mercado
    });
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }



}
