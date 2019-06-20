import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Bairro } from "../models/localidade";
import { MercadoDetalheProd, MercadoDetalheSubcategoria } from "../pages/supermercado-detalhe/supermercado-detalhe";
import { MercadoProduto } from "../models/mercado-produto.model";
import { PacoteTipoServico } from "../models/pacote-tipo-servico.model";
import { Mercado } from "../models/supermercado.model";

@Injectable()
export class SupermercadoService {

  mercadoCategoria: MercadoDetalheProd[] = [];
  mercadoSubCategoria: MercadoDetalheSubcategoria[] = []
  tipoServicoProduto: PacoteTipoServico[] = [];
  tipoServicoMercado: PacoteTipoServico[] = [];


  constructor(public http: HttpClient) {
  }

  findAll(): Observable<any> {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados`)
  }

  buscarMercadoprodutosPorBairro(lodalidadeMercado: Bairro) {
    return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados?idBairro=${lodalidadeMercado.idBairro}&fativo=${true}`)
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
        idCategoria: mercado.idCategoria
      });
    })
    //filtra o array para que não haja categorias repetidas
    this.mercadoSubCategoria = this.mercadoSubCategoria.filter((thing, index, self) => {
      return index === self.findIndex((t) => (t.idSubcategoria === thing.idSubcategoria))
    })

    return this.mercadoSubCategoria;
  }

  setServicosPorProduto(mercadoProdutoServico: MercadoProduto[]) {
    if (mercadoProdutoServico) {
      mercadoProdutoServico.map((mercadoServico: MercadoProduto) => {
        //console.log(mercadoServico)
        mercadoServico.mercadoServicos.map((resp: any) => {
          //8 é o Id que o pacote de posicionamento pertence na base
          if (resp.idMercadoServico === 8) {
            this.tipoServicoProduto = resp.pacoteServico;
            this.tipoServicoProduto;
          }
        })
      })
    } else {
      console.log("não entrei no servico")
      return this.tipoServicoProduto = [];
    }

  }
  getServicosPorProduto(): PacoteTipoServico[] {
    return this.tipoServicoProduto;
  }


  setServicosPorMercado(mercadoService: Mercado[]) {
    let mercadoLocalidade: any
    if (mercadoService) {
      mercadoService.map((mercado: Mercado) => {
        mercadoLocalidade = mercado.mercadoLocalidades[0];

        mercadoLocalidade.mercadoServicos.map((resp: any) => {
          //8 é o Id que o pacote de posicionamento pertence na base
          if (resp.pacoteServico.descricao === "x") {
            this.tipoServicoMercado.push(resp.pacoteServico);
          }
        })
      })
    } else {
      console.log("não entrei no servico")
      return this.tipoServicoMercado = [];
    }
  }

  getServicosPorMercado(): PacoteTipoServico[] {
    return this.tipoServicoMercado;
  }
}