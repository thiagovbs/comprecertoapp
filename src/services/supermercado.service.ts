import { Injectable } from "@angular/core";

import { Observable } from "rxjs/Rx";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class SupermercadoService{

    constructor(public http:HttpClient){
    }

    findAll(): Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercados`)
    }


}