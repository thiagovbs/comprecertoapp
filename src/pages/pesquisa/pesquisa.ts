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
  arrayNomeCompletoProdutos: Array<{ id: number, nome: string }> = [];
  tiposServico: PacoteTipoServico[]
  supermercados: Mercado[];
  filterSupermercados: Mercado[] = [];
  activeStar: boolean = false;
  nameIcon: string = "ios-funnel-outline";

  constructor(public navCtrl: NavController,
    public mercadoProdutosService: SubCategoriaService,
    public alertCrtl: AlertController,
    private alcanceService: AlcanceService,
    public popoverCtrl: PopoverController,
    private carrinhoItemService: CarrinhoService) {
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

    this.possuiMercadoNome = false;
    this.produtos = null;
    //pegando a localidade para filtro de produtos
    this.localidadeMercado = this.alcanceService.getLocaAlcance();

    //serviço que retorna produtos de mercados por localidade
    this.mercadoProdutosService.findProdutosComDtValidadeEbairro(this.localidadeMercado.idBairro)
      .subscribe((response: MercadoProduto[]) => {
        this.produtos = response;

        //pega os produtos e cria um array por (nome - marca - caracteristica)
        this.produtos.map((produto: MercadoProduto) => {
          this.arrayNomeCompletoProdutos.push({
            id: produto.idMercadoProduto,
            nome: `${produto.nomeProduto} ${produto.marcaProduto} ${produto.caracteristicaProduto}`
          })
        })
      }, erro => { })
  }

  //Clicar no botão filtrar deve aparecer um único produto e uma lista de produtos sugeridos pela pesquisa
  filtrarProduto() {

    this.filterProdutos = [];
    this.filterProdutosUnico = []

    console.log("pesquisar")
    //verificar se há texto no campo e se possui produtos no array inicial
    if (this.searchTerm && this.arrayNomeCompletoProdutos) {
      this.mercadoProdutosService.findProdutosComDtValidadeEbairro2(this.localidadeMercado.idBairro, this.searchTerm)
        .subscribe((response: MercadoProduto[]) => {
          console.log(response)
        });
    
      if (this.filterProdutosUnico.length === 0) {
        this.myAlert()
        this.filterProdutosUnico = undefined;
        this.filterProdutos = undefined;
      }

    }
  }

  //Apagar as listas caso o usuário mude a pesquisa
  changeInput() {
    this.filterProdutos = [];
    this.filterProdutosUnico = [];
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
    popover.onDidDismiss(() => {
      this.activeStar = false
      this.nameIcon = this.activeStar ? 'ios-funnel' : 'ios-funnel-outline'
    })
  }

  myAlert() {
    let alert = this.alertCrtl.create({
      title: '<img src="assets/imgs/icone-de-erro.svg" height="100">',
      message: 'Não achamos nenhum produto com esse nome!',
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present()
  }


  //ao sair da tela de produtos, os itens seão adicionados no localStorage
  ionViewDidLeave() {
    this.carrinhoItemService.setLocalSacola()
  }

}
