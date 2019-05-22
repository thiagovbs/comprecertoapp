import { Component, ContentChild } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControlName, Validators } from '@angular/forms';
import { Usuario, Permissao } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/userLogin';

@Component({
  selector: 'info-sign-popover',
  templateUrl: 'info-sign-popover.html'
})
export class InfoSignPopoverComponent {


  cadastroPopUpForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;

  user: Usuario;
  loginUser:UserLogin;
  faceId: string;
  faceEmail: string;
  faceNome: string;
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
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private events: Events
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
    this.faceNome = face.nome;
    this.faceEmail = face.username;

    
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

    

    this.loginUser ={
      username: this.user.email,
      password:this.user.senha
    }
    console.log(this.user)
    //Cadastro usuario
    this.usuarioService.cadastrarUsuario(this.user)
      .subscribe(response => {
        //JSON.parse(response.body);
        loading.dismiss();
        if (response.status) {
          this.authService.autenticar(this.loginUser).subscribe(resp => {
            //armazena informações no localStorage
            this.authService.armazenarToken(resp['access_token']);
            this.authService.armazenarRefreshToken(resp['refresh_token']);
            this.authService.successfullLogin(resp);
            this.events.publish('user:LoggedIn');
            this.navCntl.setRoot('HomePage');

          }, err => {
            console.log(err)
          })
        }
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
