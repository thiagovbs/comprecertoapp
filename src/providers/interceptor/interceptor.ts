import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { UsuarioService } from '../../services/usuario.service';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(
    private alertCrtl: AlertController,
    private authService: AuthService,
    private usuarioService: UsuarioService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log("Interceptor");
    return next.handle(request)
      .catch((error:any) => {

        let erroObj = error;

        console.log("Erro Interceptado pelo Interceptor");

        if (erroObj instanceof HttpErrorResponse) {

          switch (erroObj.status) {
            case 401:
              return this.getNewAccessToken(request,next);
            //break; 
            case 400:
              this.userFail();
              break;
            case 403:
              this.handle403();
              break;
            case 500:
              this.handle500();

          }
        }
        return Observable.throw(erroObj);
      }) as any
  }

  getNewAccessToken(req:HttpRequest<any>,next:HttpHandler):Observable<any> {
     return this.authService.getRefreshToken().switchMap(resp=>{
        this.authService.armazenarToken(resp['access_token']);
        return next.handle(req.clone({
          setHeaders:{
            Authorization:'Bearer' + localStorage.getItem('token')
          }
        }))
      })
   
  }

  //refresh token pelo access token
/*   getNewAccessToken(){
    console.log('Navegação com access token inválido. Obtendo novo token...');
    return this.authService.getRefreshToken().subscribe((response) => {
      this.authService.armazenarToken(response['access_token']);
      console.log('Novo access token criado!');
    })
    
  } */


  //Erro ao Loggar
  userFail() {
    let alert = this.alertCrtl.create({
      title: 'Erro de Autenticação',
      message: 'Usuario e/ou senha inválidos',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present();
  }

  handle500() {
    let alert = this.alertCrtl.create({
      title: 'Erro de comunicação com o servidor',
      message: 'Algo aconteceu de errado =/. Tente mais tarde',
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present();
  }

  //Erro Default
  handleDefaultError(erro) {
    let alert = this.alertCrtl.create({
      title: 'Erro ' + erro.status,
      message: erro.message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present();
  }



  handle403() {
    this.usuarioService.setLocalUser(null);
  }
}


export const ErrorInterceptorsProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}