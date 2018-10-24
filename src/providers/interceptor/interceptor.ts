import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {_throw} from 'rxjs/observable/throw';
import {catchError} from 'rxjs/operators';
import { AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
@Injectable()
export class InterceptorProvider implements HttpInterceptor{

  constructor(private storage: Storage, private alertCtrl:AlertController) {
  }

  intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    let promise = this.storage.get('my_token');

    return Observable.fromPromise(promise)
    .mergeMap(token =>{
      let clonedReq = this.addToken(request,token);
      return next.handle(clonedReq).pipe(
        //display error for the specific status
        catchError(error => {
          let msg = error.message;
          let alert =this.alertCtrl.create({
            title: error.name,
            message: msg,
            buttons:['OK']
          });
          alert.present();

          //pass the error to the caller of the function
          return _throw(error);
        })
      );
    })
  }

  private addToken(request:HttpRequest<any>, token:any){
    if(token){
      let clone:HttpRequest<any>;
      clone = request.clone({
        setHeaders:{
          Accept:'application/json',
          'Content-Type':'application/json',
          Authorization:`Bearer ${token}`

        }
      });
      return clone;
    }
    return request;
  }
}
