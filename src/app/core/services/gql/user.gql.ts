import gql from 'graphql-tag'

export const LOGGED_IN_USER = gql`
  query LoggedInUser {
    LoggedInUser {
      id
      username
      createdAt
      updatedAt
      Roles {
        pagingMeta {
          count
        }
        data {
          id
          name
        }
      }
      Tokens {
        pagingMeta {
          count
        }
        data {
          id
          tokenType
          expiresAt
        }
      }
    }
  }
`

export const USER = gql`
  query User {
    User {
      pagingMeta {
        count
      }
      data {
        id
        username
        createdAt
        updatedAt
        Roles {
          pagingMeta {
            count
          }
          data {
            id
            name
          }
        }
        Tokens {
          pagingMeta {
            count
          }
          data {
            id
            tokenType
            expiresAt
          }
        }
      }
    }
  }
`
