import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import apolloLogger from 'apollo-link-logger'
import { concat, ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'
import { setContext } from 'apollo-link-context'
import { Globals } from './shared/globals'
import { AuthService } from './auth/auth.service'
import { StorageService } from './shared/services/storage.service'

export function createApollo(httpLink: HttpLink, authService: AuthService, storageService: StorageService) {
  let globals = new Globals()
  const logger = ApolloLink.from([apolloLogger])

  const http = httpLink.create({
    uri: globals.testGraphQL,
  })

  const error = onError(({ graphQLErrors, networkError }) => {
    console.log({ graphQLErrors, networkError })
  })

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }))

  // Get the authentication token from local storage if it exists
  const credentials = storageService.getAuthorization()
  const auth = setContext((operation, context) => ({
    headers: {
      Authorization: `Bearer ${credentials.jwtBearer}`,
    },
  }))

  const link = ApolloLink.from([basic, auth, logger, error, http])

  return {
    link,
    cache: new InMemoryCache(),
  }
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {
  constructor(globals: Globals) {}
}
