import gql from 'graphql-tag'

export const RATES = gql`
  query rates($currency: String!) {
    rates(currency: $currency) {
      currency
      rate
    }
  }
`
