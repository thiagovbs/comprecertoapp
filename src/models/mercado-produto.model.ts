import { Time } from "@angular/common";

export interface MercadoProduto{
    caracteristicaProduto:string,
    dtValidadeMercadoProduto:Date,
    fDestaqueMercadoProduto:boolean,
    mercadoImagemUrl?:string,
    idCategoria:number,
    idMercado:number,
    valorFrete?: number,
    valorMinimo?: number,
    horarioMaximo?:Time,
    idMercadoLocalidade:number,
    idMercadoProduto:number,
    idProduto:number,
    idSubcategoria:number,
    marcaProduto:string,
    nomeCategoria:string,
    nomeFantasiaMercado:string,
    mercadoServicos:any;
    nomeProduto:string,
    nomeSubcategoria:string,
    observacao:string,
    precoMercadoProduto:number,
    quantidadeProduto:string,
    unidadeMedida:string
}