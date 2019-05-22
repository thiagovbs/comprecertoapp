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


  estados: Estado[];
  cidades: Cidade[];
  bairros: Bairro[];
  bairroEscolhido:Bairro;

  cidade:Cidade;
  estado:Estado = {} as Estado;

  checkCidade: boolean = true;
  checkBairro: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private alcanceService: AlcanceService,
    public viewCtrl: ViewController,
    public appCtrl: App,
    private events: Events,
    private navCtrl: NavController) {

    this.alcanceForm = formBuilder.group({
      estado: this.formBuilder.control('',[Validators.required]),
      cidade: this.formBuilder.control({value:'', disabled:false}, [Validators.required]),
      bairro: this.formBuilder.control('', [Validators.required]),
    })
  }

  ngOnInit() {
    this.estados = undefined;
    this.cidades = undefined;
    this.bairros = undefined;
    this.bairroEscolhido = null;

    this.alcanceService.getEstados().subscribe((estados:Estado[])=>{
      this.estados = estados;
      console.log(this.estados)
    })
    
  }
  //Pega as Cidades de acordo com o estado
  selectEstado(event, estado) {
    
    if(this.estados){
      this.alcanceService.getCidades(estado.idEstado).subscribe((cidade: Cidade[]) => {
        this.cidades = cidade;
      })
      this.checkCidade = false;
    }else{
      this.checkCidade = true;
    }
  }

  selectCidade(event, cidade) { 
    if(cidade){
      this.alcanceService.getBairros(cidade.idCidade).subscribe((bairro: Bairro[]) => {
        this.bairros = bairro; 
        this.checkBairro = false; 
      })
    }
    
  }

  selectBairro(evento,bairro){
    this.checkBairro = false;
    this.bairroEscolhido = bairro
  }



  SubmitForm() {
    this.alcanceService.setLocalAlcance(null);
    
    this.alcanceService.setLocalAlcance(this.bairroEscolhido);
    this.events.publish('alcance')
    this.navCtrl.setRoot(this.navCtrl.getActive());
    this.viewCtrl.dismiss();
    
  }





}
