export interface Produto{
    nome:string,
    marca:string,
    caracteristica:string
    imagem:string
}


export let PRODUTO = [
    {
        id:1,
        nome: "Picanha",
        marca:"friboi",
        caracteristica: "melhor marca de carne",
        imagem: "assets/imgs/items/rib_eye_2.jpg",
    },
    {
        id:2,
        nome: "Franco assado",
        marca:"Perdigão",
        caracteristica: "Frango já vem temperado",
        imagem: "assets/imgs/items/fried_calamari.jpg"
    },
    {
        id:3,
        nome: "Refrigerantes e Sucos",
        imagem: "assets/imgs/batata-palha.jpg"
    },
    {
        id:4,
        nome: "Cervejas",
        imagem: "assets/imgs/grao.jpg"
    }
]
