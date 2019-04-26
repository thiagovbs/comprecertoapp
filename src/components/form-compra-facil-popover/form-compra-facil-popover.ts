import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'form-compra-facil-popover',
  templateUrl: 'form-compra-facil-popover.html'
})
export class FormCompraFacilPopoverComponent {

  enderecoForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;


  constructor(private formBuilder: FormBuilder, 
              private socialSharing:SocialSharing,
              public viewCtrl: ViewController) {

    this.enderecoForm = this.formBuilder.group({
      endereco: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      numero: this.formBuilder.control('', [Validators.required]),
      complemento: this.formBuilder.control('', [Validators.required]),
      bairro: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      cidade: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      estado: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    })

  }

  SubmitForm(){
    console.log(this.enderecoForm.value)

    this.shareWhatsApp();
  }

  shareWhatsApp(){
    this.socialSharing.shareViaWhatsApp(this.enderecoForm.value)
    .then(()=>{
      this.viewCtrl.dismiss();
    }).catch(()=>{

    })
  }

}
