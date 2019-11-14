import { Deserializable } from './deserializable.interface'

export class Token implements Deserializable {
  public id: string
  public tokenType: 'Refresh' | 'PasswordReset' | 'VerifyEmail' | 'Bearer'
  public jwt: string
  public expiresAt: Date
  public createdAt: Date
  public updatedAt: Date

  deserialize(input: any): this {
    return Object.assign(this, input)
  }
}
