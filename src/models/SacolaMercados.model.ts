import { CarrinhoItem } from "./carrinho-item.model";
import { Time } from "@angular/common";

export class SacolaMercados {


    constructor(public sacolaMercado:SacolaMercadoDTO,
                public carrinhoItem:CarrinhoItem[]){}

}

export interface SacolaMercadoDTO {
    idMercadoLocalidade: number,
    idMercado: number,
    nomeMercado: string
    imagemMercado?:string,
    valorFrete: number,
    valorMinimo: number,
    horarioMaximo:any,
    entrega:any,
    horarioMaximoEntrega?:any;

}


