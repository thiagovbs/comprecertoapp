import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControlName } from '@angular/forms';
import { SuporteService } from '../../services/suporte.service';



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

  envioFormSuporte: { titulo: string, formSuporte: any };

  item: { expanded: boolean, text: string } = { expanded: false, text: "" };
  item2: { expanded: boolean, text: string } = { expanded: false, text: "" };
  item3: { expanded: boolean, text: string } = { expanded: false, text: "" };


  onSearch() {
    this.navCtrl.push('PesquisaPage')
  }


  itemsExpandedHeight: number = 200;
  constructor(public navCtrl: NavController,
    private formBuilder: FormBuilder,
    private suporteService: SuporteService,
    public loadingCtrl: LoadingController) {

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

  expandItem(item) {
    item.expanded = !item.expanded;
  }

  enviaForm() {
    let loading: Loading = this.showLoading();

    this.envioFormSuporte = {
      titulo: this.item.text,
      formSuporte: this.sugestaoForm.value
    }
    this.suporteService.enviarMensagemQualMercado(this.envioFormSuporte)
      .subscribe(response => {
        this.sugestaoForm.reset();
        loading.dismiss();
      })
  }

  enviaForm2() {
    let loading: Loading = this.showLoading();
    this.envioFormSuporte = {
      titulo: this.item2.text,
      formSuporte: this.sugestaoForm2.value
    }
    this.suporteService.enviarMensagemIndiqueUmaCidade(this.envioFormSuporte)
      .subscribe(response => {
        this.sugestaoForm2.reset();
        loading.dismiss();
      })
  }

  enviaForm3() {
    let loading: Loading = this.showLoading();
    this.envioFormSuporte = {
      titulo: this.item3.text,
      formSuporte: this.sugestaoForm3.value
    }
    this.suporteService.enviarMensagemProblemas(this.envioFormSuporte)
      .subscribe(response => {
        this.sugestaoForm3.reset();
        loading.dismiss();
      })
  }


  //metodo que retorna um loading na tela
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    })
    loading.present();
    return loading;
  }
}
