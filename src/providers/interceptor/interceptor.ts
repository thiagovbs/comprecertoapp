import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AlertController } from 'ionic-angular';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(
    private alertCrtl: AlertController,
   private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .catch((error: any) => {
        let erroObj = error;
        if (erroObj instanceof HttpErrorResponse) {
          switch (erroObj.status) {
           /*  case 400:
              this.userFail();
              break; */
            case 403:
              this.handle403();
              break;
            //case 500:
              //this.handle500();
              //break
            case 404:
              this.handleDefaultError(erroObj)
              break
            case 401:
              return this.getNewAccessToken(request, next);
            case 0:
              return this.getNewAccessToken(request, next);
          }
          //this.handleDefaultError(erroObj)
        }
        return Observable.throw(erroObj);
      }) as any
  }

  getNewAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.getRefreshToken(localStorage.getItem('refresh_token')).switchMap((resp:any) => {
      localStorage.setItem('token',resp.access_token)
      console.log(resp)
      return next.handle(req.clone({
        setHeaders: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      }))
    })
  }

  //Erro ao Loggar
  userFail() {
    let alert = this.alertCrtl.create({
      title: 'Erro de Autenticação',
      message: 'Usuario e/ou senha inválidos',
      enableBackdropDismiss: false,
      cssClass: 'AlertCompraFacil',
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
      cssClass: 'AlertCompraFacil',
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
      cssClass: 'AlertCompraFacil',
      message: erro.message,
      enableBackdropDismiss: false,
      buttons: [
        { text: 'Ok' }
      ]
    })
    alert.present();
  }

  handle403() {
    console.log("requisição proibida")
    //this.usuarioService.setLocalUser(null);
  }
}


export const ErrorInterceptorsProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}