import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'

/**
 * Global variables and constants
 */
@Injectable()
export class Globals {
  production: boolean = environment.production
  debug: boolean = false

  /**
   * URL for graphQL test api
   * @constant
   */
  testGraphQL: string = `http://localhost:1337/v1/graphql/`
}
