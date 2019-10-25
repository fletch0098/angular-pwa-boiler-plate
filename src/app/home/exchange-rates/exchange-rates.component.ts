import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
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

  private querySubscription: Subscription
  data: Observable<any>

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    let currency: string = 'USD'
    this.viewRates()
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

    return (
      this.apollo
        .watchQuery({
          query: RATES,
          variables: {
            currency,
          },
        })
        // .valueChanges.subscribe(result => {
        //   // console.log(result)

        //   if (result.data) {
        //     this.rates = result.data['rates'].map(x => new Rate().deserialize(x))
        //   }
        //   let CLP = this.rates.find(x => x.currency === 'CLP')
        //   let amountCLP = CLP.convert(100)
        //   console.log(`$100 USD is ${amountCLP} CLP`)

        //   this.loading = result.loading
        //   this.error = result.errors
        // })
        .valueChanges.pipe(
          tap(_ => console.log('Fetched Rates')),
          catchError(this.handleError),
          map(result => result.data['rates'].map(x => new Rate().deserialize(x)))
        )
    )
  }

  handleError(error) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    window.alert(errorMessage)
    return throwError(errorMessage)
  }

  viewRates() {
    this.getRates('USD').subscribe(
      result => {
        console.log(result)
      },
      err => {
        console.log(err)
      }
    )
  }

  ngOnDestroy() {
    // this.querySubscription.unsubscribe()
  }
}
