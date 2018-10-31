export interface Usuario{
    nome:string
    email:string,
    login: string,
    dtNascimento?: number,
    senha?:string,
    sexo?:string,
    permissoes?:string,
    usuarioMercadoPushs?:string;
}