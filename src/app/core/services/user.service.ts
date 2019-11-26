import { Injectable } from '@angular/core'
import { Vars } from '../vars'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { USER, LOGGED_IN_USER } from './gql/user.gql'

import { User } from '../../shared/models/user.model'
import { LoggingService } from './logging.service'


@Injectable()
export class UserService {
  constructor(private apollo: Apollo, private vars: Vars, private loggingservice: LoggingService) {
    this.loggedInUserSubject = new BehaviorSubject<User>(null)
    // this.loggedInUser = this.loggedInUserSubject.asObservable()
    this.loggedInUser = this.loggedInUserSubject.asObservable()
  }

  private name: string = 'UserService'
  private loggedInUserSubject: BehaviorSubject<User>
  public loggedInUser: Observable<User>

  // public get loggedInUserValue(): User {
  //   let operation: string = 'loggedInUserValue'
  //   this.loggingservice.debug('', this.name, operation, { value: this.loggedInUserSubject.value })

  //   if (!this.loggedInUserSubject.value) {
  //     this.getloggedInUser().subscribe(user => {
  //       return user
  //     })
  //   } else {
  //     return this.loggedInUserSubject.value
  //   }
  // }

  // myLoggedinUser(): Observable<User> {
  //   if(this.)
  // }

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

  checkRoles(roles: []) {
    let operation: string = 'checkRoles'
    return this.getloggedInUser().pipe(map(user => {
      let userRoleIds = user.roles.map(x => x.name)

          if (roles && roles.some(role => userRoleIds.includes(role))) {
            this.loggingservice.debug('Authorized', this.name, operation)
            // authorised so return true
            return true
          }
          this.loggingservice.debug('not authorised', this.name, operation)
          // role not authorised so redirect to home page
          // this.router.navigate(['/auth/login'])
         return false
    }))
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
