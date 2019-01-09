import { Produto } from "./produto.model";

export class CarrinhoItem{

    
    constructor(public produto:Produto, public quantidade:number = 1){

    }
}