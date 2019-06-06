import { Component, ContentChild, OnInit } from '@angular/core';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { AlcanceService } from '../../services/alcance.service';
import { Bairro, Cidade, Estado } from '../../models/localidade';
import { ViewController, App, Events, NavController } from 'ionic-angular';

@Component({
  selector: 'alcance',
  templateUrl: 'alcance.html'
})
export class AlcanceComponent implements OnInit {

  alcanceForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;


  estados: Estado[];
  cidades: Cidade[];
  bairros: Bairro[];
  bairroEscolhido: Bairro;
  alcance: any;

  constructor(
    private alcanceService: AlcanceService,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private events: Events,
    private navCtrl: NavController) {

    this.alcanceForm = new FormGroup({
      estado: new FormControl({ value: '' }, [Validators.required]),
      cidade: new FormControl({ value: '', disabled: true }, [Validators.required]),
      bairro: new FormControl({ value: '', disabled: true }, [Validators.required]),
    })
  }

  ngOnInit() {
    this.estados = undefined;
    this.cidades = undefined;
    this.bairros = undefined;
    this.bairroEscolhido = null;

    this.alcanceService.getEstados().subscribe((estados: Estado[]) => {
      this.estados = estados;
    })

    //caso já exista o alcance
    if (this.alcanceService.getLocaAlcance()) {
      this.alcance = this.alcanceService.getLocaAlcance()
      //adicionar valor no select com o estado
      this.alcanceForm.get('estado').setValue(this.alcance.cidade.estado.idEstado);

      //pesquisar cidades pelo valor do alcance existente
      this.alcanceService.getCidades(this.alcance.cidade.estado.idEstado).subscribe((cidade: Cidade[]) => {
        this.cidades = cidade;
        this.alcanceForm.get('cidade').setValue(this.alcance.cidade.idCidade);

      }, erro => console.log(erro))

      //pesquisar bairros pelo valor do alcance existente
      this.alcanceService.getBairros(this.alcance.cidade.idCidade).subscribe((bairro: Bairro[]) => {
        this.bairros = bairro;
        this.alcanceForm.get('bairro').setValue(this.alcance.idBairro);
      }, erro => console.log(erro))

      this.alcanceForm.updateValueAndValidity();
    }
  }

  //Pega as Cidades de acordo com o estado
  selectEstado(event, estado) {
    this.alcanceService.getCidades(estado.idEstado).subscribe((cidade: Cidade[]) => {
      this.cidades = cidade;
    }, erro => console.log(erro))
    this.alcanceForm.controls['cidade'].enable({ onlySelf: true })
    this.alcanceForm.get('cidade').setValue('');
    this.alcanceForm.get('bairro').setValue('');
  }

  selectCidade(event, cidade) {
    this.alcanceService.getBairros(cidade.idCidade).subscribe((bairro: Bairro[]) => {
      this.bairros = bairro;
      this.alcanceForm.controls['bairro'].enable({ onlySelf: true })
      this.alcanceForm.get('bairro').setValue('');
    })
  }

  selectBairro(evento, bairro) {
    this.bairroEscolhido = bairro
  }

  SubmitForm() {

    if (this.bairroEscolhido) {
      this.alcanceService.setLocalAlcance(null);
      this.alcanceService.setLocalAlcance(this.bairroEscolhido);
      this.events.publish('alcance')
      this.navCtrl.setRoot(this.navCtrl.getActive());

    }
    this.viewCtrl.dismiss();

  }





}
