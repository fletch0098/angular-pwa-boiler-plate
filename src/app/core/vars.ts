import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

/**
 * Global variables and constants
 */
@Injectable()
export class Vars {
  production: boolean = environment.production
  debug: boolean = environment.debug

  apiUrl: string = `${environment.apiUrl}${environment.apiVersion}/`
  graphQlUrl: string = `${this.apiUrl}graphql/`

  authStorageKey: `app_auth`
  appTitle: string = environment.appTitle

  requestTimeout: number = 30000
  requestTimeoutMessage: string = 'You request has timed out'

  dateFormat: string = 'MMMM Do YYYY, h:mm:ss a'
}
