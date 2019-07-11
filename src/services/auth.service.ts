import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { UserLogin } from "../models/userLogin";

import { API_CONFIG } from "../config/api.config";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "./usuario.service";
import { AlcanceService } from "./alcance.service";
import { CarrinhoService } from "./carrinho.service";
import { STORAGE_KEYS } from "../config/storage_keys.config";




@Injectable()
export class AuthService{

    constructor(public http:HttpClient,
                public usuarioService: UsuarioService,
                public alcanceService:AlcanceService,
                public carrinhoService:CarrinhoService){
        
    }

    autenticar(userLogin:UserLogin){
        console.log(userLogin)
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
          const body = `username=${userLogin.username}&password=${encodeURIComponent(userLogin.password)}&grant_type=password`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})   
    }

    armazenarToken(token: string) {
        localStorage.setItem('token', token);
      }
    armazenarRefreshToken(token:string){
        localStorage.setItem('refresh_token', token);
    }

    successfullLogin(data){
        this.usuarioService.setLocalUser(null);
        
         let user:Usuario={
            nome: data.user.nome,
            email: data.user.email,
            login: data.user.login,
            sexo: data.user.sexo,
            idUsuario: data.user.idUsuario
        }; 
        this.usuarioService.setLocalUser(user);
    }

    logout(){
        //remove usuario loggado
        this.usuarioService.setLocalUser(null);
        //remove localização
        this.alcanceService.setLocalAlcance(null);
        //remove sacola
        this.carrinhoService.items = [];
        localStorage.removeItem(STORAGE_KEYS.localSacola)
        //remove token
        localStorage.removeItem('token');
    }

    getRefreshToken(refreshToken){
        
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
        const body = `grant_type=refresh_token&refresh_token=${refreshToken}`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})          
    }

}