import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { CarrinhoItem } from "../models/carrinho-item.model";

@Injectable()
export class CarrinhoService{

    items:CarrinhoItem[] =[];

    clear(){
        this.items = [];
    }

    addItem(item:Produto){
        let foundItem = this.items.find((produtoItem) => produtoItem.produto.idProduto === item.idProduto)
        if(foundItem){
            console.log("Encontrei item")
            
        }else{
            
            this.items.push(new CarrinhoItem(item));
            console.log(this.items)
        }
    }

    removeItem(item:CarrinhoItem){
        this.items.splice(this.items.indexOf(item),1);    
    }

    verificaItemNoCarrinho(item:Produto):boolean{
        let foundItem = this.items.find((produtoItem) => produtoItem.produto.idProduto === item.idProduto)
        if(foundItem){
            return true;
        }else{
            return false;
        }
        
    }

}