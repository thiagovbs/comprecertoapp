import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule} from '@angular/common/http';



import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/categoria.service';

import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';
import {IonicStorageModule} from '@ionic/storage'
import {  ErrorInterceptorsProvider } from '../providers/interceptor/interceptor';

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

    UsuarioService,
    CategoriaService,
    ErrorInterceptorsProvider,
    AuthService
  ]
})
export class AppModule {}
