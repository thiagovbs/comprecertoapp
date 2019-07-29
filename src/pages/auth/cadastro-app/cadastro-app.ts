import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormControlName, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Usuario, Permissao } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-cadastro-app',
  templateUrl: 'cadastro-app.html',
})
export class CadastroAppPage {

  cadastroForm: FormGroup
  @ContentChild(FormControlName) control: FormControlName;

  dtNascimento: any = '';
  sexoList = [
    { nome: 'Masculino', value: 'M' },
    { nome: 'Feminino', value: 'F' },
    { nome: 'Outro', value: 'O' },
  ];
  emailEditado: string = "";
  emailPattern = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/
  usuario: Usuario;
  permissao: Permissao;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private datePicker: DatePicker) {

    this.cadastroForm = new FormGroup({
      nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
      sexo: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required, Validators.minLength(14), Validators.maxLength(14)] ),
      data: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      senha: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmSenha: new FormControl('', [Validators.required])
    }, { validators: CadastroAppPage.equalTo })

  }
  //condiciona ao usuário digital o email com letra minúscula e sem espaço
  changeInput(evento) {
    let email: string = evento.target.value
    this.emailEditado = email.replace(/ /g, "").toLowerCase();
  }

  static equalTo(group: AbstractControl): { [key: string]: boolean } {
    const senha = group.get('senha');
    const confirmSenha = group.get('confirmSenha');

    if (!senha.value || !confirmSenha.value) {
      return undefined;
    }
    if (senha.value !== confirmSenha.value) {
      return { senhaNaoCompara: true }
    }
    return undefined;
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);

  }

  onBirthday() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(date => {

      this.dtNascimento = date.toLocaleDateString();

    }, err => console.log('Error occurred while getting date: ', err));
    console.log(this.cadastroForm.controls['data'].value);
  }

  SubmitForm() {

    let nome_form = this.cadastroForm.controls['nome'].value;
    let sexo_form = this.cadastroForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroForm.controls['data'].value;
    let dt_Nascimento = new Date(dtNascimento_form)
    var milliseconds = dt_Nascimento.getTime();
    let email_form: string = this.cadastroForm.controls['email'].value;
    email_form = email_form.trim()
    let senha_form = this.cadastroForm.controls['senha'].value;
    let cpf_form  = this.cadastroForm.controls['cpf'].value;

    this.permissao = {
      idPermissao:3,
      descricao: "USUARIO"
    }

    let loading: Loading = this.showLoading();

    this.usuario = {
      nome: nome_form,
      email: email_form,
      login: email_form,
      dtNascimento: milliseconds,
      senha: senha_form,
      sexo: sexo_form,
      cpf:cpf_form,
      permissoes: [this.permissao]
    }
    console.log(this.usuario);
    this.usuarioService.cadastrarUsuario(this.usuario)
      .subscribe(response => {

        loading.dismiss();
        if (response.status) {
          let alert = this.alertCtrl.create({
            title: 'Parabéns',
            subTitle: 'Cadastro criado com sucesso',
            buttons: ['OK'],
            cssClass: 'AlertCompraFacil'
          });
          alert.present();
          this.navCtrl.push('LoginPage');
        }
      },
        error => {
          loading.dismiss();
        });
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
