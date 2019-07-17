import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';

import { ViewController } from 'ionic-angular';

@Component({
  selector: 'form-compra-facil-popover',
  templateUrl: 'form-compra-facil-popover.html'
})
export class FormCompraFacilPopoverComponent {

  enderecoForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;


  constructor(private formBuilder: FormBuilder, 
              public viewCtrl: ViewController) {

    this.enderecoForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cpf: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      numero: this.formBuilder.control('', [Validators.required]),
      complemento: this.formBuilder.control('', [Validators.required]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })

  }

  SubmitForm(){
    this.viewCtrl.dismiss(this.enderecoForm.value)
    
  }

  

}
