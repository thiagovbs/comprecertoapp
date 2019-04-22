import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Bairro } from "../models/localidade";

@Injectable()
export class SupermercadoService{

    constructor(public http:HttpClient){
    }

    findAll(): Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados`)
    }

    buscarMercadoprodutosPorBairro(lodalidadeMercado:Bairro){
        console.log(lodalidadeMercado.idBairro);
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados?idBairro=${lodalidadeMercado.idBairro}`)
    }


}