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

export const USER = gql`
  query User {
    User(input: { paging: { orderBy: ["username.asc"] }, args: { active: true } }) {
      pagingMeta {
        count
      }
      data {
        id
        username
        active
        Roles {
          data {
            name
          }
        }
        Tokens {
          data {
            tokenType
            expiresAt
          }
        }
      }
    }
  }
`
