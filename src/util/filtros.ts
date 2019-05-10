import { MercadoProduto } from "../models/mercado-produto.model";
import { PacoteTipoServico } from "../models/pacote-tipo-servico.model";

export class Filtros {

    sortByPreco(produtos: MercadoProduto[]) {
        produtos.sort((produtoA: MercadoProduto, produtoB: MercadoProduto) => {
            if (produtoA.precoMercadoProduto > produtoB.precoMercadoProduto) return 1;
            if (produtoA.precoMercadoProduto < produtoB.precoMercadoProduto) return -1;
            return 0;
        })
    }
    sortByFDestaque(produtos: MercadoProduto[]) {
        produtos.sort((produtoA: MercadoProduto, produtoB: MercadoProduto) => {
            if (produtoA.fDestaqueMercadoProduto) return 1;
            if (!produtoB.fDestaqueMercadoProduto) return -1;
            return 0;
        })
    }

    sortByServicoPosicionamentoMercado(tiposServico: PacoteTipoServico[]) {
        console.log(tiposServico)
        if (tiposServico.length > 0) {
            tiposServico.sort((servicoA: PacoteTipoServico, servicoB: PacoteTipoServico) => {
                if (servicoA.nome === "Pacote Super Destaque") return 1;
                if (servicoB.nome === "Pacote Destaque") return 0;
                return -1;
            })
        }
    }
}