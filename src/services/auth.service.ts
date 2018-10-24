import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UserLogin } from "../models/userLogin";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";


@Injectable()
export class AuthService{

    constructor(public http:HttpClient){
        
    }


    autenticar(userLogin:UserLogin){

         const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded',
              'Authorization': 'Basic " + (angular + ":" + @ngul@r0)',
            })
          };

          console.log(httpOptions) 

        //let data= "username"+userLogin.username+"&password="+userLogin.password+"&grant_type=password";
        
        return this.http.post(`${API_CONFIG.authUrl}`,userLogin,  {
            observe:'response',
            responseType:'text'
        });
    }
}