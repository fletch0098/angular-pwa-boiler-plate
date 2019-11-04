import { Routes } from '@angular/router'

import { HomeComponent } from './home/home.component'

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
    ],
  },
]
