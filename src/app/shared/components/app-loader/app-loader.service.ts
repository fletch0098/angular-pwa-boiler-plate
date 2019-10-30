import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable()
export class AppLoaderService {
  //   isLoading = new Subject<boolean>()

  private isLoadingSource = new BehaviorSubject<boolean>(false)
  isLoading = this.isLoadingSource.asObservable()

  show() {
    this.isLoadingSource.next(true)
    // console.log(`isLoading: ${this.isLoading.}`)
  }

  hide() {
    this.isLoadingSource.next(false)
  }
}
