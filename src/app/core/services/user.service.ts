import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { of } from 'rxjs/observable/of';
import { Vars } from '../vars'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { USER, LOGGED_IN_USER } from './gql/user.gql'

import { User } from '../../shared/models/user.model'

// import * as jwt from 'jsonwebtoken'

@Injectable()
export class UserService {
  constructor(private apollo: Apollo, private vars: Vars) {
    // this.loggedInSubject = new BehaviorSubject<boolean>(this.authStorageService.getAuthorizationCredentials() ? true : false)
    // this.loggedIn = this.loggedInSubject.asObservable()
  }

  // private loggedInSubject: BehaviorSubject<boolean>
  // public loggedIn: Observable<boolean>

  // public get loggedInValue(): boolean {
  //   return this.loggedInSubject.value
  // }

  loggedInUser(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: LOGGED_IN_USER,
      })
      .valueChanges.pipe(
        tap(_ => console.log('Fetched Logged in user')),
        map(result => result.data && result.data['LoggedInUser'])
        // catchError(this.handleError)
      )
  }

  user(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: USER,
      })
      .valueChanges.pipe(
        tap(_ => console.log('Fetched Users')),
        map(result => result.data && result.data['User'])
        // catchError(this.handleError)
      )
  }
}
