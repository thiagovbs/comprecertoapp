import { Injectable } from "@angular/core";
import { CarrinhoItem } from "../models/carrinho-item.model";
import { Events } from "ionic-angular";
import { MercadoProduto } from "../models/mercado-produto.model";

import { STORAGE_KEYS } from "../config/storage_keys.config";
import { CompraFacilService } from "./compra-facil.service";

@Injectable()
export class CarrinhoService {

    items: CarrinhoItem[] = [];

    carrinhoItem: CarrinhoItem

    constructor(public events: Events, private compraFacilService: CompraFacilService) {
        this.getLocaSacola()
    }

    //Pegar o usuário e sacola ativo no localstorage
    getLocaSacola() {
        let dataAtual = new Date().getDate()
        let sacola = localStorage.getItem(STORAGE_KEYS.localSacola);
        if (sacola === null) {
            return null
        } else {
            this.items = JSON.parse(sacola);
            //Exclui produto na sacola caso a dt de validade seja ultrapassada
            this.items.map((item: CarrinhoItem) => {
                let dtValidade = new Date(item.produto.dtValidadeMercadoProduto).getDate()
                
                console.log("data validade: " +dtValidade)
                console.log("Data atual " +dataAtual)
                if (dataAtual > dtValidade) {
                    this.items.splice(this.items.indexOf(item), 1);
                    this.setLocalSacola()
                }
            })
            return this.items;
        }
    }

    //Settar a sacola no localStorage
    setLocalSacola() {
        if (this.items === null) {
            localStorage.removeItem(STORAGE_KEYS.localSacola)
        } else {
            localStorage.setItem(STORAGE_KEYS.localSacola, JSON.stringify(this.items))
        }
    }

    //deleta todos os produtos da lista
    clear() {
        this.items = [];
    }

    //adiciona item no carrinhoItem
    addItem(item: MercadoProduto, nomeCategoria?: string) {
        console.log(item)
        let foundItem = this.items.find((carditem: CarrinhoItem) => carditem.produto.idMercadoProduto === item.idMercadoProduto);
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

    //diminui a quantidade se do produto-item possuir o produto
    diminuiQnt(item: MercadoProduto) {
        let foundItem = this.items.find((carditem: CarrinhoItem) => carditem.produto.idMercadoProduto === item.idMercadoProduto);

        if (foundItem.quantidade <= 1) {
            this.removeItem(foundItem)
        }

        return foundItem.quantidade = foundItem.quantidade - 1;
    }

    //deleta o produto da lista
    removeItem(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
    }

    //deleta o produto do carrinho quando clicar no menos
    removeItemCarrinho(item: CarrinhoItem) {
        this.items.splice(this.items.indexOf(item), 1);
        this.setLocalSacola()
        this.events.publish('deletar');

    }

    diminuiQntCarrinho(item: CarrinhoItem) {
        if (item.quantidade <= 1) {
            this.removeItemCarrinho(item)
        }
        return item.quantidade = item.quantidade - 1;

    }

    total() {
        if (this.items) {
            return this.items.map((item: CarrinhoItem) =>
                item.produto.precoMercadoProduto * item.quantidade
            ).reduce((prev, value) => prev + value, 0)
        }

    }

    getItemsCarrinho() {
        if (this.items) {
            console.log(this.items)
            this.compraFacilService.setMercadoDTO(this.items);
        }
    }
}