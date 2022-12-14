import { DadosService } from './services/dados.service';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { YoutubePipe } from './pipes/youtube.pipe';

registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, YoutubePipe],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DadosService, { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  exports:[YoutubePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
