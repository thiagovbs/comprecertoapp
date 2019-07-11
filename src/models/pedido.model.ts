import { Usuario } from "./usuario";
import { MercadoLocalidade } from "./mercadoLocalidade.model";
import { PedidoProduto } from "./pedidoProduto.model";

export interface Pedido {

    idPedido: number;
    entrega?: string;
    status?: string;
    telefone?:string;
    pagamento?: string;
    valorFrete: number;
    troco: number;
    usuario: Usuario;
    celular: string;
    endereco: string;
    pedidoProdutos: PedidoProduto[];  
    mercadoLocalidade: MercadoLocalidade
    
}