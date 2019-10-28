import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { of } from 'rxjs/observable/of';
import { Globals } from '../shared/globals'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { LOGIN } from './auth.gql'
import { Login } from './login/login.interface'
import { User } from '../shared/models/user.model'
import { LoginResponse } from '../shared/models/loginResponse.interface'

import { StorageService } from '../shared/services/storage.service'

@Injectable()
export class AuthService {
  constructor(private apollo: Apollo, private globals: Globals, private storageService: StorageService) {
    this.loggedInSubject = new BehaviorSubject<Boolean>(this.storageService.getAuthorization() ? true : false)
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
          this.storageService.setAuthorization(response)
          this.loggedInSubject.next(true)
          return result
        }),
        catchError(this.handleError)
      )
  }

  /**
   *
   */
  logOut(): void {
    this.storageService.removeAuthorization()
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
