import gql from 'graphql-tag'

export const LOGIN = gql`
  mutation login($input: Login!) {
    LogIn(input: $input) {
      username
      jwtBearer
      jwtRefresh
    }
  }
`
