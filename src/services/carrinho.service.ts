import { Injectable } from "@angular/core";
import { Produto } from "../models/produto.model";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { AlertController } from "ionic-angular";

@Injectable()
export class CarrinhoService {

    items: CarrinhoItem[] = [];

    carrinhoItem: CarrinhoItem
    produto: Produto;

    constructor(private ctrlAlert: AlertController) {
        //inicializando o carrinho
        this.carrinhoItem = {
            produto: this.produto,
            quantidade: 1
        }

    }

    //deleta todos os produtos da lista
    clear() {
        this.items = [];
    }

    //adiciona item no carrinhoItem
    addItem(item: Produto) {
        let foundItem = this.items.find((carditem) => carditem.produto.idProduto === item.idProduto);
        if (foundItem) {
            this.aumentaQnt(foundItem);
        } else {
            this.items.push(new CarrinhoItem(item));
        }
    }

    //aumenta a quantidade se o carrinho possuir o produto
    private aumentaQnt(item: CarrinhoItem): number {
        console.log(item.produto.quantidade + "+" + item.quantidade)
        if (item.quantidade >= item.produto.quantidade) {
            this.ctrlAlert.create({
                title: 'Quantidade Excedida',
                enableBackdropDismiss: false,
                buttons: [
                    { text: 'Ok' }
                ]
            }).present()
            return item.quantidade
        }
        return item.quantidade = item.quantidade + 1;
    }

    //aumenta a quantidade se o carrinho possuir o produto
    diminuiQnt(item: Produto): number {
        let foundItem = this.items.find((carditem: CarrinhoItem) => carditem.produto.idProduto === item.idProduto);
        if (foundItem.quantidade <= 1) {
            this.removeItem(foundItem)
        }
        return foundItem.quantidade = foundItem.quantidade - 1;
    }

    //deleta o produto da lista
    removeItem(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }
}