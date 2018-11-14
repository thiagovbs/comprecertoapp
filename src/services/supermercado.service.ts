import { Injectable } from "@angular/core";
import { SUPERMERCADOS } from "../models/supermercado.model";
import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class SupermercadoService{

    private supermercados:any =[]

    constructor(public http:HttpClient){
        this.supermercados = SUPERMERCADOS;
    }

    findAll(): Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados`)
    }

    getAll() {
        return this.supermercados;
      }

    

}