import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'

import { RouterModule } from '@angular/router'

import { environment } from '../environments/environment'

import { AppRoutes } from './app.routing'

import { AppComponent } from './app.component'

import { SharedModule } from './shared/modules/shared.module'
import { CommonModule } from '@angular/common'

import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(AppRoutes),
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
