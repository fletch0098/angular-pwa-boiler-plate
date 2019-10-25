import { Routes } from '@angular/router'

import { BlankComponent } from './shared/components/blank/blank.component'
import { MenuLayoutComponent } from './shared/components/menu/menu.component'
import { FullLayoutComponent } from './shared/components/full/full.component'

export const AppRoutes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
    ],
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: '/auth',
      //   pathMatch: 'full',
      // },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
]
