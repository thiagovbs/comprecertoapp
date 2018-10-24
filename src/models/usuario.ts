export interface Usuario{
    nome:string
    email:string,
    login: string,
    dtNascimento?: Date,
    senha:string,
    sexo:string,
    permissoes?:string,
    usuarioMercadoPushs?:string;
}