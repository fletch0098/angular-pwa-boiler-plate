import { Routes } from '@angular/router'

import { ProfileComponent } from './profile/profile.component'

export const DashboardRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'profile',
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },
]
