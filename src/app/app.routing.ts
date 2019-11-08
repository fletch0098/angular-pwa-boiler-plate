import { Routes } from '@angular/router'

import { BlankComponent } from './core/components/blank/blank.component'
import { MenuLayoutComponent } from './core/components/menu/menu.component'
import { FullLayoutComponent } from './core/components/full/full.component'

import { NotFoundComponent } from './404/not-found.component'

export const AppRoutes: Routes = [
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
      {
        path: '404',
        component: NotFoundComponent,
      },
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
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
      },
    ],
  },
  {
    path: '',
    component: MenuLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/404',
  },
]
