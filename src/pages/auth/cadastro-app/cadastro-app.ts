import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControlName, Validators, AbstractControl } from '@angular/forms';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';


@IonicPage()
@Component({
  selector: 'page-cadastro-app',
  templateUrl: 'cadastro-app.html',
})
export class CadastroAppPage {

  cadastroForm: FormGroup 
  @ContentChild(FormControlName) control: FormControlName;

  emailPattern ="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"

  sexoList = [
    {nome: 'Masculino', value: 'M'},
    {nome: 'Feminino', value: 'F'},
    
  ];

  usuario:Usuario;



  constructor(public navCtrl: NavController,
              public menu:MenuController,
              public formBuilder:FormBuilder,
              public usuarioService:UsuarioService) {

      this.cadastroForm = this.formBuilder.group({
        nome:this.formBuilder.control('',[Validators.required, Validators.minLength(3)]),
        sexo: this.formBuilder.control(false, [Validators.required]),
        dtNascimento:this.formBuilder.control('',[Validators.required]),
        email:this.formBuilder.control('',[Validators.required, Validators.pattern(this.emailPattern)]),
        senha:this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
        confirmSenha:this.formBuilder.control('',[Validators.required])
    },{validator:CadastroAppPage.equalTo})
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


  ionViewWillEnter(){

    this.usuario = {
      nome:"",
      email:"",
      login:"",
      dtNascimento: new Date(),
      senha:"",
      sexo:"",
    }
    this.menu.swipeEnable(false);
    }


  SubmitForm(){
    let nome_form = this.cadastroForm.controls['nome'].value;
    let sexo_form = this.cadastroForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroForm.controls['dtNascimento'].value;
    let email_form = this.cadastroForm.controls['email'].value;
    let senha_form = this.cadastroForm.controls['senha'].value;
    let login_form = email_form.substring(0, email_form.lastIndexOf("@"));
     
    this.usuario ={
      nome: nome_form,
      email: email_form,
      login: login_form,
      dtNascimento: new Date(dtNascimento_form),
      senha: senha_form,
      sexo: sexo_form
    }
    this.usuarioService.cadastrarUsuario(this.usuario)
    
    .subscribe(response =>{
        console.log(response.headers.get('Authorization'));
    },
    error =>{});
  }
}
