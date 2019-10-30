import { Component, OnInit, OnDestroy } from '@angular/core'
import { HomeService } from '../home.service'

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  apiStatus: string = 'Not Connected'

  constructor(private homeService: HomeService) {}

  ngOnInit() {
    this.status()
  }

  status(): void {
    this.homeService.status().subscribe(
      result => {
        this.apiStatus = result
      },
      err => {
        console.error(err)
      }
    )
  }

  onStop(): void {
    console.log('onStop')
  }
}
