import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService, private authService:AuthService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    
    

    let token = this.usuarioService.getLocalUser();
    let N  = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0,N) == API_CONFIG.baseUrl

    
    if(token &&  requestToAPI){   
        const authReq = request.clone(
          {
            headers: request.headers.set('Authorization', 'Bearer ' + token.accessToken)
          });
        return next.handle(authReq)
                    .catch(error =>{
                        if( error instanceof HttpErrorResponse){
                          switch ((<HttpErrorResponse>error).status){
                            case 401:
                            return this.getAccessToken(request, next);
                          }
                        }
                    });
 
    }
    else{  
        return next.handle(request);
    }   
  }
  
 getAccessToken(req:HttpRequest<any>, next:HttpHandler):Observable<any>{
    return this.authService.getAccessToken(this.usuarioService.getLocalUser().refreshToken).switchMap(
      resp =>{
        //this.usuarioService.getLocalUser().accessToken = resp.access_token;
        console.log(resp);
        return next.handle(req);
        /* return next.handle(req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + token)
        })) */
      }
    );
  } 

}
 
export const AuthInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}