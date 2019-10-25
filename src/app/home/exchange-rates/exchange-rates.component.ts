import { Component, OnInit } from '@angular/core'
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'

export interface Deserializable {
  deserialize(input: any): this
}

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

@Component({
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
})
export class ExchangeRatesComponent {
  rates: Rate[]
  loading = true
  error: any

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    let currency: string = 'USD'
    this.getRates(currency)
  }

  getRates(currency: String) {
    const RATES = gql`
      query rates($currency: String!) {
        rates(currency: $currency) {
          currency
          rate
        }
      }
    `

    this.apollo
      .watchQuery({
        query: RATES,
        variables: {
          currency,
        },
      })
      .valueChanges.subscribe(result => {
        // console.log(result)

        if (result.data) {
          this.rates = result.data['rates'].map(x => new Rate().deserialize(x))
        }
        let CLP = this.rates.find(x => x.currency === 'CLP')
        let amountCLP = CLP.convert(100)
        console.log(`$100 USD is ${amountCLP} CLP`)

        this.loading = result.loading
        this.error = result.errors
      })
  }
}
