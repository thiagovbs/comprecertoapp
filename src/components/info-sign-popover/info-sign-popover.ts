import { Component, ContentChild } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Usuario, Permissao } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'info-sign-popover',
  templateUrl: 'info-sign-popover.html'
})
export class InfoSignPopoverComponent {


  cadastroPopUpForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;

  user: Usuario
  faceId: string
  faceEmail: string
  faceNome: string
  permissao: Permissao;

  sexoList = [
    { nome: 'Masculino', value: 'M' },
    { nome: 'Feminino', value: 'F' },
    { nome: 'Outro', value: 'O' },

  ];

  constructor(private navCntl: NavController,
    private formBuilder: FormBuilder,
    private params: NavParams,
    private usuarioService: UsuarioService,
    public loadingCtrl: LoadingController
  ) {

    this.cadastroPopUpForm = this.formBuilder.group({
      sexo: this.formBuilder.control('', [Validators.required]),
      dtNascimento: this.formBuilder.control('', [Validators.required])
    })

    //Informação não nula
    this.faceId = "";
    this.faceEmail = "";
    this.faceNome = "";
  }

  ionViewWillEnter() {
    let face = this.params.get('usuario');
    this.faceId = face.password;

    this.faceId = this.faceId.substring(0, 10)
    this.faceNome = face.name;
    this.faceEmail = face.username;

    console.log(face)
  }

  SubmitMaisInfoForm() {
    let loading: Loading = this.showLoading();
    let sexo_form = this.cadastroPopUpForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroPopUpForm.controls['dtNascimento'].value;
    let dt_Nascimento = new Date(dtNascimento_form)
    var milliseconds = dt_Nascimento.getTime();

    this.permissao = {
      descricao: "USER"
    }

    //preenchendo o usuário com todas as informações para seu cadastro
    this.user = {
      nome: this.faceNome,
      email: this.faceEmail,
      login: this.faceEmail,
      dtNascimento: milliseconds,
      senha: this.faceId,
      sexo: sexo_form,
      permissoes: [this.permissao]
    }
    console.log(this.user)
    this.usuarioService.cadastrarUsuario(this.user)
      .subscribe(response => {
        loading.dismiss();
        this.navCntl.setRoot('HomePage');
      }, erro => {
        console.log(erro)
        loading.dismiss();
      })
  }
  //metodo que retorna um loading na tela
  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    })
    loading.present();
    return loading;
  }

}
