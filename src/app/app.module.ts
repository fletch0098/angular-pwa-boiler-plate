import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { RouterModule, RouteReuseStrategy } from '@angular/router'
import { ServiceWorkerModule } from '@angular/service-worker'
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'

import { environment } from '../environments/environment'

import { AppRoutes } from './app.routing'

import { AppComponent } from './app.component'

import { SharedModule } from './shared/modules/shared.module'

import { LocalStorageService } from './local-storage.service'
import { RouteReusableStrategy } from './route-reusable-strategy'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [
    LocalStorageService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
