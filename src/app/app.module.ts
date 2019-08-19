import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule} from '@angular/common/http';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePicker } from '@ionic-native/date-picker';
import { CallNumber } from '@ionic-native/call-number';
import { Keyboard } from '@ionic-native/keyboard';
//Login Rede social
import { Facebook} from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';

import {IonicStorageModule} from '@ionic/storage'
//componentes
import { AlcanceComponent } from '../components/alcance/alcance';
import { InfoSignPopoverComponent } from '../components/info-sign-popover/info-sign-popover';

//providers
import {ErrorInterceptorsProvider } from '../providers/interceptor/interceptor';
import { AuthInterceptorsProvider } from '../providers/interceptor/auth.interceptor';

//Serviços
import { CategoriaService } from '../services/categoria.service';
import { UsuarioService } from '../services/usuario.service';
import { SubCategoriaService } from '../services/subcategorias.service';
import { AuthService } from '../services/auth.service';
import { CarrinhoService } from '../services/carrinho.service';
import { SuporteService } from '../services/suporte.service';
import { SupermercadoService } from '../services/supermercado.service';
import { AlcanceService } from '../services/alcance.service';
import { PopoverInfoCompraFacilComponent } from '../components/popover-info-compra-facil/popover-info-compra-facil';
import { FormCompraFacilPopoverComponent } from '../components/steps-pedido/form-compra-facil-popover/form-compra-facil-popover';
import { CompraFacilService } from '../services/compra-facil.service';
import { PopoverWizardDataHoraComponent } from '../components/steps-pedido/popover-wizard-data-hora/popover-wizard-data-hora';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { FCM } from '@ionic-native/fcm';
import { Filtros } from '../util/filtros';
@NgModule({
  declarations: [
    MyApp,
    AlcanceComponent,
    InfoSignPopoverComponent,
    PopoverInfoCompraFacilComponent,
    FormCompraFacilPopoverComponent,
    PopoverWizardDataHoraComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { scrollAssist: false, autoFocusAssist: false }),
    IonicStorageModule.forRoot(),
    BrMaskerModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AlcanceComponent,
    InfoSignPopoverComponent,
    PopoverInfoCompraFacilComponent,
    FormCompraFacilPopoverComponent,
    PopoverWizardDataHoraComponent
  ],
  providers: [
    DatePicker,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    GooglePlus,
    AuthInterceptorsProvider,
    ErrorInterceptorsProvider,
    CarrinhoService,
    CategoriaService,
    AuthService,
    AlcanceService,
    UsuarioService,
    SupermercadoService,
    SubCategoriaService,
    SuporteService,
    CompraFacilService,
    Filtros,
    FCM,
    CallNumber,
    Keyboard
    
  ]
})
export class AppModule {}
