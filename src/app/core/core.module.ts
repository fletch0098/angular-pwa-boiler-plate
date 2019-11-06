import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { RouteReuseStrategy, RouterModule } from '@angular/router'
import { AuthStorageService } from './services/auth-storage.service'
import { LocalStorageService } from './services/local-storage.service'
import { AuthService } from './services/auth.service'
import { HomeService } from './services/home.service'
import { LoggingService } from './services/logging.service'
import { RouteReusableStrategy } from './route-reusable-strategy'
import { Vars } from './vars'

import { GraphQLModule } from './graphql.module'

import { FlexLayoutModule } from '@angular/flex-layout'
import { throwIfAlreadyLoaded } from './module-import-guard'

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, GraphQLModule, FlexLayoutModule],
  declarations: [],
  providers: [
    AuthStorageService,
    LocalStorageService,
    Vars,
    AuthService,
    HomeService,
    LoggingService,
    // AuthenticationGuard,
    // UtilService,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule')
  }
}
