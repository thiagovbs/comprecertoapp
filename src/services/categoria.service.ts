import { Injectable } from "@angular/core";
import { CATEGORIA, Categoria } from "../models/categoria.model";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService{
 

    private categorias:any;

    constructor(public http:HttpClient){
        this.categorias = CATEGORIA;
    }

    findAll(): Observable< Categoria[]>{
        return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/categorias`)
    }

    getAll() {
        return this.categorias;
    }
    
}