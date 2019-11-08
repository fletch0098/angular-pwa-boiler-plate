import { Component, OnInit, Input } from '@angular/core'

import { AppLoaderService } from './app-loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './app-loader.component.html',
  styleUrls: ['./app-loader.component.scss'],
})
export class AppLoaderComponent implements OnInit {
  @Input() message = ''

  color = 'primary'
  // mode = 'indeterminate'
  // value = 50

  isLoading: boolean = false
  constructor(private appLoaderService: AppLoaderService) {}

  ngOnInit() {
    this.appLoaderService.isLoading.subscribe(loading => {
      this.isLoading = loading
    })
  }
}
