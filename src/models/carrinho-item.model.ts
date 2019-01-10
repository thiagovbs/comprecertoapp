import { Produto } from "./produto.model";

export class CarrinhoItem{

    
    constructor(public produto:Produto,
                public categoriaNome?:string ,
                public quantidade:number = 1,
                ){

    }
}