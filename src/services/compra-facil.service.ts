import { Injectable } from "@angular/core";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { SacolaMercados, SacolaMercadoDTO } from "../models/SacolaMercados.model";
import { Pedido } from "../models/pedido.model";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { UsuarioService } from "./usuario.service";


@Injectable()
export class CompraFacilService {

    itensCarrinho: CarrinhoItem[] = [];

    sacolaMercadoDTO: SacolaMercadoDTO = {} as SacolaMercadoDTO;
    sacolaMercados: SacolaMercados[] = [];
    sacolaMercado: SacolaMercados = {} as SacolaMercados;


    constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

    enderecoUsuarioPedido: any;
    dataEntradaPedido: any
    entregaOuRetirada: any;
    formadePagamento: any

    //settando os valores dentro do model produtos por mercado
    setMercadoDTO(items: CarrinhoItem[]) {

        this.sacolaMercados =[]

        items.map((carrinho: CarrinhoItem) => {
            let sacolaMercado: SacolaMercadoDTO = {} as SacolaMercadoDTO;
            sacolaMercado.idMercado = carrinho.produto.idMercado;
            sacolaMercado.idMercadoLocalidade = carrinho.produto.idMercadoLocalidade;
            sacolaMercado.nomeMercado = carrinho.produto.nomeFantasiaMercado;
            sacolaMercado.imagemMercado = carrinho.produto.mercadoImagemUrl;
            sacolaMercado.horarioMaximo = carrinho.produto.horarioMaximo;
            sacolaMercado.horarioMaximoEntrega = carrinho.produto.horarioMaximoEntrega;
            sacolaMercado.valorFrete = carrinho.produto.valorFrete;
            sacolaMercado.valorMinimo = carrinho.produto.valorMinimo;
            sacolaMercado.entrega = carrinho.produto.entrega;

            this.sacolaMercados.push(new SacolaMercados(sacolaMercado, []))
        })
        //filtra o array para que não haja categorias repetidas
        let findMercadoRepeated = this.sacolaMercados.find(sacola => sacola.sacolaMercado.idMercadoLocalidade)
        if (findMercadoRepeated) {
            this.sacolaMercados.splice(this.sacolaMercados.indexOf(findMercadoRepeated), 1);
        }
        //mapeio os mercados gerados filtro os items dos respectivos mercados
        this.sacolaMercados.map(mercado => {
          let findProdutos =  items.filter(item=> item.produto.idMercadoLocalidade === mercado.sacolaMercado.idMercadoLocalidade);
          mercado.carrinhoItem =findProdutos;
        })
    }

    setSacolaMercados(): SacolaMercados[] {
        return this.sacolaMercados;
    }

    getQntProdutosPorMercado(carrinhoMercado: CarrinhoItem[]): number {
        let quantidade: number = 0;
        carrinhoMercado.map((carrinho: CarrinhoItem) => {
            quantidade = quantidade + carrinho.quantidade
        })
        return quantidade;
    }

    getValorProdutosPorMercado(carrinhoMercado: CarrinhoItem[]): number {
        let valorTotal: number = 0;
        carrinhoMercado.map((carrinhoMercado: CarrinhoItem) => {
            let total = carrinhoMercado.produto.precoMercadoProduto * carrinhoMercado.quantidade
            valorTotal = valorTotal + total
        })
        return valorTotal
    }


    postPedido(pedido: Pedido) {
        return this.http.post(`${API_CONFIG.baseUrl}/pedido`, pedido);
    }




    setEnderecoPedidoUsuario(endereco: any) {
        this.enderecoUsuarioPedido = endereco;
    }

    getEnderecoPedidoUsuario() {
        if (this.enderecoUsuarioPedido) {
            return this.enderecoUsuarioPedido;
        }
    }


    setDataRetiradaPedidoUsuario(dataEntrada: any) {
        this.dataEntradaPedido = dataEntrada;
    }

    getDataRetiradaPedidoUsuario() {
        if (this.dataEntradaPedido) {
            return this.dataEntradaPedido;
        }
    }

    setEntregaOuRetirada(entregaOuRetirada: any) {
        this.entregaOuRetirada = entregaOuRetirada
    }

    getEntregaOuRetirada() {
        if (this.entregaOuRetirada) {
            return this.entregaOuRetirada;
        }
    }


    setPagamento(evento) {
        this.formadePagamento = evento
    }

    getPagamento() {
        if (this.formadePagamento) {
            return this.formadePagamento;
        }
    }

}
