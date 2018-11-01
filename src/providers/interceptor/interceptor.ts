import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';




@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

      return next.handle(request)
      .catch((error, caught) =>{
        let erroObj = error;
        if(erroObj.error){
          erroObj = erroObj.error;
        }
        if(!erroObj.status){
          erroObj = JSON.parse(erroObj)
        }
        console.log("Erro Interceptado pelo Interceptor");
        return Observable.throw(erroObj);
      }) as any  
      
  }
}
 
export const ErrorInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}