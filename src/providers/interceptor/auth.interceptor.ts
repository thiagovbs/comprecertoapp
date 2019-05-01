import {HttpInterceptor, HttpRequest, HttpHandler,
   HttpEvent, HTTP_INTERCEPTORS,
   HttpUserEvent, HttpResponse,
   HttpProgressEvent, HttpHeaderResponse, HttpSentEvent} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { API_CONFIG } from '../../config/api.config';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any> |
                                           HttpUserEvent<any> | HttpResponse<any> | 
                                           HttpProgressEvent |HttpHeaderResponse |HttpSentEvent> {
    
    

    let token = localStorage.getItem('token');
    let N  = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0,N) == API_CONFIG.baseUrl

    if(token && requestToAPI){   
         
        const authReq = request.clone({
          responseType:'json',
          setHeaders: {Authorization: 'Bearer ' + localStorage.getItem('token')}
        }) 
        //if(token.accessToken.expired)
        
        return next.handle(authReq)
    }
    else{  
      console.log("Usuário não logado")
        return next.handle(request)
    }   
  }
}
 
export const AuthInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}