import { Component, ContentChild } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { Usuario, Permissao } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/userLogin';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'info-sign-popover',
  templateUrl: 'info-sign-popover.html'
})
export class InfoSignPopoverComponent {


  cadastroPopUpForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;

  user: Usuario;
  loginUser: UserLogin;
  faceId: string;
  faceEmail: string;
  faceNome: string;
  permissao: Permissao;
  dtNascimento: any = '';

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
    private events: Events,
    private datePicker: DatePicker
  ) {

    this.cadastroPopUpForm = new FormGroup({
      sexo: new FormControl('', [Validators.required]),
      data: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cpf: new FormControl({ value: '' }, [Validators.required, Validators.minLength(14)]),
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

  onBirthday() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(date => {
      this.dtNascimento = date.toLocaleDateString();
    }, err => console.log('Error occurred while getting date: ', err));
  }


  SubmitMaisInfoForm() {
    let loading: Loading = this.showLoading();

    let sexo_form = this.cadastroPopUpForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroPopUpForm.controls['data'].value;
    let cpf_form = this.cadastroPopUpForm.controls['cpf'].value;
    let dt_Nascimento = new Date(dtNascimento_form)
    var milliseconds = dt_Nascimento.getTime();

    this.permissao = {
      idPermissao: 3,
      descricao: "USUARIO"
    }

    //preenchendo o usuário com todas as informações para seu cadastro
    this.user = {
      nome: this.faceNome,
      email: this.faceEmail,
      login: this.faceEmail,
      cpf: cpf_form,
      dtNascimento: milliseconds,
      senha: this.faceId,
      sexo: sexo_form,
      permissoes: [this.permissao]
    }

    this.loginUser = {
      username: this.user.email,
      password: this.user.senha
    }

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
            loading.dismiss();
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
