import { Injectable } from "@angular/core";
import { CATEGORIA } from "../models/categoria.model";

@Injectable()
export class CategoriaService{
 

    private categorias:any;

    constructor(){
        this.categorias = CATEGORIA;
    }

    getAll() {
        return this.categorias;
    }
    
}