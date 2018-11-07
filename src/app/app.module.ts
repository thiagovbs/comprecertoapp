import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule} from '@angular/common/http';



import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/categoria.service';
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import {IonicStorageModule} from '@ionic/storage'
import {  ErrorInterceptorsProvider } from '../providers/interceptor/interceptor';
import { AuthInterceptorsProvider } from '../providers/interceptor/auth.interceptor';
import { SupermercadoService } from '../services/supermercado.service';

//Components


@NgModule({
  declarations: [
    MyApp,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    AuthInterceptorsProvider,
    AuthService,
    ErrorInterceptorsProvider,
    UsuarioService,
    CategoriaService,
    SupermercadoService
    
  ]
})
export class AppModule {}
