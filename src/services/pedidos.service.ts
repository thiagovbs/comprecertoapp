import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UsuarioService } from "./usuario.service";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class PedidosService {
    

    constructor(private http: HttpClient, private usuarioService: UsuarioService) { }

    
    getPedidos() {
        let idUsuario = this.usuarioService.getLocalUser().idUsuario;
        return this.http.get<any>(`${API_CONFIG.baseUrl}/pedido/usuario/${idUsuario}`)
    }
}