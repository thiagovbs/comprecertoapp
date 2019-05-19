import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, PopoverController } from 'ionic-angular';
import { SubCategoriaService } from '../../services/subcategorias.service';
import { MercadoProduto } from '../../models/mercado-produto.model';
import { Bairro } from '../../models/localidade';
import { AlcanceService } from '../../services/alcance.service';
import { Filtros } from '../../util/filtros';
import { SupermercadoService } from '../../services/supermercado.service';
import { PacoteTipoServico } from '../../models/pacote-tipo-servico.model';
import { Mercado } from '../../models/supermercado.model';

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
    private supermercadoService: SupermercadoService,
    private filtrosService: Filtros,
    public popoverCtrl: PopoverController) {
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

        //servico de posicionamento por produto
        this.supermercadoService.setServicosPorProduto(this.produtos);
        this.servicosProduto = this.supermercadoService.getServicosPorProduto();

        //filtros
        this.filtrosService.sortByFDestaque(this.produtos);
        this.filtrosService.sortByServicoPosicionamentoMercado(this.servicosProduto);
        this.filtrosService.sortByPreco(this.produtos)

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
    let novoArrayNomeCompletoProdutos: Array<{ id: number, nome: string }> = []

    //verificar se há texto no campo e se possui produtos no array inicial
    if (this.searchTerm && this.arrayNomeCompletoProdutos) {
      //filtro que compara a string digitada com o array do nome completo de produtos
      novoArrayNomeCompletoProdutos = this.arrayNomeCompletoProdutos.filter((produto) => {
        return produto.nome.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1
      })
      //transformar a string novoArrayNomeCompletoProdutos em um tipo produto
      this.produtos.filter((produto: MercadoProduto) => {
        novoArrayNomeCompletoProdutos.map(p => {
          if (produto.idMercadoProduto === p.id && this.filterProdutosUnico.length === 0) {
            return this.filterProdutosUnico.push(produto);
          }
        })
      })

      //filtro para produtos sugeridos
      this.produtos.filter((produto: MercadoProduto) => {
        novoArrayNomeCompletoProdutos.map(p => {
          if (produto.idMercadoProduto === p.id && p.id !== this.filterProdutosUnico[0].idMercadoProduto) {
            return this.filterProdutos.push(produto)
          }
        })
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

}
