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

    findProdutos():Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto`);
    }

    findProdutosPorCategoria(categoriaId, idBairro):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/?idCategoria=${categoriaId}&idBairro=${idBairro}`);
    }

    findProdutosComDtValidade(categoriaId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}`);
    }

    findProdutosPorCategoriaEMercado(categoriaId, mercadoId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/?idCategoria=${categoriaId}&idMercado=${mercadoId}`);
    }

    findProdutosPorMercado(mercadoId):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/?idMercado=${mercadoId}`);
    }

    findProdutosComDtValidadeEbairro(idBairro):Observable<any>{
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade?idBairro=${idBairro}`);
    }

}