import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccederComponent } from './componentes/acceder/acceder.component';
import { Error404Component } from './componentes/error404/error404.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './material/material.module';
import { AccederTokenInterceptor } from './utils/aceder-token.interceptor';
import { Error401Component } from './componentes/error401/error401.component';

import { MapsModule } from './maps/maps.module';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { ModalComponent } from './components/modal/modal.component';
import { WeatherComponent } from './components/weather/weather.component';
import { WeatherService } from './services/weather.service';
import { YoutubeService } from './services/youtube.service';
import { InstagramService } from './services/instagram.service'; // Nuevo servicio

import { NgxPayPalModule } from 'ngx-paypal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';
import { VideoListComponent } from './components/video-list/video-list.component';
import { VideoPlayerComponent } from './components/video-player/video-player.component';
import { InstagramFeedComponent } from './components/instagram-feed/instagram-feed.component';
import { WhatsappService } from './services/whatsapp.service';
import { MensajesComponent } from './pages/mensajes/mensajes.component';

@NgModule({
  declarations: [
    AppComponent,
    AccederComponent,
    Error404Component,
    Error401Component,
    HeaderComponent,
    FooterComponent,
    PrincipalComponent,
    ProductItemComponent,
    CartComponent,
    CartItemComponent,
    ModalComponent,
    WeatherComponent,
    InstagramFeedComponent,
    MensajesComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgxPayPalModule,
    NgbModule,
    NgxSpinnerModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    VideoListComponent,
    VideoPlayerComponent,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
   
    }), // ToastrModule added
    MapsModule
  ],
  providers: [
    /*provideClientHydration(),*/
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AccederTokenInterceptor, multi: true },
    WeatherService,
    YoutubeService,
    InstagramService,
    WhatsappService,
  {
    provide: 'YOUTUBE_API_KEY', 
    useValue: 'AIzaSyCmj0m-r6oAdIcq0d661DiGzHLt2qwUuT4' 
  }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
