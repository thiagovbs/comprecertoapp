import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ViewController } from 'ionic-angular';
import { UsuarioService } from '../../../services/usuario.service';
import { AlcanceService } from '../../../services/alcance.service';

@Component({
  selector: 'form-compra-facil-popover',
  templateUrl: 'form-compra-facil-popover.html'
})
export class FormCompraFacilPopoverComponent {

  enderecoForm: FormGroup
  usuarioNome:string;
  nomeCidade:string;
  nomeEstado:string;
  bairro: string;
  @ContentChild(FormControlName) control: FormControlName;


  constructor(
              public viewCtrl: ViewController,
              private localUser:UsuarioService,
              private localAlcance:AlcanceService) {

    this.enderecoForm = new FormGroup({
      nome:  new FormControl({value:this.usuarioNome, disabled: true}, [Validators.required]),
      cpf:  new FormControl({value:'139-791-307-03', disabled: true}, [Validators.required]),
      celular:  new FormControl('', [Validators.required, Validators.minLength(14)]),
      endereco:  new FormControl('', [Validators.required, Validators.minLength(3)]),
      numero:  new FormControl('', [Validators.required]),
      complemento:  new FormControl(''),
      bairro:  new FormControl({value:this.bairro}, [Validators.required, Validators.minLength(3)]),
      cidade:  new FormControl({value:this.nomeCidade}),
      estado:  new FormControl({value:this.nomeEstado}),
    })

    this.nomeCidade = localAlcance.getLocaAlcance().cidade.nome;
    this.nomeEstado = localAlcance.getLocaAlcance().cidade.estado.sigla
    this.bairro = localAlcance.getLocaAlcance().nome;

  }

  ionViewDidLoad(){
    this.usuarioNome = this.localUser.getLocalUser().nome;
  }

  SubmitForm(){
    console.log(this.enderecoForm)
    this.viewCtrl.dismiss(this.enderecoForm.value)
    
  }

  

}
