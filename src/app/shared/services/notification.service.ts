import { Injectable, OnDestroy } from '@angular/core'
import { MatSnackBar, MatSnackBarRef } from '@angular/material'
import { Subscription } from 'rxjs'

import { AppNotificationComponent } from '../components/app-notification/app-notification.component'

/**
 * Provides an abstract wrapper around showing a MatSnackbar
 * notification based on global environment or API provided
 * configuration.
 *
 * This class Listens for the authentication state to change.
 * Once the state becomes authenticated, retrieve the startup
 * configuration from the API service. Once de-authenticated
 * set the _params to undefined and unsubscribe.
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService implements OnDestroy {
  // Configuration api subscription
  private _configState: Subscription

  private toastTimeout: number = 8000

  /**
   * Constructor
   * @param toast  {MatSnackBar}
   * @param configService {ConfigurationService}
   */
  constructor(private toast: MatSnackBar) {}

  /**
   * Unsubscribe from the config state
   * when the component is destroyed, and remove
   * the in-memory parameters.
   */
  ngOnDestroy() {
    this._configState.unsubscribe()
  }

  /**
   * Display a MatSnackbar notification and return the reference.
   * Will set the duration to the global configuration if present.
   * @param message {string}
   * @param buttonLabel {string}
   * @returns {MatSnackBarRef}
   */
  basic(message: string, buttonLabel: string = 'OK'): MatSnackBarRef<any> {
    const toastTimeout = 8000
    if (toastTimeout > 0) {
      return this.toast.open(message, buttonLabel, {
        duration: toastTimeout,
      })
    } else {
      return this.toast.open(message, buttonLabel, {})
    }
  }

  error(title: string = 'App Error!', message: string = 'Something went wrong...', buttonLabel: string = 'OK'): MatSnackBarRef<any> {
    return this.toast.openFromComponent(AppNotificationComponent, {
      duration: this.toastTimeout,
      data: { title, message, buttonLabel, color: 'warn' },
    })
  }

  success(title: string = 'Success!', message: string = 'Operation successul', buttonLabel: string = 'OK'): MatSnackBarRef<any> {
    return this.toast.openFromComponent(AppNotificationComponent, {
      duration: this.toastTimeout,
      data: { title, message, buttonLabel, color: 'primary' },
    })
  }

  warn(title: string = 'Success!', message: string = 'Operation successul', buttonLabel: string = 'OK'): MatSnackBarRef<any> {
    return this.toast.openFromComponent(AppNotificationComponent, {
      duration: this.toastTimeout,
      data: { title, message, buttonLabel, color: 'accent' },
    })
  }
}
