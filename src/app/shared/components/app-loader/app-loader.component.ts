import { Component, OnInit } from '@angular/core'
import { Subject } from 'rxjs'

import { AppLoaderService } from './app-loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent implements OnInit {
  color = 'primary'
  mode = 'indeterminate'
  value = 50

  isLoading: boolean = false
  constructor(private appLoaderService: AppLoaderService) {}

  ngOnInit() {
    console.log('ngOnInit')
    this.appLoaderService.isLoading.subscribe(loading => {
      this.isLoading = loading
    })
  }
}
