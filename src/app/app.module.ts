import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { ServiceWorkerModule } from '@angular/service-worker'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'

import { environment } from '../environments/environment'

import { CoreModule } from './core/core.module'

import { AppRoutes } from './app.routing'
import { AppComponent } from './app.component'
import { NotFoundComponent } from './404/not-found.component'

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    RouterModule.forRoot(AppRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
