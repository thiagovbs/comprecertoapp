import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../models/usuario";

import { API_CONFIG } from "../config/api.config";
import { STORAGE_KEYS } from "../config/storage_keys.config";

@Injectable()
export class UsuarioService{


    constructor(public http:HttpClient){
    }

    cadastrarUsuario(usuario:Usuario){  
        console.log(usuario)      
       return this.http.post(`${API_CONFIG.cadUrl}/usuarios`,usuario,{
           observe:'response',
           responseType:'text'
       });
    }

    //Pegar o usuário ativo no localstorage
    getLocalUser():Usuario{
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        if(user === null){
            return null
        }else{
            return JSON.parse(user);
        }
    }


    //Settar o usuário no localStorage
    setLocalUser(obj:Usuario){ 
        if(obj === null){
            localStorage.removeItem(STORAGE_KEYS.localUser)
        }else{
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
        }
    }
}