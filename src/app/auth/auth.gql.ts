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

export const REGISTER = gql`
  mutation Register($input: UserCreate!) {
    Register(input: $input) {
      message
      debug
    }
  }
`

export const EXCHANGE_REFRESH_TOKEN = gql`
  mutation ExchangeRefreshToken($input: ExchangeRefreshTokenInput!) {
    ExchangeRefreshToken(input: $input) {
      jwtBearer
    }
  }
`

export const CHECK_TOKEN = gql`
  mutation CheckToken($input: CheckTokenInput!) {
    CheckToken(input: $input)
  }
`

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($input: VerifyEmailInput!) {
    VerifyEmail(input: $input) {
      message
      debug
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    ChangePassword(input: $input) {
      message
      debug
    }
  }
`

export const REQUEST_PASSWORD_CHANGE = gql`
  mutation RequestPasswordChange($input: RequestPasswordChangeInput!) {
    RequestPasswordChange(input: $input) {
      message
      debug
    }
  }
`

export const REQUEST_EMAIL_VERIFICATION = gql`
  mutation RequestEmailVerification($input: RequestEmailVerificationInput!) {
    RequestEmailVerification(input: $input) {
      message
      debug
    }
  }
`
