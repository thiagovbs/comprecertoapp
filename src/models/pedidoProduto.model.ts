import { MercadoProduto } from "./mercado-produto.model";
import { Produto } from "./Produto.model";

export interface PedidoProduto {

    idPedidoProduto: number;
    preco: number;
    quantidade: number;
    produto: Produto;
}