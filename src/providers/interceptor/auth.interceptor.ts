import {HttpInterceptor, HttpRequest, HttpHandler,
   HttpEvent, HTTP_INTERCEPTORS,
   HttpUserEvent, HttpResponse,
   HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpErrorResponse} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService, private authService:AuthService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any> |
                                           HttpUserEvent<any> | HttpResponse<any> | 
                                           HttpProgressEvent |HttpHeaderResponse |HttpSentEvent> {
    
    

    let token = this.usuarioService.getLocalUser();
    let N  = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0,N) == API_CONFIG.baseUrl

    if(token && requestToAPI){   
      console.log("Usuário logado")    
        const authReq = request.clone({
          responseType:'text',
          setHeaders: {Authorization: 'Bearer ' + token.accessToken}
        }) 
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