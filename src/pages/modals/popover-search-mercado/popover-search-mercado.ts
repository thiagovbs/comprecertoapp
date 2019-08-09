import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SupermercadoService } from '../../../services/supermercado.service';
import { AlcanceService } from '../../../services/alcance.service';
import { Mercado } from '../../../models/supermercado.model';
import { Bairro } from '../../../models/localidade';

@IonicPage()
@Component({
  selector: 'page-popover-search-mercado',
  templateUrl: 'popover-search-mercado.html',
})
export class PopoverSearchMercadoPage {

  supermercados: Mercado[];
  supermercadosFilter: Mercado[];
  localidadeMercado: Bairro;
  buscar: string
  verficaBuscar: boolean = false;
  selectedMercados: Mercado[] = [];
  myAlcance: any;
  mercadoLocalidades = [];
  

  constructor(public navCtrl: NavController,
    public supermercadoService: SupermercadoService,
    private alcanceService: AlcanceService,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    
    this.mercadoLocalidades = this.supermercadoService.getMercadoLocalidadePopOverSearch();

    this.getMercados();
    this.myAlcance = this.alcanceService.getLocaAlcance()
  }

  searchMercado() {

    if (this.supermercados && this.buscar) {
      this.verficaBuscar = true;
      this.supermercadosFilter = this.supermercados.filter((mercado: Mercado) => (mercado.nomeFantasia.toLowerCase()
        .indexOf(this.buscar.toLowerCase()) > -1));
    }
  }

  changeMercado(evento) {
    if (evento.target.value === "") {
      this.verficaBuscar = false;
    }
  }

  private getMercados() {
    this.localidadeMercado = this.alcanceService.getLocaAlcance();
    this.supermercadoService.buscarMercadoprodutosPorBairro(this.localidadeMercado)
      .subscribe((resp: Mercado[]) => {
        this.supermercados = resp
      })
  }

  showMercado(mercado: Mercado, checked: boolean) {
    console.log(checked)
    if (checked) {
      this.selectedMercados.push(mercado);
    }else{
      console.log("exclusão")
      this.selectedMercados.splice(this.selectedMercados.indexOf(mercado),1);
    }
  }

  onFiltrar() {
  
    let tempIdLocalidades:Array<number>=[];
    
    
    this.selectedMercados.map(mercado => {
      let mercadoLocalidade = mercado.mercadoLocalidades.find(localidade => localidade.bairro.idBairro === this.myAlcance.idBairro)
      if (mercadoLocalidade) {
        tempIdLocalidades.push(mercadoLocalidade.idMercadoLocalidade)
      }
    });
    this.mercadoLocalidades = tempIdLocalidades;
    this.supermercadoService.setMercadoLocalidadePopOverSearch(this.mercadoLocalidades)
    this.viewCtrl.dismiss(this.mercadoLocalidades)
  }

  getMercadoSelected(mercadoLocalidadesSelect: any):boolean {
    let found:boolean =false;
    mercadoLocalidadesSelect.map(localidade => {
      this.mercadoLocalidades.map(id=>{
        if( id === localidade.idMercadoLocalidade){
          found = true;
        }
      })
    })
    return found;
    
  }
}