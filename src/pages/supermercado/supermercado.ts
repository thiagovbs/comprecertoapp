import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { SupermercadoService } from '../../services/supermercado.service';
import { Mercado } from '../../models/supermercado.model';
import { API_CONFIG } from '../../config/api.config';
import { AlcanceService } from '../../services/alcance.service';
import { AlcanceComponent } from '../../components/alcance/alcance';

@IonicPage()
@Component({
  selector: 'page-supermercado',
  templateUrl: 'supermercado.html',
})
export class SupermercadoPage {

  supermercados: Mercado;

  bucketS3: string

  constructor(public navCtrl: NavController,
    public supermercadoService: SupermercadoService,
    private alcanceService: AlcanceService,
    private popoverCtrl: PopoverController) {

  }

  ionViewDidLoad() {
    console.log(this.alcanceService.getLocaAlcance())
    this.supermercadoService.findAll()
      .subscribe(response => {
        console.log(response)
        this.supermercados = response;
        
      }, erro => { })

    //imagens S3
    this.bucketS3 = API_CONFIG.s3Url;
  }
  

  onMercado(supermercado: Mercado) {
    console.log(supermercado)
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
      let popover = this.popoverCtrl.create(AlcanceComponent, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }

    return retornoAlcance
  }
}
