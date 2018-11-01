import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { API_CONFIG } from '../../config/api.config';




@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    
    let localUser = this.usuarioService.getLocalUser();
    let N  = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0,N) == API_CONFIG.baseUrl
    console.log(localUser)
    if(localUser &&  requestToAPI){
        
        const authReq = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + localUser.token)})
        return next.handle(authReq)
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