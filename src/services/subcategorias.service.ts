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

    findProdutosPorCategoria(categoriaId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/?idCategoria=${categoriaId}`);
    }

    findProdutosComDtValidade(categoriaId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}`);
    }

    findProdutosPorCategoriaEMercado(categoriaId, mercadoId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/?idCategoria=${categoriaId}&idMercado=${mercadoId}`);
    }
}