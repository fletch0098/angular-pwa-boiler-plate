import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Vars } from '../vars'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { APP, STATUS, ERROR } from './gql/home.gql'

@Injectable()
export class HomeService {
  constructor(private apollo: Apollo, private vars: Vars) {}

  app(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: APP,
      })
      .valueChanges.pipe(
        tap(_ => console.log('Fetched App')),
        map(result => result.data && result.data['app']),
        catchError(this.handleError)
      )
  }

  status(): Observable<any> {
    return this.apollo
      .watchQuery({
        query: STATUS,
      })
      .valueChanges.pipe(
        tap(_ => console.log('Fetched Status')),
        map(result => result.data && result.data['status']),
        catchError(this.handleError)
      )
  }

  error(errorCode: number): Observable<any> {
    return this.apollo
      .mutate({
        mutation: ERROR,
        variables: {
          input: {
            errorCode: errorCode,
          },
        },
      })
      .pipe(
        tap(_ => console.log('Error Invoked'))
        // catchError(this.handleError)
      )
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
