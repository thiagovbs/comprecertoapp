import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse} from '@angular/common/http';
import { Injectable, Injector} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  constructor(
              private alertCrtl:AlertController,
              private injector: Injector,
              private usuarioService: UsuarioService) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

      return next.handle(request)
      .catch((error) =>{ 

        let erroObj = error;        
        /*          
        if(!erroObj.status){
          erroObj = JSON.parse(erroObj)
        } */
        console.log("Erro Interceptado pelo Interceptor");
        
        if(erroObj instanceof HttpErrorResponse){
          
          switch(erroObj.status){
            case 401:
            this.accessToken(request,next);  
            break;      
            case 400:
            this.userFail();
            break;
            case 403:
            this.handle403();
            break;
            
            default:
            this.handleDefaultError(erroObj);
          }
        }
        return Observable.throw(erroObj);
      }) as any  
  }

  accessToken(req: HttpRequest<any>,next:HttpHandler){
    
    
    const authService = this.injector.get(AuthService);
    const refresh_token =this.usuarioService.getLocalUser().refreshToken;
    
  authService.getAccessToken(refresh_token).subscribe(respo =>{
      console.log(respo);
    },erro=>{
      
    })
  }

  //Erro ao Loggar
  userFail(){
    let alert = this.alertCrtl.create({
      title:'Erro de Autenticação',
      message: 'Usuario e/ou senha inválidos',
      enableBackdropDismiss:false,
      buttons:[
        {text:'Ok'}
      ]
    })
    alert.present();
  }

//Erro Default
  handleDefaultError(erro){
  let alert = this.alertCrtl.create({
      title:'Erro '+ erro.status,
      message: erro.message,
      enableBackdropDismiss:false,
      buttons:[
        {text:'Ok'}
      ]
    })
    alert.present();
  }
  handle403(){
    this.usuarioService.setLocalUser(null);
  }
}


export const ErrorInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}