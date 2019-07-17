import { Usuario } from "./usuario";
import { MercadoLocalidade } from "./mercadoLocalidade.model";
import { PedidoProduto } from "./pedidoProduto.model";

export class Pedido {

    idPedido: number;
    entrega?: string;
    status?: string;
    pagamento?: string;
    valorFrete: number;
    troco: number;
    usuario: Usuario;
    celular: string;
    endereco: string;
    dataHoraRetirada: Date;
    pedidoProdutos: PedidoProduto[] =[];  
    mercadoLocalidade: MercadoLocalidade
    
}