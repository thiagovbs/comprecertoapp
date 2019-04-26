import { Subcategoria } from "./subcategoria.model";

export interface Categoria{
    idCategoria:string,
    dtAlteracao?:number,
    fAtivo?:boolean,
    dtCriacao?:number,
    unidadesMedida?:string[],
    nome:string,  
    subcategorias?:Array<Subcategoria>, 
    imagemUrl?:string 
}