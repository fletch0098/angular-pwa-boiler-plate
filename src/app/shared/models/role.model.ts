import { Deserializable } from './deserializable.interface'

export class Role implements Deserializable {
  public id: string
  public name: string
  public description: string
  public active: boolean
  public createdAt: Date
  public updatedAt: Date

  deserialize(input: any): this {
    return Object.assign(this, input)
  }
}
