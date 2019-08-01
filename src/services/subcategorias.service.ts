import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class SubCategoriaService {

    constructor(private http: HttpClient) { }

    findSubCategorias(): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/subcategorias`)
    }

    findProdutos(): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto`);
    }

    findProdutosPorCategoria(categoriaId, idBairro, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}&idBairro=${idBairro}&page=${page}&count=${count}`);
    }

    findProdutosComDtValidade(categoriaId): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}`);
    }

    findProdutosPorCategoriaEMercado(categoriaId, mercadoId, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}&idMercado=${mercadoId}&page${page}&count=${count}`);
    }

    findProdutosPorMercado(mercadoId, page:number = 0, count:number =10): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idMercado=${mercadoId}&page=${page}&count=${count}`);
    }

    findProdutosComDtValidadeEbairro(idBairro): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade?idBairro=${idBairro}`);
    }

}