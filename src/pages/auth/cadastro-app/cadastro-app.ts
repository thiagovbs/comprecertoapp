import { Component, ContentChild } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControlName, Validators, AbstractControl } from '@angular/forms';
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

  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
  dtNascimento: any = '';
  sexoList = [
    { nome: 'Masculino', value: 'M' },
    { nome: 'Feminino', value: 'F' },
    { nome: 'Outro', value: 'O' },

  ];

  usuario: Usuario;
  permissao: Permissao;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private datePicker: DatePicker) {

    this.cadastroForm = this.formBuilder.group({
      nome: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      sexo: this.formBuilder.control('', [Validators.required]),
      data:this.formBuilder.control({value:'', disabled:true}, [Validators.required], ),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      senha: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      confirmSenha: this.formBuilder.control('', [Validators.required])
    }, { validator: CadastroAppPage.equalTo })

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

      this.dtNascimento =  date.toLocaleDateString();
      console.log(this.dtNascimento)
    },err => console.log('Error occurred while getting date: ', err)

    );

  }

  SubmitForm() {
    let nome_form = this.cadastroForm.controls['nome'].value;
    let sexo_form = this.cadastroForm.controls['sexo'].value;
    let dtNascimento_form = this.cadastroForm.controls['dtNascimento'].value;
    let dt_Nascimento = new Date(dtNascimento_form)
    var milliseconds = dt_Nascimento.getTime();
    let email_form = this.cadastroForm.controls['email'].value;
    let senha_form = this.cadastroForm.controls['senha'].value;


    this.permissao = {
      descricao: "USER"
    }

    let loading: Loading = this.showLoading();

    this.usuario = {
      nome: nome_form,
      email: email_form,
      login: email_form,
      dtNascimento: milliseconds,
      senha: senha_form,
      sexo: sexo_form,
      permissoes: [this.permissao]
    }

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
