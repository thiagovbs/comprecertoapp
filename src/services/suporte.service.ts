import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";


@Injectable()
export class SuporteService {

    constructor(public http: HttpClient) {
    }

    enviarMensagemQualMercado(email:string,envioFormSuporte:any):Observable<any>{
        let tituloEmail = envioFormSuporte.titulo;
        
        let nomeMercado = envioFormSuporte.formSuporte.nomeMercado;
        nomeMercado = nomeMercado.trim();
        
        let estadoMercado = envioFormSuporte.formSuporte.estadoMercado;
        estadoMercado = estadoMercado.trim();
        
        let cidadeMercado = envioFormSuporte.formSuporte.cidadeMercado;
        cidadeMercado = cidadeMercado.trim();
        
        let bairroMercado = envioFormSuporte.formSuporte.bairroMercado;
        bairroMercado = bairroMercado.trim();

        let resposta = tituloEmail+"/" +nomeMercado+"/"+estadoMercado+"/"+cidadeMercado+"/"+bairroMercado +"/"+email
        console.log(resposta)
       return this.http
       .post(`${API_CONFIG.baseUrl}/suporte/1`,tituloEmail+"/" +nomeMercado+"/"+estadoMercado+"/"+cidadeMercado+"/"+bairroMercado +"/"+email,
        {
            observe:'response',
            responseType:'text'
        }) 
    }

    enviarMensagemIndiqueUmaCidade(email:string,envioFormSuporte:any){
        let tituloEmail = envioFormSuporte.titulo;
        
        let estadoMercado = envioFormSuporte.formSuporte.estadoMercado;
        estadoMercado = estadoMercado.trim();

        let cidadeMercado = envioFormSuporte.formSuporte.cidadeMercado;
        cidadeMercado = cidadeMercado.trim();

        return this.http
        .post(`${API_CONFIG.baseUrl}/suporte/2`,tituloEmail+"/"+estadoMercado+"/"+cidadeMercado+"/"+email,
         {
             observe:'response',
             responseType:'text'
         }) 
    }

    enviarMensagemProblemas(email:string,envioFormSuporte:any){
        let tituloEmail = envioFormSuporte.titulo; 
        let msg = envioFormSuporte.formSuporte.descProblema;
        
       
        return this.http
        .post(`${API_CONFIG.baseUrl}/suporte/3`,tituloEmail+"/"+msg+"/"+email,
         {
             observe:'response',
             responseType:'text'
         }) 
    }
}