import { Produto } from "./produto.model";
import { MercadoProduto } from "./mercado-produto.model";

export class CarrinhoItem {


    constructor(public produto: MercadoProduto,
        public categoriaNome?: string,
        public quantidade: number = 1,
    ) { }
    
    value(): number {
        return this.produto.preco * this.quantidade;
    }
}