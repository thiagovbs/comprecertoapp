import { Time } from "@angular/common";

export interface MercadoProduto{
    caracteristicaProduto:string,
    entrega:any,
    endereco:string,
    dtValidadeMercadoProduto:Date,
    fDestaqueMercadoProduto:boolean,
    mercadoImagemUrl?:string,
    imagemUrl?:string,
    idCategoria:number,
    idMercado:number,
    valorFrete?: number,
    valorMinimo?: number,
    horarioMaximo?:Time,
    horarioMaximoEntrega?:Time,
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