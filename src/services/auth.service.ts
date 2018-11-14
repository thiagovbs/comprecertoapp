import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { UserLogin } from "../models/userLogin";

import { API_CONFIG } from "../config/api.config";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "./usuario.service";
import { Observable } from "rxjs";




@Injectable()
export class AuthService{

    constructor(public http:HttpClient, public usuarioService: UsuarioService){
        
    }

    
    autenticar(userLogin:UserLogin){
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
          const body = `username=${userLogin.username}&password=${encodeURIComponent(userLogin.password)}&grant_type=password`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})   
    }

    successfullLogin(data){
        this.usuarioService.setLocalUser(null);
        
         let user:Usuario={
            refreshToken:data.refresh_token, 
            accessToken:data.access_token,
            nome: data.user.nome,
            email: data.user.email,
            login: data.user.login
        }; 
        this.usuarioService.setLocalUser(user);
    }

    logout(){
        this.usuarioService.setLocalUser(null);
    }

    getAccessToken(refreshToken){
        
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
        const body = `refresh_token=${refreshToken}&grant_type=refresh_token`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})          
    }

}