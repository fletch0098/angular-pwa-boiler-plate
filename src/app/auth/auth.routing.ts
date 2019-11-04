import { Routes } from '@angular/router'

import { LogInComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'

export const AuthRoutes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: '404',
      //   component: NotFoundComponent
      // },
      {
        path: '',
        redirectTo: 'login',
      },
      {
        path: 'login',
        component: LogInComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
    ],
  },
]
