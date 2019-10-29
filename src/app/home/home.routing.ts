import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
import { ExchangeRatesComponent } from './exchange-rates/exchange-rates.component'
import { DebugComponent } from './debug/debug.component'

export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
        data: {
          title: 'Home',
        },
      },
      {
        path: 'exchange-rates',
        component: ExchangeRatesComponent,
        data: {
          title: 'Exchange Rates',
        },
      },
      {
        path: 'debug',
        component: DebugComponent,
        data: {
          title: 'Debug',
        },
      },
    ],
  },
]
