import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { SuporteService } from '../../services/suporte.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';



@IonicPage()
@Component({
  selector: 'page-sugestao',
  templateUrl: 'sugestao.html',
})
export class SugestaoPage {

  sugestaoForm: FormGroup
  sugestaoForm2: FormGroup
  sugestaoForm3: FormGroup
  @ContentChild(FormControlName) control: FormControlName;

  subject: string = 'Meu Titulo';
  body: string = '';
  to: string = 'sheap.mkt@gmail.com ';

  envioFormSuporte: { titulo: string, formSuporte: any };

  item: { expanded: boolean, text: string } = { expanded: false, text: "" };
  item2: { expanded: boolean, text: string } = { expanded: false, text: "" };
  item3: { expanded: boolean, text: string } = { expanded: false, text: "" };

  user:Usuario

  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }

  alert: any;
  itemsExpandedHeight: number = 200;

  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private suporteService: SuporteService,
    public loadingCtrl: LoadingController,
    public alertCrtl: AlertController,
    private usuarioService:UsuarioService) {

    this.item = { expanded: false, text: "Qual mercado você gostaria de ver no Sheap?" };
    this.item2 = { expanded: false, text: "Indique uma cidade ou estado que os nossos serviços não estão disponíveis?" };
    this.item3 = { expanded: false, text: "Nos ajude a melhorar enviando sugestões ou informando problemas" };

    //form do "Qual mercado você gostaria de ver no compre certo"
    this.sugestaoForm = formBuilder.group({
      nomeMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estadoMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidadeMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      bairroMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
    })

    //form do Indique uma cidade em que nossos serviços não estão disponíveis
    this.sugestaoForm2 = formBuilder.group({
      estadoMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidadeMercado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })

    //Nos ajude a melhorar nosso serviço enviando sugestões ou problemas
    this.sugestaoForm3 = formBuilder.group({
      descProblema: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })


  }

  ionViewWillEnter(){
    this.user = this.usuarioService.getLocalUser()
  }

  expandItem(item) {
    item.expanded = !item.expanded;
  }

  enviaForm() {
    let loading: Loading = this.showLoading();

    this.envioFormSuporte = {
      titulo: this.item.text,
      formSuporte: this.sugestaoForm.value
    }


    this.suporteService.enviarMensagemQualMercado(this.user.email,this.envioFormSuporte)
      .subscribe(response => {
        
        loading.dismiss();
        this.alertPresent();
        this.sugestaoForm.reset();
      }, erro => {
        loading.dismiss();
      })



  }

  enviaForm2() {


    let loading: Loading = this.showLoading();
    this.envioFormSuporte = {
      titulo: this.item2.text,
      formSuporte: this.sugestaoForm2.value
    }

    this.suporteService.enviarMensagemIndiqueUmaCidade(this.user.email,this.envioFormSuporte)
      .subscribe(response => {
        this.sugestaoForm2.reset();
        loading.dismiss();
        this.alertPresent();
      }, erro => {
        loading.dismiss();
      })
  }

  enviaForm3() {
    let loading: Loading = this.showLoading();
    this.envioFormSuporte = {
      titulo: this.item3.text,
      formSuporte: this.sugestaoForm3.value
    }

    this.suporteService.enviarMensagemProblemas(this.user.email,this.envioFormSuporte)
    .subscribe(response => {
      this.sugestaoForm3.reset();
      loading.dismiss();
      this.alertPresent();
    }, erro => {
      loading.dismiss();
    })
  }


  //metodo que retorna um loading na tela
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      spinner: 'dots',
      duration: 50000,
      cssClass: 'my-loading-class'
    })
    loading.present();
    return loading;
  }

  
  onCompraFacil(){
    this.navCtrl.push('CompreFacilPage', {})
  }

  private alertPresent(){
    this.alertCrtl.create({
      title: '<img src="assets/icon/Logo-Sheap-icone-03.svg" height="100">',
      message: 'Obrigado, seu email é muito importante para nós!',
      enableBackdropDismiss: true,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    }).present()
  } 
}
