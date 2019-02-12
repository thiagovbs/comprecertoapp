export interface Bairro {
 idBairro:number,
 nome:string,
 cidade:Cidade[]

}

export interface Cidade{
    idCidade:number,
    nomeCidade:string,
    Estados:Array<Estado>
}
export interface Estado{
    idEstado:number,
    nomeEstado:string,
    sigla:string
}