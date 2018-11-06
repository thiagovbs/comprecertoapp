import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS} from '@angular/common/http';
import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from 'ionic-angular';

@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  constructor(private usuarioService:UsuarioService, private alertCrtl:AlertController) {
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
        
        switch(erroObj.status){
 /*          case 401:
          this.handle401();
          break; */
          case 403:
          this.handle403();
          break;

          default:
          this.handleDefaultError(erroObj);
        }
        
        return Observable.throw(erroObj);
      }) as any  
  }

  handle403(){
    this.usuarioService.setLocalUser(null);
  }

/*   handle401(){
    let alert = this.alertCrtl.create({
      title:'Erro de autenticação',
      message: 'Usuário e/ou senha incorretos',
      enableBackdropDismiss:false,
      buttons:[
        {text:'Ok'}
      ]
    })
    alert.present();
  } */

  handleDefaultError(erro){
  let alert = this.alertCrtl.create({
      title:'Erro'+ erro.status + ': ' + erro.erro,
      message: erro.message,
      enableBackdropDismiss:false,
      buttons:[
        {text:'Ok'}
      ]
    })
    alert.present();
  }
}
 
export const ErrorInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}