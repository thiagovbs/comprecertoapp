import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs/Rx';


import { AlertController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';




@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  constructor(private alertCtrl:AlertController, private injector:Injector) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {

  
      return next.handle(request).catch((error) =>{
        let errorObj = error;
        if(errorObj.error){
          errorObj = errorObj.error;
        }
        if(!errorObj.status){      
          errorObj = JSON.parse(errorObj);
        }
        let alert = this.alertCtrl.create({
          title: error.name,
          message: "Requisição foi falha",
          buttons: ['OK']
      });
      alert.present();
      
        return Observable.throw(error);
  
      }) as any
    }
  }
 
export const ErrorInterceptorsProvider ={
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true
}