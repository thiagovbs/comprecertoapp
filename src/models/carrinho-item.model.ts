import { Produto } from "./produto.model";

export class CarrinhoItem{

    constructor(public produto:Produto){}

    value():number{
        return this.produto.quantidade * 1;
    }
}