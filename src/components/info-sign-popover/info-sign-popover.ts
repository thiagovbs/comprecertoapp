import { Component, ContentChild } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController, Events, App, ViewController } from 'ionic-angular';
import { FormGroup, FormControlName, Validators, FormControl } from '@angular/forms';
import { Usuario, Permissao } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../models/userLogin';
import { DatePicker } from '@ionic-native/date-picker';
import { FCM } from '@ionic-native/fcm';

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
  faceSobrenome:string;
  permissao: Permissao;
  dtNascimento: any = '';

  sexoList = [
    { nome: 'Masculino', value: 'M' },
    { nome: 'Feminino', value: 'F' },
    { nome: 'Outro', value: 'O' },

  ];

  constructor(private navCntl: NavController,
    private params: NavParams,
    private usuarioService: UsuarioService,
    public loadingCtrl: LoadingController,
    private authService: AuthService,
    private events: Events,
    private datePicker: DatePicker,
    private fcm: FCM,
    private app:App,
    public viewCtrl: ViewController) {
      

    this.cadastroPopUpForm = new FormGroup({
      sexo: new FormControl('', [Validators.required]),
      data: new FormControl({ value: '', disabled: true }, [Validators.required]),
      cpf: new FormControl({ value: '' }, [Validators.required, Validators.minLength(14)]),
    })

    //Informação não nula
    this.faceId = "";
    this.faceEmail = "";
    this.faceNome = "";
    this.faceSobrenome = "";

  }

  ionViewWillEnter() {
    let face = this.params.get('usuario');
    //this.faceId = face.password;
    this.faceId = face.password;
    this.faceNome = face.nome;
    this.faceEmail = face.username;
    this.faceSobrenome = face.sobrenome;

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
      sobrenome: this.faceSobrenome,
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
      .subscribe((response: any) => {
        loading.dismiss();
        if (response.status) {
          this.authService.autenticar(this.loginUser).subscribe((data:any) => {
            //armazena informações no localStorage
            this.authService.armazenarToken(data['access_token']);
            this.authService.armazenarRefreshToken(data['refresh_token']);
            this.authService.successfullLogin(data);
            this.fcm.getToken().then(token => {
              this.authService.salvarToken(token, data.user.idUsuario).subscribe(resp => {
                this.viewCtrl.dismiss();
                this.events.publish('user:LoggedIn');
                this.app.getRootNav().setRoot("HomePage");
              })
            });
          }, err => {
            //console.log(err)
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
      spinner: 'dots',
    })
    loading.present();
    return loading;
  }

  onPageWillLeave(): void {
    this.events.unsubscribe('user:LoggedIn');
  }

}
