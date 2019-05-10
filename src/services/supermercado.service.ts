import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Bairro } from "../models/localidade";
import { MercadoDetalheProd, MercadoDetalheSubcategoria } from "../pages/supermercado-detalhe/supermercado-detalhe";
import { MercadoProduto } from "../models/mercado-produto.model";
import { PacoteTipoServico } from "../models/pacote-tipo-servico.model";

@Injectable()
export class SupermercadoService {

  mercadoCategoria: MercadoDetalheProd[] = [];
  mercadoSubCategoria: MercadoDetalheSubcategoria[] = []
  tipoServico:PacoteTipoServico

  constructor(public http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados`)
  }

  buscarMercadoprodutosPorBairro(lodalidadeMercado: Bairro) {
    console.log(lodalidadeMercado.idBairro)
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados?idBairro=${lodalidadeMercado.idBairro}`)
  }

  buscarProdutosPorMercado(idMecado) {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto?idMercado=${idMecado}`)
  }

  buscarProdutosComDataValidadePorMercado(idMecado) {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade?idMercado=${idMecado}`)
  }



  filtrarCategoriasPorMercadoProduto(mercadoProduto: MercadoProduto[]): MercadoDetalheProd[] {
    this.mercadoCategoria = [];
    
    mercadoProduto.map((mercado: MercadoProduto) => {
      this.mercadoCategoria.push({
        idCategoria: mercado.idCategoria,
        nomeMercado: mercado.nomeFantasiaMercado,
        idMercado: mercado.idMercado,
        nomeCategoria: mercado.nomeCategoria,
      });
    })
    //filtra o array para que não haja categorias repetidas
    this.mercadoCategoria = this.mercadoCategoria.filter((thing, index, self) => {
      return index === self.findIndex((t) => (t.idCategoria === thing.idCategoria))
    })
    return this.mercadoCategoria;
  }

  filtrarSubcategoriasPorMercadoProduto(mercadoProduto: MercadoProduto[]): MercadoDetalheSubcategoria[] {
    this.mercadoSubCategoria = [];
    mercadoProduto.map((mercado: MercadoProduto) => {
      this.mercadoSubCategoria.push({
        idSubcategoria: mercado.idSubcategoria,
        nomeSubcategoria: mercado.nomeSubcategoria,
        idCategoria:mercado.idCategoria
      });
    })
    //filtra o array para que não haja categorias repetidas
    this.mercadoSubCategoria = this.mercadoSubCategoria.filter((thing, index, self) => {
      return index === self.findIndex((t) => (t.idSubcategoria === thing.idSubcategoria))
    })
    console.log(this.mercadoSubCategoria)
    return this.mercadoSubCategoria;
  }

  

}