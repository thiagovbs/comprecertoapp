import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpHeaders} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService, authService:AuthService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    


    let localUser = this.usuarioService.getLocalUser();
    let N  = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0,N) == API_CONFIG.baseUrl
    
    
    if(localUser &&  requestToAPI){
      
      const hds = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic aW9uaWM6MTBuMWMw'
      });
        console.log("usuario loggado");
        const authReq = request.clone({headers: hds});
        console.log(authReq);
        return next.handle(authReq);   
    }
    else{
        return next.handle(request);
    }   
  }
}
 
export const AuthInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}