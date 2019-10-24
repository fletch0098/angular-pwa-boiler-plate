import { Routes } from '@angular/router'

import { BlankComponent } from './shared/components/blank/blank.component'
import { FullComponent } from './shared/components/full/full.component'

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ],
  },
  {
    path: 'auth',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth',
        pathMatch: 'full',
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      // {
      //   path: '',
      //   loadChildren: () =>
      //     import('./authentication/authentication.module').then(
      //       m => m.AuthenticationModule
      //     )
      // }
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
]
