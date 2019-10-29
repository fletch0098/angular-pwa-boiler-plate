import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS, Apollo } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import apolloLogger from 'apollo-link-logger'
import { concat, ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { Globals } from './shared/globals'
import { AuthService } from './auth/auth.service'
import { StorageService } from './shared/services/storage.service'

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [AuthService, StorageService],
})
export class GraphQLModule {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private globals: Globals,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    const setAuthorization = async (_, { clientAwareness, headers }) => {
      // console.log('setAuthorization')

      // console.log(_.operationName)
      // console.log({ clientAwareness, headers })

      const credentials = storageService.getAuthorization()

      if (credentials && (_.operationName !== 'ExchangeRefreshToken' && _.operationName !== 'CheckToken')) {
        //  console.log({ credentials })

        if (credentials) {
          //  console.log('auth header')
          let jwtBearer = credentials.jwtBearer
          let isBearerValid = await this.authService.checkToken(jwtBearer).toPromise()

          if (!isBearerValid) {
            jwtBearer = await this.authService
              .exchangeRefreshToken(credentials.jwtRefresh)
              .toPromise()
              .then(res => res.jwtBearer)
          }

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
      uri: globals.testGraphQL,
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
