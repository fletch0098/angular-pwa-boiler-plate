import { Deserializable } from './deserializable.interface'

export class User implements Deserializable {
  public id: string
  public username: string

  deserialize(input: any): this {
    return Object.assign(this, input)
  }
}
