import { Component, ContentChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'info-sign-popover',
  templateUrl: 'info-sign-popover.html'
})
export class InfoSignPopoverComponent {


  cadastroForm: FormGroup 
  @ContentChild(FormControlName) control: FormControlName;

  user:Usuario
  
  faceId:string
  faceEmail:string
  faceNome:string


  sexoList = [
    {nome: 'Masculino', value: 'M'},
    {nome: 'Feminino', value: 'F'},
    {nome: 'Outro', value: 'N'}
    
  ];

  constructor(private navCntl:NavController,
              private formBuilder:FormBuilder,
              private params: NavParams,
              private usuarioService:UsuarioService
              ) {

    this.cadastroForm = this.formBuilder.group({
      sexo: this.formBuilder.control(false, [Validators.required]),
      dtNascimento:this.formBuilder.control('',[Validators.required])
    })

      //Informação não nula
      this.faceId = "";
      this.faceEmail = "";
      this.faceNome = "";
  }

  ionViewWillEnter(){
    let face = this.params.get('usuario');
    this.faceId = face.id;
    this.faceNome = face.name;
    this.faceEmail = face.email;
    
  }

  SubmitMaisInfoForm(){
    let sexo_form = this.cadastroForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroForm.controls['dtNascimento'].value;
    let dt_Nascimento = new Date(dtNascimento_form) 
    var milliseconds = dt_Nascimento.getTime(); 
    
    //preenchendo o usuário com todas as informações para seu cadastro
    this.user ={
      accessToken:null,
      refreshToken: null,
      nome: this.faceNome,
      email: this.faceEmail,
      login: this.faceEmail,
      dtNascimento: milliseconds,
      senha: this.faceId,
      sexo: sexo_form
    }

    this.usuarioService.cadastrarUsuario(this.user)
    .subscribe(response =>{
      this.navCntl.setRoot('HomePage');
    },erro =>{})
  }

}
