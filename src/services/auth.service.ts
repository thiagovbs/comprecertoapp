import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders} from "@angular/common/http";
import { UserLogin } from "../models/userLogin";

import { API_CONFIG } from "../config/api.config";
import { AlertController} from "ionic-angular";



@Injectable()
export class AuthService{

    jwtPayload: any;

    constructor(public http:HttpClient,
                private alertCtrl:AlertController,
                ){
        
    }
    userLogin: UserLogin;

    autenticar(userLogin:UserLogin){
        const hds = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic YW5ndWxhcjpAbmd1bEByMA=='
          });
          const body = `username=${userLogin.username}&password=${userLogin.password}&grant_type=password`;
        return  this.http.post(API_CONFIG.authUrl, body, {headers: hds, withCredentials:true})
          
    }

    public armazenarToken(token: string) {
        localStorage.setItem('token', token);
      }

      private getToken() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token');
      }

      logout() {
        this.limparAccessToken();
      }

      limparAccessToken() {
        localStorage.removeItem('token');
        this.jwtPayload = null;
      }
}