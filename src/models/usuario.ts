export interface Usuario{
    token:string
    refresh_token?:string
    nome:string
    email:string,
    login: string,
    senha?:string,
    dtNascimento?: number,
    sexo?:string,
    
    
}