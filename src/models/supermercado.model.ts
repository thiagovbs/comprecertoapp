import { MercadoProduto } from "./mercado-produto.model";

export interface Mercado{
  idMercado:number,
  email:string,
  nomeFantasia:string,
  slogan?:string,
  fativo:boolean,
  fdestaque:boolean,
  fsuperDestaque:boolean,
  logo?:string,
  telefone:string,
  cnpj:number,
  title:string,
  bairro:any,
  mercadoProdutos:MercadoProduto,
}