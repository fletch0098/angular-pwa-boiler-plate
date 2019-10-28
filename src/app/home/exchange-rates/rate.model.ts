import { Deserializable } from '../../shared/models/deserializable.interface'

export class Rate implements Deserializable {
  public currency: string
  public rate: number

  deserialize(input: any): this {
    return Object.assign(this, input)
  }

  convert(amount: number) {
    return this.rate * amount
  }
}
