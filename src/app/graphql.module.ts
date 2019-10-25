import { NgModule } from '@angular/core'
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular'
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import apolloLogger from 'apollo-link-logger'
import { concat, ApolloLink } from 'apollo-link'
import { onError } from 'apollo-link-error'

const uri = 'https://o5x5jzoo7z.sse.codesandbox.io/graphql' //our test Graphql Server which returns rates

export function createApollo(httpLink: HttpLink) {
  const logger = ApolloLink.from([apolloLogger])

  const http = httpLink.create({
    uri: uri,
  })

  const link = onError(({ graphQLErrors, networkError }) => {
    console.log({ graphQLErrors, networkError })
  })

  return {
    link: concat(link, concat(logger, http)),
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
export class GraphQLModule {}
