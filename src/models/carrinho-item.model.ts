import { MercadoProduto } from "./mercado-produto.model";

export class CarrinhoItem {


    constructor(public produto: MercadoProduto,
        public categoriaNome?: string,
        public quantidade: number = 1,
    ) { 
        this.value()

    }
    
    value(): number {
        return this.produto.precoMercadoProduto * this.quantidade;
    }
    
}