import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { UserLogin } from "../models/userLogin";

import { API_CONFIG } from "../config/api.config";
import { Usuario } from "../models/usuario";
import { UsuarioService } from "./usuario.service";




@Injectable()
export class AuthService{

    jwtPayload: any;

    constructor(public http:HttpClient, public usuarioService: UsuarioService){
        
    }
    userLogin: UserLogin;
    
    autenticar(userLogin:UserLogin){
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic aW9uaWM6MTBuMWMw'
          });
          const body = `username=${userLogin.username}&password=${userLogin.password}&grant_type=password`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})
          
    }

    successfullLogin(authorizationValue: string, userLogged:Usuario,refresh){
        console.log(userLogged)
        let token_user = authorizationValue.substring(7);
        let user:Usuario={
            token:token_user,
            refresh_token:refresh,
            nome: userLogged.nome,
            email: userLogged.email,
            login: userLogged.login
        };
        this.usuarioService.setLocalUser(user);
    }

    logout(){
        this.usuarioService.setLocalUser(null);
    }

    refreshToken(){
        const body = `refresh_token=${this.usuarioService.getLocalUser().refresh_token}&grant_type=refresh_token`;
        return  this.http.post(API_CONFIG.authUrl, body)     
    }

}