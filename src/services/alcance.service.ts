import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { Bairro, Estado, Cidade } from "../models/localidade";
import { STORAGE_KEYS } from "../config/storage_keys.config";


@Injectable()
export class AlcanceService {

    estados: Observable<Estado[]>

    constructor(public http: HttpClient) {
        this.estados = this.getEstados();
    }

    private getEstados(): Observable<Estado[]> {
        return this.http.get<Estado[]>((`${API_CONFIG.baseUrl}/estados`));
    }
    //buscar cidades por estados
    getCidades(estadoId): Observable<Cidade[]> {
        return this.http.get<Cidade[]>((`${API_CONFIG.baseUrl}/cidades/estado/${estadoId}`));
    }

    //buscar bairros por cidades
    getBairros(cidadeId): Observable<Bairro[]> {
        return this.http.get<Bairro[]>((`${API_CONFIG.baseUrl}/bairros/cidade/${cidadeId}`));
    }
    //buscar bairros por cidades
    getUnicoBairro(bairroId): Observable<Bairro[]> {
        return this.http.get<Bairro[]>((`${API_CONFIG.baseUrl}/bairros/${bairroId}`));
    }


    //Settar o usuário no localStorage
    setLocalAlcance(obj: any) {
        if (obj === null) {
            localStorage.removeItem(STORAGE_KEYS.localAlcance)
        } else {
            console.log(obj)
            localStorage.setItem(STORAGE_KEYS.localAlcance, JSON.stringify(obj))
        }
    }

    //Pegar o usuário ativo no localstorage
    getLocaAlcance() {
        
        let alcance = localStorage.getItem(STORAGE_KEYS.localAlcance);
        
        if (alcance === null) {
            return null
        } else {
            return JSON.parse(alcance);
        }
    }



}