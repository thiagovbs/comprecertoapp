import { Injectable } from "@angular/core";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { SacolaMercados, SacolaMercadoDTO } from "../models/SacolaMercados.model";
import { MercadoProduto } from "../models/mercado-produto.model";
import { Pedido } from "../models/pedido.model";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class CompraFacilService {

    itensCarrinho: CarrinhoItem[] = [];

    sacolaMercadoDTO: SacolaMercadoDTO = {} as SacolaMercadoDTO;

    sacolaMercados: SacolaMercados[] = [];
    sacolaMercado: SacolaMercados = {} as SacolaMercados;

    constructor(private http: HttpClient) { }

    setMercadoDTO(item: CarrinhoItem[]) {
        item.map((carrinho: CarrinhoItem) => {
            this.sacolaMercadoDTO.idMercado = carrinho.produto.idMercado;
            this.sacolaMercadoDTO.idMercadoLocalidade = carrinho.produto.idMercadoLocalidade;
            this.sacolaMercadoDTO.nomeMercado = carrinho.produto.nomeFantasiaMercado;
            this.sacolaMercadoDTO.imagemMercado = carrinho.produto.mercadoImagemUrl
            this.sacolaMercadoDTO.horarioMaximo = carrinho.produto.horarioMaximo
            this.sacolaMercadoDTO.valorFrete = carrinho.produto.valorFrete
            this.sacolaMercadoDTO.valorMinimo = carrinho.produto.valorMinimo

            //this.sacolaMercadoDTO.imagemMercado = carrinho.

            let foundMercado: SacolaMercados = this.sacolaMercados.find((carditem: SacolaMercados) => carditem.sacolaMercado.idMercadoLocalidade === carrinho.produto.idMercadoLocalidade);
            if (foundMercado) {
                foundMercado.sacolaMercado = this.sacolaMercadoDTO;
            } else {
                this.sacolaMercados.push(new SacolaMercados(this.sacolaMercadoDTO, item))
            }
        })
    }

    getSacolaMercados(): SacolaMercados[] {
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
}
