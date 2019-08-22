import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController, LoadingController, Loading } from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';
import { API_CONFIG } from '../../config/api.config';
import { AlcanceService } from '../../services/alcance.service';
import { AlcanceComponent } from '../../components/alcance/alcance';
import { Bairro } from '../../models/localidade';


@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  supermercados: Mercado[];
  localidadeMercado: Bairro;
  bucketS3: string;

  constructor(public navCtrl: NavController,
    public supermercadoService: SupermercadoService,
    private alcanceService: AlcanceService,
    private popoverCtrl: PopoverController,
    private loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {
    let loader = this.presenteLoading();
    this.localidadeMercado = this.alcanceService.getLocaAlcance();
    this.supermercadoService.buscarMercadoprodutosPorBairro(this.localidadeMercado)
      .subscribe((resp: Mercado[]) => {
        this.supermercados = resp
        loader.dismiss()
      },erro=>loader.dismiss())

    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;
  }


  onMercado(supermercado: Mercado) {
    this.navCtrl.push("SupermercadoDetalhePage", {
      mercado: supermercado

    });
  }

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoAlcance: boolean = false;
    if (this.alcanceService.getLocaAlcance()) {
      retornoAlcance = true;
    }
    else {
      let popover = this.popoverCtrl.create(AlcanceComponent, {}, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }
    return retornoAlcance
  }

  onCompraFacil(){
    this.navCtrl.push('CompreFacilPage', {})
  }

  presenteLoading(): Loading {
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
