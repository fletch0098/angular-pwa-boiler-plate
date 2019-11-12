import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'
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
        path: 'debug',
        component: DebugComponent,
        data: {
          title: 'Debug',
        },
      },
    ],
  },
]
