import {
  HttpInterceptor, HttpRequest, HttpHandler,
  HttpEvent, HTTP_INTERCEPTORS,
  HttpUserEvent, HttpResponse,
  HttpProgressEvent, HttpHeaderResponse, HttpSentEvent, HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any> |
    HttpUserEvent<any> | HttpResponse<any> |
    HttpProgressEvent | HttpHeaderResponse | HttpSentEvent> {



    let token = localStorage.getItem('token');
    let N = API_CONFIG.baseUrl.length;
    let requestToAPI = request.url.substring(0, N) == API_CONFIG.baseUrl

    if (token && requestToAPI) {

      const authReq = request.clone({
        responseType: 'json',
        setHeaders: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })
      //if(token.accessToken.expired)

      return next.handle(authReq)
    }
    else {
      return next.handle(request)
        .catch((error: any) => {
          
          let erroObj = error;
          if (erroObj instanceof HttpErrorResponse) {
            
            switch (erroObj.status) {
              
              case 401:
                return this.getNewAccessToken(request, next);
              case 0:
                return this.getNewAccessToken(request, next);
            }
            return Observable.throw(erroObj);
          }
        }) as any
    }
  }
  getNewAccessToken(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.authService.getRefreshToken(localStorage.getItem('refresh_token')).switchMap(resp => {
      return next.handle(req.clone({
        setHeaders: {
          Authorization: 'Bearer' + localStorage.getItem('token')
        }
      }))
    })
  }
}


export const AuthInterceptorsProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}