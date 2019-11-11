import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { RouteReuseStrategy, RouterModule } from '@angular/router'

import { RouteReusableStrategy } from './route-reusable-strategy'
import { Vars } from './vars'

import { GraphQLModule } from './graphql.module'
import { MaterialModule } from '../shared/modules/material.module'

import { FlexLayoutModule } from '@angular/flex-layout'
import { throwIfAlreadyLoaded } from './module-import-guard'

import { AppLoaderComponent } from './components/app-loader/app-loader.component'
import { AppLoaderService } from './components/app-loader/app-loader.service'

import { ConfirmComponent } from './components/confirm/confirm.component'

import { BlankComponent } from './components/blank/blank.component'
import { FullLayoutComponent } from './components/full/full.component'
import { MenuLayoutComponent } from './components/menu/menu.component'

import { AuthStorageService } from './services/auth-storage.service'
import { LocalStorageService } from './services/local-storage.service'
import { AuthService } from './services/auth.service'
import { HomeService } from './services/home.service'
import { LoggingService } from './services/logging.service'
import { NotificationService } from './services/notification.service'
import { UtilityService } from './services/utility.service'

@NgModule({
  imports: [CommonModule, MaterialModule, HttpClientModule, RouterModule, GraphQLModule, FlexLayoutModule],
  declarations: [AppLoaderComponent, BlankComponent, FullLayoutComponent, MenuLayoutComponent, ConfirmComponent],
  exports: [AppLoaderComponent, BlankComponent, FullLayoutComponent, MenuLayoutComponent, ConfirmComponent],
  providers: [
    AppLoaderService,
    AuthStorageService,
    LocalStorageService,
    Vars,
    AuthService,
    HomeService,
    LoggingService,
    UtilityService,
    NotificationService,
    // AuthenticationGuard,
    // UtilService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  entryComponents: [AppLoaderComponent, ConfirmComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
