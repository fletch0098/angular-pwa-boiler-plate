import gql from 'graphql-tag'

export const APP = gql`
  query app {
    app {
      appName
      appVersion
      currentTime
      graphQLPlayground
    }
  }
`

export const STATUS = gql`
  query status {
    status
  }
`

export const ERROR = gql`
  mutation Error($input: ErrorInput!) {
    Error(input: $input)
  }
`
