import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
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
import { RouteReusableStrategy } from './route-reusable-strategy'
import { Vars } from './vars'
// import {
//   ErrorMessageService,
//   UserService,
//   UtilService
// } from '@app/core/service';

import { GraphQLModule } from './graphql.module'

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, GraphQLModule],
  declarations: [],
  providers: [
    AuthStorageService,
    LocalStorageService,
    Vars,
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
export class CoreModule {}
