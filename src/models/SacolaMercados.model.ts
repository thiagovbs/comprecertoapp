
import { MercadoProduto } from "./mercado-produto.model";
import { CarrinhoItem } from "./carrinho-item.model";

export class SacolaMercados {


    constructor(public sacolaMercado:SacolaMercadoDTO,
                public carrinhoItem:CarrinhoItem[]){}

}

export interface SacolaMercadoDTO {
    idMercadoLocalidade: number,
    idMercado: number,
    nomeMercado: string
}


