import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { Observable } from "rxjs";
import { Bairro, Estado, Cidade } from "../models/localidade";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { EnderecoLocalStorage } from "../models/endereco-localstorage";


@Injectable()
export class AlcanceService {

    constructor(public http: HttpClient) {

    }

    getEstados(): Observable<Estado[]> {
        return this.http.get<Estado[]>((`${API_CONFIG.baseUrl}/estados/?fativo=${true}`));
    }
    //buscar cidades por estados
    getCidades(estadoId): Observable<Cidade[]> {
        return this.http.get<Cidade[]>((`${API_CONFIG.baseUrl}/cidades/estado/${estadoId}&${true}`));
    }

    //buscar bairros por cidades
    getBairros(cidadeId): Observable<Bairro[]> {
        return this.http.get<Bairro[]>((`${API_CONFIG.baseUrl}/bairros/cidade/${cidadeId}&${true}`));
    }
    //buscar bairros por cidades
    getUnicoBairro(bairroId): Observable<Bairro[]> {
        return this.http.get<Bairro[]>((`${API_CONFIG.baseUrl}/bairros/${bairroId}&${true}`));
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

    //Settar o Endereco no localStorage
    setLocalEndereco(obj: EnderecoLocalStorage) {
        if (obj === null) {
            localStorage.removeItem(STORAGE_KEYS.localEndereco)
        } else {
            localStorage.setItem(STORAGE_KEYS.localEndereco, JSON.stringify(obj))
        }
    }

    //Pegar o Endereco ativo no localstorage
    getLocalEndereco() {
        let endereco = localStorage.getItem(STORAGE_KEYS.localEndereco);
        if (endereco === null) {
            return null
        } else {
            return JSON.parse(endereco);
        }
    }
}