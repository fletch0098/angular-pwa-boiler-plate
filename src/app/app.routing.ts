import { Routes } from '@angular/router'

import { BlankComponent } from './shared/components/blank/blank.component'
import { MenuLayoutComponent } from './shared/components/menu/menu.component'
import { FullLayoutComponent } from './shared/components/full/full.component'

import { NotFoundComponent } from './app-not-found/not-found.component'

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
    path: '**',
    redirectTo: '/404',
  },
]
