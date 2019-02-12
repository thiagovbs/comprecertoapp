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


/* export let CATEGORIA = [
    {
        id:1,
        nome: "Carnes e pescados",
        imagem: "assets/imgs/carnes e pescados.jpg",
    },
    {
        id:2,
        nome: "Hortfruti",
        imagem: "assets/imgs/hortfruti_Prancheta 1.jpg"
    },
    {
        id:3,
        nome: "Refrigerantes e Sucos",
        imagem: "assets/imgs/Bebidas_Prancheta 1.jpg"
    },
    {
        id:4,
        nome: "Higiene",
        imagem: "assets/imgs/Higiene_Prancheta 1.jpg"
    },
    {
        id:5,
        nome: "Limpeza",
        imagem: "assets/imgs/Limpeza_Prancheta 1.jpg"
    },
    {
        id:6,
        nome: "Padaria",
        imagem: "assets/imgs/Padaria_Prancheta 1.jpg"
    },
    {
        id:7,
        nome: "Geladeira",
        imagem: "assets/imgs/Geladeira_Prancheta 1.jpg"
    },
    {
        id:8,
        nome: "Freezer",
        imagem: "assets/imgs/Freezer_Prancheta 1.jpg"
    }
    ,
    {
        id:9,
        nome: "Dispensa",
        imagem: "assets/imgs/Despensa_Prancheta 1.jpg"
    }
] */