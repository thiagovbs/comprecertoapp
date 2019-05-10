import { Component, ContentChild, OnInit } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { AlcanceService } from '../../services/alcance.service';
import { Bairro, Cidade, Estado } from '../../models/localidade';
import { Observable } from 'rxjs';
import { ViewController, App, Events, NavController } from 'ionic-angular';

@Component({
  selector: 'alcance',
  templateUrl: 'alcance.html'
})
export class AlcanceComponent implements OnInit {

  alcanceForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;


  estados: Observable<Estado[]>;
  cidades: Cidade[];
  bairros: Bairro[];
  bairroEscolhido:Bairro;

  idEstado: number;
  idCidade: number;
  idBairro:number;

  checkCidade: boolean = true;
  checkBairro: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private alcanceService: AlcanceService,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private events: Events,
    private navCtrl: NavController) {

    this.alcanceForm = formBuilder.group({
      estado: this.formBuilder.control('', [Validators.required]),
      cidade: this.formBuilder.control('', [Validators.required]),
      bairro: this.formBuilder.control('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.bairroEscolhido = null;
    this.estados = this.alcanceService.estados;
  }

  //Pega o Id do Estado e retorna a string
  getIdEstado(estado) {
    this.idEstado = estado.idEstado;
    return estado.sigla
  }

  //Pega as Cidades de acordo com o estado
  checkBlurEstado() {
    this.alcanceService.getCidades(this.idEstado).subscribe((cidade: Cidade[]) => {
      this.cidades = cidade;
    })
    this.checkCidade = false;
  }

  //Pega o Id do Estado e retorna a string
  getIdCidade(cidade) {
    this.idCidade = cidade.idCidade;
    return cidade.nome
  }

  checkBlurCidade() {
    this.alcanceService.getBairros(this.idCidade).subscribe((bairro: Bairro[]) => {
      this.bairros = bairro;
    })
    this.checkBairro = false;
  }

  getIdBairro(bairro:Bairro){  
    this.bairroEscolhido = bairro
    this.idBairro = bairro.idBairro
    return bairro.nome
  }

  checkBlurBairro(evento){
    this.bairroEscolhido = this.bairros.find((bairro:Bairro) => bairro.nome === evento.value)
    console.log(this.bairroEscolhido)
  }



  SubmitForm() {
    console.log(this.bairroEscolhido)
    this.alcanceService.setLocalAlcance(this.bairroEscolhido);
    this.events.publish('alcance')
    this.navCtrl.setRoot(this.navCtrl.getActive());
    this.viewCtrl.dismiss();
    
  }





}
