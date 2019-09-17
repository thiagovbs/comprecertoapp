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

    findProdutosPorCategoria(categoriaId, idBairro, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}&idBairro=${idBairro}&page=${page}&count=${count}`);
    }

    findProdutosComDtValidade(categoriaId): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}`);
    }

    findProdutosPorCategoriaEMercado(categoriaId, mercadoId, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}&idMercado=${mercadoId}&page=${page}&count=${count}`);
    }

    
    findProdutosPorCategoriaEMercadoEBairro(bairroId,categoriaId, mercadoId, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idCategoria=${categoriaId}&idMercado=${mercadoId}&idBairro=${bairroId}&page=${page}&count=${count}`);
    }

    findProdutosPorMercadoEBairro(bairroId,mercadoId, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade/?idMercado=${mercadoId}&idBairro=${bairroId}&page=${page}&count=${count}`);
    }

    findProdutosComDtValidadeEbairro(idBairro, buscar: string, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade?idBairro=${idBairro}&page=${page}&count=${count}&busca=${buscar}`);
    }

    findProdutosComDtValidadeEmercado( idMercalocalidades, buscar: string, page: number = 0, count: number = 20): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/dto/com-validade?localidades=${idMercalocalidades}&page=${page}&count=${count}&busca=${buscar}`);
    }

    
    findCategoriasPorMercadoEBairro(bairroId,mercadoId): Observable<any> {
        return this.http.get<any>(`${API_CONFIG.baseUrl}/mercado-produtos/categorias/?idMercado=${mercadoId}&idBairro=${bairroId}`);
    }
}