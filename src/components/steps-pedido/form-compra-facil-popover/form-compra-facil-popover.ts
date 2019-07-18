import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';

import { ViewController } from 'ionic-angular';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'form-compra-facil-popover',
  templateUrl: 'form-compra-facil-popover.html'
})
export class FormCompraFacilPopoverComponent {

  enderecoForm: FormGroup
  usuarioNome:string
  @ContentChild(FormControlName) control: FormControlName;


  constructor(private formBuilder: FormBuilder, 
              public viewCtrl: ViewController,
              private localUser:UsuarioService) {

    this.enderecoForm = this.formBuilder.group({
      nome: this.formBuilder.control({value:this.usuarioNome, disabled: true}, [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control({value:'139-791-307-03', disabled: true}, [Validators.required, Validators.minLength(3)]),
      celular: this.formBuilder.control('', [Validators.required]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      numero: this.formBuilder.control('', [Validators.required]),
      complemento: this.formBuilder.control(''),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.maxLength(2)]),
    })

  }

  ionViewDidLoad(){
    this.usuarioNome = this.localUser.getLocalUser().nome;
  }

  SubmitForm(){
    this.viewCtrl.dismiss(this.enderecoForm.value)
    
  }

  

}
