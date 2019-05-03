import { Injectable } from "@angular/core";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { SacolaMercados, SacolaMercadoDTO } from "../models/SacolaMercados.model";
import { MercadoProduto } from "../models/mercado-produto.model";


@Injectable()
export class CompraFacilService {

    itensCarrinho: CarrinhoItem[] = [];

    sacolaMercadoDTO: SacolaMercadoDTO = {} as SacolaMercadoDTO;

    sacolaMercados: SacolaMercados[] = [];
    sacolaMercado: SacolaMercados = {} as SacolaMercados;

    getItemsCarrinho(item: CarrinhoItem[]) {
        this.itensCarrinho = item;
        this.setMercadoDTO(item);

    }

    setMercadoDTO(item: CarrinhoItem[]) {
        item.map((carrinho: CarrinhoItem) => {
            this.sacolaMercadoDTO.idMercado = carrinho.produto.idMercado;
            this.sacolaMercadoDTO.idMercadoLocalidade = carrinho.produto.idMercadoLocalidade;
            this.sacolaMercadoDTO.nomeMercado = carrinho.produto.nomeFantasiaMercado;

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
        let quantidade:number =0;
        carrinhoMercado.map((carrinho: CarrinhoItem) => {
            
            quantidade = quantidade + carrinho.quantidade
            
        })
        return quantidade;
    }

    getValorProdutosPorMercado(carrinhoMercado: CarrinhoItem[]): number{
        let valorTotal:number = 0;
        carrinhoMercado.map((carrinhoMercado: CarrinhoItem) => {        
            valorTotal = valorTotal + carrinhoMercado.value()
        })
        return valorTotal
    }

}
