export class Usuario{
    idUsuario?:number
    nome:string;
    sobrenome?: string;
    email:string;
    login: string;
    senha?:string;
    dtNascimento?: number;
    sexo?:string;
    cpf?:any
    permissoes?:Array<Permissao> = [];
}

export interface Permissao{
    idPermissao:number,
    descricao:string;
}