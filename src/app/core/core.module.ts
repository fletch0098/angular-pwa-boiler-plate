import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule, Optional, SkipSelf } from '@angular/core'
import { RouteReuseStrategy, RouterModule } from '@angular/router'
// import {
//   AuthenticationGuard,
//   AuthenticationService
// } from '@app/core/authentication';
// import {
//   ApiPrefixInterceptor,
//   ErrorHandlerInterceptor,
//   HttpService
// } from '@app/core/http';
import { AuthStorageService } from './services/auth-storage.service'
import { LocalStorageService } from './services/local-storage.service'
import { AuthService } from './services/auth.service'
import { HomeService } from './services/home.service'
import { RouteReusableStrategy } from './route-reusable-strategy'
import { Vars } from './vars'
// import {
//   ErrorMessageService,
//   UserService,
//   UtilService
// } from '@app/core/service';

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
    // AuthenticationService,
    // AuthenticationGuard,
    // ApiPrefixInterceptor,
    // ErrorHandlerInterceptor,
    // UserService,
    // UtilService,
    // ErrorMessageService,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiPrefixInterceptor,
    //   multi: true
    // },
    // {
    //   provide: HttpClient,
    //   useClass: HttpService
    // },
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
