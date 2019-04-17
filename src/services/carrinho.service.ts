import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { AlertController, Events } from "ionic-angular";
import { MercadoProduto } from "../models/mercado-produto.model";

@Injectable()
export class CarrinhoService {

    items: CarrinhoItem[] = [];

    carrinhoItem: CarrinhoItem
    produto: Produto;

    constructor(private ctrlAlert: AlertController, public events: Events) {

    }

    //deleta todos os produtos da lista
    clear() {
        this.items = [];
    }

    //adiciona item no carrinhoItem
    addItem(item: MercadoProduto, nomeCategoria?: string) {
        let foundItem = this.items.find((carditem) => carditem.produto.produto.idProduto === item.produto.idProduto);
        if (foundItem) {
            this.aumentaQnt(foundItem);
        } else {
            this.items.push(new CarrinhoItem(item, nomeCategoria));
        }
    }

    //aumenta a quantidade se o carrinho possuir o produto
    aumentaQnt(item: CarrinhoItem): number {
        return item.quantidade = item.quantidade + 1;
    }

    //diminui a quantidade se o carrinho possuir o produto
    diminuiQnt(item: MercadoProduto) {
        let foundItem = this.items.find((carditem: CarrinhoItem) => carditem.produto.produto.idProduto === item.produto.idProduto);
        console.log(foundItem.quantidade)
        if (foundItem.quantidade <= 1) {
            this.removeItem(foundItem)
        }
        return foundItem.quantidade = foundItem.quantidade - 1;
    }

    //deleta o produto da lista
    removeItem(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
        //this.events.publish('deletar');
    }

    //deleta o produto da lista
    removeItemCarrinho(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
        this.events.publish('deletar');
    }

    diminuiQntCarrinho(item: CarrinhoItem) {
        if (item.quantidade <= 1) {
            this.removeItemCarrinho(item)
        }
        return item.quantidade = item.quantidade - 1;
       
    }

    total():number{
        return this.items.map(item => item.value())
                         .reduce((prev, value)=> prev+value, 0)
    }
}