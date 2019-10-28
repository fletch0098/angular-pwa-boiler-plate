import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { of } from 'rxjs/observable/of';
import { Globals } from '../../shared/globals'
import { Apollo } from 'apollo-angular'
import { Observable, Subscription, throwError } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { RATES } from './rate.gql'
import { Rate } from './rate.model'

@Injectable()
export class RateService {
  constructor(private apollo: Apollo, private globals: Globals) {}

  /**
   * Get rates by currency
   * @param currency The currency, USD etc
   */
  getRatesByCurrency(currency: String): Observable<Rate[]> {
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
          map(result => result.data && result.data['rates'] && result.data['rates'].map(x => new Rate().deserialize(x))),
          catchError(this.handleError)
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

  //   /**
  //    * Get all work orders filtered by state and page
  //    * @param woState - Work order state (i.e 'active, scheduled')
  //    * @param page - Page number
  //    */
  //   getWorkOrders(woState: string, page: number): Observable<PaginatedData> {
  //     this.log('*****', 'getWorkOrders')

  //     const url = `${this.baseUrl}/all-work-orders/${woState}/${page}`
  //     return this.http.get<PaginatedData>(url).pipe(
  //       tap(_ => this.log(`fetched ${woState} work orders`)),
  //       catchError(this.handleError<PaginatedData>('getWorkOrders', new PaginatedData()))
  //     )
  //   }

  // 	/**
  //    * Get a single work order
  //    * @param woId - Work order Id
  //    */
  // 	getWorkOrder (woId: number): Observable<WorkOrder> {
  // 		this.log('*****', 'getWorkOrder');

  // 		const url = `${this.baseUrl}/work-order/${woId}`;
  // 		return this.http.get<WorkOrder>(url)
  // 		  .pipe(
  // 				tap(_ => this.log(`fetched WO${woId}`, 'getWorkOrder')),
  // 				catchError(this.handleError<WorkOrder>('getWorkOrder'))
  // 		  );
  // 	}

  // 	/**
  //    * Handle Http operation that failed.
  //    * Let the app continue.
  //    * @param operation - name of the operation that failed
  //    * @param result - optional value to return as the observable result
  //    */
  //   private handleError<T> (operation = 'operation', result?: T) {
  //     return (error: any): Observable<T> => {

  //       this.log(`failed: ${error.message}`, operation);
  // 	  	console.error(error); // log to console instead

  //       // Let the app keep running by returning an empty result.
  //       return of(result as T);
  //     };
  //   }

  //   /**
  //    * Log using standard format
  //    * @param message - Message to log
  //    * @param operation - optional name of the operation that failed
  //    */
  //   private log(message: string, operation?: string): void {
  // 		const label = 'WorkOrdersApi';
  // 		console.log(`${label}-${operation? operation + '():' : '' }${message}`)
  // 	}
}
