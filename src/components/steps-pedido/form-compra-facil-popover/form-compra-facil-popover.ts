import { Component, ContentChild } from '@angular/core';
import { FormGroup, FormControlName, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ViewController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../../services/usuario.service';
import { AlcanceService } from '../../../services/alcance.service';
import { SacolaMercados } from '../../../models/SacolaMercados.model';
import { EnderecoLocalStorage } from '../../../models/endereco-localstorage';

@Component({
  selector: 'form-compra-facil-popover',
  templateUrl: 'form-compra-facil-popover.html'
})
export class FormCompraFacilPopoverComponent {

  enderecoForm: FormGroup
  usuarioNome: string;
  nomeCidade: string;
  pedidoMercado: SacolaMercados = {} as SacolaMercados
  nomeEstado: string;
  bairro: string;
  @ContentChild(FormControlName) control: FormControlName;


  constructor(
    public viewCtrl: ViewController,
    private localUser: UsuarioService,
    private navParams: NavParams,
    private localAlcance: AlcanceService) {

    this.enderecoForm = new FormGroup({
      nome: new FormControl({ value: this.usuarioNome, disabled: true }, [Validators.required]),
      cpf: new FormControl({ value: '139-791-307-03', disabled: true }, [Validators.required]),
      celular: new FormControl('', [Validators.required, Validators.minLength(14)]),
      endereco: new FormControl('', [Validators.required, Validators.minLength(3)]),
      numero: new FormControl('', [Validators.required]),
      complemento: new FormControl(''),
      bairro: new FormControl({ value: this.bairro }, [Validators.required, Validators.minLength(3)]),
      cidade: new FormControl({ value: this.nomeCidade }),
      estado: new FormControl({ value: this.nomeEstado }),
    })

    this.nomeCidade = localAlcance.getLocaAlcance().cidade.nome;
    this.nomeEstado = localAlcance.getLocaAlcance().cidade.estado.sigla
    this.bairro = localAlcance.getLocaAlcance().nome;

  }

  ionViewDidLoad() {
    this.usuarioNome = this.localUser.getLocalUser().nome;
    this.pedidoMercado = this.navParams.get('pedidosMercado');

    if (this.localAlcance.getLocalEndereco()) {
      this.enderecoForm.get('endereco').setValue(this.localAlcance.getLocalEndereco().endereco);
      this.enderecoForm.get('numero').setValue(this.localAlcance.getLocalEndereco().numero);
      this.enderecoForm.get('complemento').setValue(this.localAlcance.getLocalEndereco().complemento);
      this.enderecoForm.get('celular').setValue(this.localAlcance.getLocalEndereco().celular);
    }

    /* 
        this.pedidoMercado.sacolaMercado.horarioMaximoEntrega */
  }

  SubmitForm() {
    let localEndereco:EnderecoLocalStorage;

    let endereco = this.enderecoForm.controls['endereco'].value;
    let celular = this.enderecoForm.controls['celular'].value;
    let numero = this.enderecoForm.controls['numero'].value;
    let complemento = this.enderecoForm.controls['complemento'].value;

    localEndereco = { endereco: endereco, celular: celular, numero: numero, complemento: complemento };

    this.localAlcance.setLocalEndereco(localEndereco);
    this.viewCtrl.dismiss(this.enderecoForm.value)
  }



}
