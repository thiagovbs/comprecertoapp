import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupermercadoService } from '../../../services/supermercado.service';
import { AlcanceService } from '../../../services/alcance.service';
import { Filtros } from '../../../util/filtros';
import { Mercado } from '../../../models/supermercado.model';
import { Bairro } from '../../../models/localidade';
import { PacoteTipoServico } from '../../../models/pacote-tipo-servico.model';


@IonicPage()
@Component({
  selector: 'page-popover-search-mercado',
  templateUrl: 'popover-search-mercado.html',
})
export class PopoverSearchMercadoPage {

  supermercados: Mercado[];
  supermercadosFilter: Mercado[];
  localidadeMercado: Bairro;
  tiposServico: PacoteTipoServico[];
  buscar: string
  verficaBuscar:boolean = false;
  selectedMercados:Mercado[] =[];

  constructor(public navCtrl: NavController,
    public supermercadoService: SupermercadoService,
    private alcanceService: AlcanceService,
    private filtrosService: Filtros) {
  }

  ionViewDidLoad() {
    this.getMercados()
  }

  searchMercado() {
    
    if (this.supermercados && this.buscar) {
      this.verficaBuscar = true;
      this.supermercadosFilter = this.supermercados.filter((mercado: Mercado) => (mercado.nomeFantasia.toLowerCase()
        .indexOf(this.buscar.toLowerCase()) > -1));
    }
  }

  changeMercado(evento){
    if(evento.target.value === ""){
      this.verficaBuscar = false;
    }
  }

  private getMercados() {
    this.localidadeMercado = this.alcanceService.getLocaAlcance();
    this.supermercadoService.buscarMercadoprodutosPorBairro(this.localidadeMercado)
      .subscribe((resp: Mercado[]) => {
        this.supermercados = resp
        this.supermercadoService.setServicosPorMercado(this.supermercados);
        this.tiposServico = this.supermercadoService.getServicosPorMercado()
        this.filtrosService.sortByServicoPosicionamentoMercado(this.tiposServico)
      })
  }

  showMercado( mercado:Mercado,checked:boolean){
    if(checked){
      this.selectedMercados.push(mercado)
    }else{
      this.selectedMercados.splice(this.selectedMercados.indexOf(mercado),1);
    }

    
  }

  onFiltrar(){
    console.log(this.selectedMercados)
  }

}
