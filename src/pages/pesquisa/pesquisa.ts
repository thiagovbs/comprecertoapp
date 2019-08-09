import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, PopoverController } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { Bairro } from '../../models/localidade';
import { AlcanceService } from '../../services/alcance.service';
import { PacoteTipoServico } from '../../models/pacote-tipo-servico.model';
import { Mercado } from '../../models/supermercado.model';
import { AlcanceComponent } from '../../components/alcance/alcance';

import { CarrinhoService } from '../../services/carrinho.service';

@IonicPage()
@Component({
  selector: 'page-pesquisa',
  templateUrl: 'pesquisa.html'
})
export class PesquisaPage {

  produtos: MercadoProduto[];
  servicosProduto: PacoteTipoServico[];
  filterProdutos: MercadoProduto[] = [];
  filterProdutosUnico: MercadoProduto[] = [];
  searchTerm: string;
  possuiMercadoNome: boolean;
  categoriaNome: string;
  localidadeMercado: Bairro;
  supermercados: Mercado[];
  filterSupermercados: Mercado[] = [];
  activeStar: boolean = false;
  nameIcon: string = "ios-funnel-outline";
  page: number = 0
  idMercadoLocalidades:Array<number> = null

  constructor(public navCtrl: NavController,
    public mercadoProdutosService: SubCategoriaService,
    public alertCrtl: AlertController,
    private alcanceService: AlcanceService,
    public popoverCtrl: PopoverController,
    private carrinhoItemService: CarrinhoService) {
    this.page = 0;
  }

  //Impedir que a página abra sem o alcance settado
  ionViewCanEnter(): boolean {
    let retornoAlcance: boolean = false;
    if (this.alcanceService.getLocaAlcance()) {
      retornoAlcance = true;
    }
    else {
      let popover = this.popoverCtrl.create(AlcanceComponent, {}, { showBackdrop: true, cssClass: 'custom-popover' });
      popover.present();
    }
    return retornoAlcance
  }

  ionViewDidLoad() {
    this.filterProdutosUnico = []
    this.idMercadoLocalidades = null
    this.possuiMercadoNome = false;
    this.produtos = null;

    //pegando a localidade para filtro de produtos
    this.localidadeMercado = this.alcanceService.getLocaAlcance();
  }

  //Clicar no botão filtrar deve aparecer um único produto e uma lista de produtos sugeridos pela pesquisa
  filtrarProduto() {
    this.page = 0;
    this.filterProdutos = [];
    //filtro com mercados localidades 
    if (this.idMercadoLocalidades !== null && this.searchTerm) {
      this.mercadoProdutosService.findProdutosComDtValidadeEmercado(this.idMercadoLocalidades, this.searchTerm, this.page, 4)
        .subscribe(resp => {
          this.filterProdutos = this.filterProdutos.concat(resp)
          this.filterProdutosUnico = new Array(this.filterProdutos[0]);
          this.filterProdutos.shift()
          if (this.filterProdutosUnico.length === 0) {
            this.myAlert("Não achamos nenhum produto com esse nome!")
            this.filterProdutosUnico = undefined;
            this.filterProdutos = undefined;
          }
        })
    }
    //filtro sem mercados localidades 
    else if (this.idMercadoLocalidades === null && this.searchTerm) {
      this.mercadoProdutosService.findProdutosComDtValidadeEbairro(this.localidadeMercado.idBairro, this.searchTerm, this.page, 4)
        .subscribe(response => {
          this.filterProdutos = response
          this.filterProdutosUnico = new Array(this.filterProdutos[0]);
          this.filterProdutos.shift()
          if (this.filterProdutosUnico.length === 0) {
            this.myAlert("Não achamos nenhum produto com esse nome!")
            this.filterProdutosUnico = undefined;
            this.filterProdutos = undefined;
          }
        });
    }
  }


  //Apagar as listas caso o usuário mude a pesquisa
  changeInput() {

  }

  filtrarMercado() {
    this.activeStar = !this.activeStar;
    this.nameIcon = this.activeStar ? 'ios-funnel' : 'ios-funnel-outline'
    if (this.activeStar) {
      this.localidadeMercado = this.alcanceService.getLocaAlcance();
      this.showInfoCompraFacil()
    }
  }

  //popover mostrar a msg de politicas do compre facil
  showInfoCompraFacil() {
    let popover = this.popoverCtrl.create('PopoverSearchMercadoPage', {}, { cssClass: 'search-mercado' });
    popover.present();
    popover.onDidDismiss((data) => {
      this.activeStar = false
      this.nameIcon = this.activeStar ? 'ios-funnel' : 'ios-funnel-outline'
      this.idMercadoLocalidades = data;
      if(this.searchTerm){
        this.filtrarProduto()
      }else{
        this.myAlert("Digite o nome do seu produto")
      }
    })
  }

  myAlert(text:string) {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
      message: text,
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }

  doInfinite(infiniteScroll) {
    this.page++;
    if (this.idMercadoLocalidades !== null) {
      this.mercadoProdutosService.findProdutosComDtValidadeEmercado(this.idMercadoLocalidades, this.searchTerm, this.page, 4)
        .subscribe(resp => {
          this.filterProdutos = this.filterProdutos.concat(resp)
        })
    } else {
      this.mercadoProdutosService.findProdutosComDtValidadeEbairro(this.localidadeMercado.idBairro, this.searchTerm, this.page, 3)
        .subscribe((response: MercadoProduto[]) => {

          this.filterProdutos = this.filterProdutos.concat(response)
        });
    }

    setTimeout(() => {
      infiniteScroll.complete()
    }, 10000)
  }


  //ao sair da tela de produtos, os itens seão adicionados no localStorage
  ionViewDidLeave() {
    this.carrinhoItemService.setLocalSacola()
  }

}
