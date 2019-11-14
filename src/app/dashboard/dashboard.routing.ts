import { Routes } from '@angular/router'

import { ProfileComponent } from './profile/profile.component'
import { AuthGuard } from '../core/auth.guard'

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
        canActivate: [AuthGuard],
        data: { roles: ['admin'] },
      },
    ],
  },
]
