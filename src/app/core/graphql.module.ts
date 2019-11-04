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
import { AuthStorageService } from './services/auth-storage.service'
import { Observable, Subscription, throwError, BehaviorSubject } from 'rxjs'
import { map, tap, catchError, switchMap, filter, take } from 'rxjs/operators'

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [AuthService, AuthStorageService],
})
export class GraphQLModule {
  private isRefreshing = false
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private vars: Vars,
    private authService: AuthService,
    private authStorageService: AuthStorageService
  ) {
    const setAuthorization = async (_, { clientAwareness, headers }) => {
      // console.log('setAuthorization')

      // console.log(_.operationName)
      // console.log({ clientAwareness, headers })

      const credentials = authStorageService.getAuthorizationCredentials()

      if (credentials && (_.operationName !== 'ExchangeRefreshToken' && _.operationName !== 'CheckToken')) {
        //  console.log({ credentials })

        if (credentials) {
          //  console.log('auth header')
          let jwtBearer: any = credentials.jwtBearer
          let isBearerValid = await this.authService.checkToken(jwtBearer).toPromise()

          if (!isBearerValid) {
            if (!this.isRefreshing) {
              console.log('not refreshing')
              this.isRefreshing = true
              this.refreshTokenSubject.next(null)

              await this.authService
                .exchangeRefreshToken(credentials.jwtRefresh)
                .pipe(
                  switchMap((token: any) => {
                    console.log({ token })
                    this.isRefreshing = false
                    this.refreshTokenSubject.next(token.jwtBearer)
                    return token.jwtBearer
                  })
                )
                .toPromise()
              // .then(res => res['jwtBearer'])
            } else {
              console.log('refreshing')
              jwtBearer = await this.refreshTokenSubject
                .pipe(
                  filter(token => token != null),
                  take(1),
                  switchMap(jwt => {
                    console.log({ jwt })
                    return jwt
                  })
                )
                .toPromise()
              // .then(res => res['jwtBearer'])
            }

            // jwtBearer = await this.authService
            //   .exchangeRefreshToken(credentials.jwtRefresh)
            //   .toPromise()
            //   .then(res => res.jwtBearer)
            return {
              headers: {
                ...headers,
                Authorization: `Bearer ${this.refreshTokenSubject.value}`,
              },
            }
          }

          // console.log({ jwtBearer, subjet: this.refreshTokenSubject.value })
          return {
            headers: {
              ...headers,
              Authorization: `Bearer ${jwtBearer}`,
            },
          }
        }
      } else {
        //  console.log('header')
        return {
          headers,
        }
      }
    }

    // Apollo link logger
    const logger = ApolloLink.from([apolloLogger])

    // Apollo http
    const http = httpLink.create({
      uri: vars.graphQlUrl,
    })

    // Error handler
    const error = onError(this.errorHandler)

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

    console.log('Apollo Created')
  }

  errorHandler({ graphQLErrors, networkError, operation, forward }): void {
    console.log('errorHandler')
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        console.log(err)
        switch (err['internalCode']) {
          case 4001:
            console.log('4001')
            break
          default:
            console.log('unknown')
            break
        }
      }
    }
    if (networkError) {
      console.log({ networkError })
    }
  }
}
