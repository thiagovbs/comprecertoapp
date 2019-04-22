export interface Bairro {
 idBairro:number,
 nome:string,
 cidade:Cidade[]

}

export interface Cidade{
    idCidade:number,
    nome:string,
    Estados:Array<Estado>
}
export interface Estado{
    idEstado:number,
    nome:string,
    sigla:string
}