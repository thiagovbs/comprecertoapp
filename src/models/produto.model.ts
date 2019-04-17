import { Subcategoria } from "./subcategoria.model";
import { UnidadeDeMedida } from "./unidadeDeMedida";
import { MercadoProduto } from "./mercado-produto.model";

export class Produto{
    dtAlteracao:string;
    dtCriacao:string;
    idProduto:number;
    imagem:string;
    marca:string;
    nome:string;
    caracteristica:string;
    quantidade:number;
    subcategoria:Subcategoria;
    unidadeMedida:UnidadeDeMedida;
    mercadoProdutos:MercadoProduto[]

}



