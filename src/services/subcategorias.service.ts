import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class SubCategoriaService{

    constructor(private http:HttpClient){}

    findSubCategorias():Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/subcategorias`)
    }


    findProdutosPorCategorias(categoriaId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/produtos/categoria/${categoriaId}`);
    }

    findProdutos(categoriaId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos?idCategoria=${categoriaId}`);
    }
}