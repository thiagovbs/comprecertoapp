import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-recuperar-senha',
  templateUrl: 'recuperar-senha.html',
})
export class RecuperarSenhaPage {

  senha: string
  confirmSenha: string
  ngForm: FormGroup 
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder) {

    this.ngForm = this.formBuilder.group({
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      confirmSenha: this.formBuilder.control('', [Validators.required])
    }, { validator: RecuperarSenhaPage.equalTo })
  }

  static equalTo(group:AbstractControl):{[key:string]:boolean}{
    const senha = group.get('senha');
    const confirmSenha = group.get('confirmSenha');
    
    if(!senha.value || !confirmSenha.value){
      return undefined;
    }
    if(senha.value !== confirmSenha.value){
      return {senhaNaoCompara:true}
    }
    return undefined;
  }

  ionViewDidLoad() {

  }

  SubmitForm(){
    let novaSenha = this.ngForm.controls['confirmSenha'].value;
    console.log(novaSenha)
  }
}
