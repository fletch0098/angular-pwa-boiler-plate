import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../core/services/auth.service'
import { LoggingService, LogType } from '../../core/services/logging.service'

import { NotificationService } from '../../shared/services/notification.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LogInComponent {
  name: string = 'LogInComponent'

  signinForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  hide: boolean = true

  get emailInput() {
    return this.signinForm.get('email')
  }
  get passwordInput() {
    return this.signinForm.get('password')
  }

  constructor(
    private _router: Router,
    private authService: AuthService,
    private notificationService: NotificationService,
    private loggingService: LoggingService
  ) {}

  getEmailInputError(): string {
    if (this.emailInput.hasError('email')) {
      return 'Please enter a valid email address.'
    }
    if (this.emailInput.hasError('required')) {
      return 'An Email is required.'
    }
  }

  getPasswordInputError(): string {
    if (this.passwordInput.hasError('required')) {
      return 'A password is required.'
    }
  }

  signIn(): void {
    let operation: string = 'signIn'
    let credentials = {
      username: this.emailInput.value,
      password: this.passwordInput.value,
    }

    this.authService.login(credentials).subscribe(
      result => {
        this.loggingService.info('User logged in successfully', this.name, operation, result)
        this.notificationService.warn('Logged in successfully')
        this._router.navigate(['dashboard', 'profile'])
      },
      err => {
        let errorMessage: string = ''
        err.graphQLErrors.map(x => {
          errorMessage = errorMessage + '\n' + x.details.join('\n')
        })

        this.notificationService.basic(errorMessage)
      }
    )
  }
}
