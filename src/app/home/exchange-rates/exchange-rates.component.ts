import { Component, OnInit, OnDestroy } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError } from 'rxjs'
import { RateService } from './rate.service'

@Component({
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss'],
})
export class ExchangeRatesComponent {
  // rates: Rate[]
  loading = true
  error: any

  private querySubscription: Subscription
  data: Observable<any>

  constructor(private rateService: RateService) {}

  ngOnInit() {
    let currency: string = 'USD'
    this.viewRates()
  }

  viewRates(): void {
    this.rateService.getRatesByCurrency('12').subscribe(
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
