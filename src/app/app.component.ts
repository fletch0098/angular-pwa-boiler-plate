import { Component } from '@angular/core'

import { Vars } from './core/vars'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private vars: Vars) {}
}
