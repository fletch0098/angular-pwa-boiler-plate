import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { of } from 'rxjs/observable/of';
import { Globals } from '../shared/globals'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { LOGIN, EXCHANGE_REFRESH_TOKEN, CHECK_TOKEN } from './auth.gql'
import { Login } from './login/login.interface'
import { User } from '../shared/models/user.model'
import { LoginResponse } from '../shared/models/loginResponse.interface'

import { AuthStorageService } from '../shared/services/auth-storage.service'

// import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo, private globals: Globals, private authStorageService: AuthStorageService) {
    this.loggedInSubject = new BehaviorSubject<Boolean>(this.authStorageService.getAuthorizationCredentials() ? true : false)
    this.loggedIn = this.loggedInSubject.asObservable()
  }

  private loggedInSubject: BehaviorSubject<Boolean>
  public loggedIn: Observable<Boolean>

  public get loggedInValue(): Boolean {
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
        }),
        catchError(this.handleError)
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
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    window.alert(errorMessage)
    return throwError(errorMessage)
  }
}
