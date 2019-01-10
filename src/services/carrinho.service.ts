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
    addItem(item: Produto, nomeCategoria?:string) {
        let foundItem = this.items.find((carditem) => carditem.produto.idProduto === item.idProduto);
        if (foundItem) {
            this.aumentaQnt(foundItem);
        } else {
            this.items.push(new CarrinhoItem(item, nomeCategoria));
        }
    }

    //aumenta a quantidade se o carrinho possuir o produto
    aumentaQnt(item: CarrinhoItem): number {
        console.log(item.produto.quantidade + "+" + item.quantidade)
        if (item.quantidade >= item.produto.quantidade) {

            this.ctrlAlert.create({
                title: 'Quantidade Excedida',
                message: 'Não há mais produtos no estoque',
                enableBackdropDismiss: false,
                buttons: [
                    { text: 'Ok' }
                ]
            }).present()
            return item.quantidade
        }
        return item.quantidade = item.quantidade + 1;
    }

    //diminui a quantidade se o carrinho possuir o produto
    diminuiQnt(item: Produto) {
        let foundItem = this.items.find((carditem: CarrinhoItem) => carditem.produto.idProduto === item.idProduto);
        this.diminuiQntCarrinho(foundItem);
    }

    //deleta o produto da lista
    removeItem(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    diminuiQntCarrinho(item: CarrinhoItem) {
        if (item.quantidade <= 1) {
            this.removeItem(item)
        }
        return item.quantidade = item.quantidade - 1;
    }
}