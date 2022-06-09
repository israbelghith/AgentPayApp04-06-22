
//import  * as CordovaSQLiteDriver  from 'localforage-cordovasqlitedriver';

//import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage';
import { JwtIntercepterService } from './services/jwt-intercepter.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [HttpClientModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, IonicStorageModule.forRoot({
    name: 'myDatabase',
    driverOrder: [CordovaSQLiteDriver.driver, Drivers.IndexedDB]
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy,  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtIntercepterService,
      multi: true
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
