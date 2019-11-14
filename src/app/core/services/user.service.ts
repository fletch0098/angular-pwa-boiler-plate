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
    this.loggedInUserSubject = new BehaviorSubject<User>(null)
    this.loggedInUser = this.loggedInUserSubject.asObservable()
  }

  private loggedInUserSubject: BehaviorSubject<User>
  public loggedInUser: Observable<User>

  public get loggedInUserValue(): User {
    return this.loggedInUserSubject.value
  }

  getloggedInUser(): Observable<User> {
    return this.apollo
      .watchQuery({
        query: LOGGED_IN_USER,
      })
      .valueChanges.pipe(
        tap(_ => console.log('Fetched Logged in user')),
        map(result => {
          let user = new User().deserialize(result.data['LoggedInUser'])
          this.loggedInUserSubject.next(user)
          return user
        })
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
        map(data => data.data['User'].map(data => new User().deserialize(data)))

        // catchError(this.handleError)
      )
  }
}
