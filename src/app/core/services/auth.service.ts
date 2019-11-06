import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { of } from 'rxjs/observable/of';
import { Vars } from '../vars'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { LOGIN, EXCHANGE_REFRESH_TOKEN, CHECK_TOKEN } from './gql/auth.gql'
import { Login } from '../../auth/login/login.interface'
import { User } from '../../shared/models/user.model'
import { LoginResponse } from '../../shared/models/loginResponse.interface'
import { ApiError } from '../../shared/models/api-error.interface'

import { AuthStorageService } from './auth-storage.service'

// import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo, private vars: Vars, private authStorageService: AuthStorageService) {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.authStorageService.getAuthorizationCredentials() ? true : false)
    this.loggedIn = this.loggedInSubject.asObservable()
  }

  private loggedInSubject: BehaviorSubject<boolean>
  public loggedIn: Observable<boolean>

  public get loggedInValue(): boolean {
    return this.loggedInSubject.value
  }

  /**
   * Get rates by currency
   * @param currency The currency, USD etc
   */
  login(login: Login): Observable<any> {
    return this.apollo
      .mutate({
        mutation: LOGIN,
        variables: {
          input: {
            username: login.username,
            password: login.password,
          },
        },
      })
      .pipe(
        tap(_ => console.log('Logged in user')),
        map(result => {
          let response: LoginResponse = result.data['LogIn']
          this.authStorageService.setAuthorizationCredentials(response)
          this.loggedInSubject.next(true)

          // let decoded = jwt.decode(response.jwtBearer)
          // console.log(decoded)

          return result
        })
        // catchError(this.handleError)
      )
  }

  /**
   *
   */
  checkToken(jwtBearer: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CHECK_TOKEN,
        variables: {
          input: {
            jwtBearer,
          },
        },
      })
      .pipe(
        tap(_ => console.log('checked token')),
        map(result => {
          let response: boolean = result.data['CheckToken']
          return response
        }),
        catchError(this.handleError)
      )
  }

  /**
   *
   */
  exchangeRefreshToken(jwtRefresh: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: EXCHANGE_REFRESH_TOKEN,
        variables: {
          input: {
            jwtRefresh,
          },
        },
      })
      .pipe(
        tap(_ => console.log('exchanged token')),
        map(result => {
          let response = result.data['ExchangeRefreshToken']
          let x = this.authStorageService.getAuthorizationCredentials()
          x.jwtBearer = response.jwtBearer
          this.authStorageService.setAuthorizationCredentials(x)
          return response
        }),
        catchError(this.handleError)
      )
  }

  /**
   *
   */
  logOut(): void {
    this.authStorageService.clearAuthorizationCredentials()
    this.loggedInSubject.next(false)
  }

  handleError(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      console.log('client side error', error)
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server-side error
      console.log('server side error', error)
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(error)
    //window.alert(errorMessage)
    // return error
  }
}
