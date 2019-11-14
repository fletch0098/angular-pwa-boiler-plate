import { Deserializable } from './deserializable.interface'

import { Role } from './role.model'
import { Token } from './token.model'

export class User implements Deserializable {
  public id: string
  public username: string
  public createdAt: Date
  public updatedAt: Date
  public active: boolean
  public roles: Role[]
  public tokens: Token[]

  deserialize(input: any): this {
    Object.assign(this, input)

    // Iterate over all cars for our user and map them to a proper `Car` model
    this.roles = input.Roles.data.map(role => new Role().deserialize(role))
    this.tokens = input.Tokens.data.map(token => new Token().deserialize(token))

    return this
  }
}
