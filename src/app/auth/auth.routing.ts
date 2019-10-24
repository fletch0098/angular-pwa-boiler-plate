import { Routes } from '@angular/router'

import { AuthComponent } from './auth/auth.component'

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AuthComponent,
        data: {
          title: 'Auth',
        },
      },
    ],
  },
]
