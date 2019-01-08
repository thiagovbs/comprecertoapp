import { Injectable } from "@angular/core";
import { Categoria } from "../models/categoria.model";
import { HttpClient} from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class CategoriaService{
 
    categorias:Observable<Categoria[]>;

    constructor(public http:HttpClient){
        
        this.categorias = this.findAll()
    }

    private findAll():Observable<Categoria[]>{
        return this.http.get<Categoria[]>(`${API_CONFIG.baseUrl}/categorias`);
    }
}