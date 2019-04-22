import { Produto } from "./produto.model";
import {Mercado } from "./supermercado.model";

export interface MercadoProduto{

    idMercadoProduto:number,
    observacao:string,
    preco:number,
    dtValidade:Date,
    dtEntrada:Date,
    produto:Produto,
    fdestaque:boolean,
    fsuperDestaque:boolean,
    mercadoLocalidade:any



}