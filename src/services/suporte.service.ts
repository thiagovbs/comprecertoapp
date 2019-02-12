import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";

@Injectable()
export class SuporteService {

    constructor(public http: HttpClient) {
    }

    enviarMensagemQualMercado(envioFormSuporte:any):Observable<any>{
        let tituloEmail = envioFormSuporte.titulo;
        
        let nomeMercado = envioFormSuporte.formSuporte.nomeMercado;
        nomeMercado = nomeMercado.trim();
        
        let estadoMercado = envioFormSuporte.formSuporte.estadoMercado;
        estadoMercado = estadoMercado.trim();
        
        let cidadeMercado = envioFormSuporte.formSuporte.cidadeMercado;
        cidadeMercado = cidadeMercado.trim();
        
        let bairroMercado = envioFormSuporte.formSuporte.bairroMercado;
        bairroMercado = bairroMercado.trim();
       return this.http
       .post(`${API_CONFIG.baseUrl}/suporte/1`,tituloEmail+"/" +nomeMercado+"/"+estadoMercado+"/"+cidadeMercado+"/"+bairroMercado,
        {
            observe:'response',
            responseType:'text'
        }) 
    }

    enviarMensagemIndiqueUmaCidade(envioFormSuporte:any){
        let tituloEmail = envioFormSuporte.titulo;
        
        let estadoMercado = envioFormSuporte.formSuporte.estadoMercado;
        estadoMercado = estadoMercado.trim();

        let cidadeMercado = envioFormSuporte.formSuporte.cidadeMercado;
        cidadeMercado = cidadeMercado.trim();

        return this.http
        .post(`${API_CONFIG.baseUrl}/suporte/2`,tituloEmail+"/"+estadoMercado+"/"+cidadeMercado,
         {
             observe:'response',
             responseType:'text'
         }) 
    }

    enviarMensagemProblemas(envioFormSuporte:any){
        let tituloEmail = envioFormSuporte.titulo; 
        let msg = envioFormSuporte.formSuporte.descProblema;
        console.log(msg)
       
        return this.http
        .post(`${API_CONFIG.baseUrl}/suporte/3`,tituloEmail+"/"+msg,
         {
             observe:'response',
             responseType:'text'
         }) 
    }
}