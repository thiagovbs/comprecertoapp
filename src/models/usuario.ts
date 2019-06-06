export interface Usuario{
    nome:string,
    email:string,
    login: string,
    senha?:string,
    dtNascimento?: number,
    sexo?:string 
    permissoes?:Array<Permissao>
}

export interface Permissao{
    idPermissao:number,
    descricao:string;
}