import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class UsuarioService{


    constructor(public http:HttpClient){
    }

    cadastrarUsuario(usuario:Usuario){
        
       return this.http.post(`${API_CONFIG.baseUrl}/usuarios`,usuario,{
           observe:'response',
           responseType:'text'
       });
    }
}