import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import apolloLogger from 'apollo-link-logger'
import { concat, ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { Vars } from './vars'
import { AuthService } from './services/auth.service'
import { LoggingService } from './services/logging.service'
import { NotificationService } from './services/notification.service'
import { AuthStorageService } from './services/auth-storage.service'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError, switchMap, filter, take } from 'rxjs/operators'

import { ApiError } from '../shared/models/api-error.interface'

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [],
})
export class GraphQLModule {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  name: string = 'GraphQLModule'

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private vars: Vars,
    private authService: AuthService,
    private authStorageService: AuthStorageService,
    private loggingSerivce: LoggingService,
    private notificationService: NotificationService
  ) {
    const setAuthorization = async (_, { clientAwareness, headers }) => {
      let operation: string = 'constructor.setAuthorization'
      // this.loggingSerivce.trace(this.name, operation)

      const credentials = this.authStorageService.getAuthorizationCredentials()

      if (credentials && _.operationName !== 'ExchangeRefreshToken' && _.operationName !== 'CheckToken') {
        if (credentials) {
          let jwtBearer: any = credentials.jwtBearer
          let isBearerValid = await this.authService.checkToken(jwtBearer).toPromise()

          if (!isBearerValid) {
            if (!this.isRefreshing) {
              this.isRefreshing = true
              this.refreshTokenSubject.next(null)

              await this.authService
                .exchangeRefreshToken(credentials.jwtRefresh)
                .pipe(
                  switchMap((token: any) => {
                    this.isRefreshing = false
                    this.refreshTokenSubject.next(token.jwtBearer)
                    return token.jwtBearer
                  })
                )
                .toPromise()
            } else {
              jwtBearer = await this.refreshTokenSubject
                .pipe(
                  filter(token => token != null),
                  take(1),
                  switchMap(jwt => {
                    return jwt
                  })
                )
                .toPromise()
            }
            return {
              headers: {
                ...headers,
                Authorization: `Bearer ${this.refreshTokenSubject.value}`,
              },
            }
          }

          return {
            headers: {
              ...headers,
              Authorization: `Bearer ${jwtBearer}`,
            },
          }
        }
      } else {
        return {
          headers,
        }
      }
    }

    const errorHandler = (args): void => {
      let operationName: string = 'errorHandler'
      // this.loggingSerivce.trace(this.name, operationName)

      // this.loggingSerivce.debug('errorHandler args', this.name, operationName, args)

      let graphQLErrors: ApiError[] = args.graphQLErrors
      let networkError: Error = args.networkError

      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          this.loggingSerivce.error(`${err.internalCode}: ${err.message}`, this.name, operationName, err)
          let errorMessage: string = ''

          errorMessage = errorMessage + '\n' + err.details.join('\n')

          this.notificationService.error(errorMessage)

          switch (err.internalCode) {
            case 4000:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            case 4001:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            case 4003:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            case 4004:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            case 5000:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            case 5001:
              // this.loggingSerivce.info(err.internalCode.toString(), this.name, operationName)
              break
            default:
              this.loggingSerivce.warn('Unknown error code', this.name, operationName)
              break
          }
        }
      }
      if (networkError) {
        this.loggingSerivce.error('networkError', this.name, operationName, networkError)
        this.notificationService.error(networkError.message)
      }
    }

    // Apollo link logger
    const logger = ApolloLink.from([apolloLogger])

    // Apollo http
    const http = httpLink.create({
      uri: vars.graphQlUrl,
    })

    // Error handler
    const error = onError(errorHandler)

    // Basic headers
    const basic = setContext((operation, context) => ({
      headers: {
        Accept: 'charset=utf-8',
        'Content-Type': 'application/json',
        'App-Version': '1.0.0',
      },
    }))

    // set auth headers
    const auth = setContext(setAuthorization)

    // Create link
    const link = ApolloLink.from([basic, auth, logger, error, http])

    // Cache
    const cache = new InMemoryCache()

    apollo.create({
      link,
      cache,
    })
  }
}
