import { Component, OnInit, OnDestroy } from '@angular/core'
import { DebugService } from './debug.service'

@Component({
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.scss'],
})
export class DebugComponent {
  loading = true
  error: any

  constructor(private debugService: DebugService) {}

  ngOnInit() {
    this.status()
    this.app()
    this.user()
  }

  status(): void {
    this.debugService.status().subscribe(
      result => {
        console.log(result)
      },
      err => {
        console.log(err)
      }
    )
  }

  app(): void {
    this.debugService.app().subscribe(
      result => {
        console.log(result)
      },
      err => {
        console.log(err)
      }
    )
  }

  user(): void {
    this.debugService.user().subscribe(
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
