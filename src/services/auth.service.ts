import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { UserLogin } from "../models/userLogin";

import { API_CONFIG } from "../config/api.config";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "./usuario.service";
import { AlcanceService } from "./alcance.service";




@Injectable()
export class AuthService{

    constructor(public http:HttpClient,
                public usuarioService: UsuarioService,
                public alcanceService:AlcanceService){
        
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
    

    successfullLogin(data){
        this.usuarioService.setLocalUser(null);
        
         let user:Usuario={
            nome: data.user.nome,
            email: data.user.email,
            login: data.user.login,
            sexo: data.user.sexo
        }; 
        this.usuarioService.setLocalUser(user);
    }

    logout(){
        this.usuarioService.setLocalUser(null);
        this.alcanceService.setLocalAlcance(null);
        localStorage.removeItem('token');
    }

    getRefreshToken( ){
        
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
        const body = `grant_type=refresh_token`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})          
    }

}