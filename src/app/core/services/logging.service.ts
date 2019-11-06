import { Injectable } from '@angular/core'
import { Vars } from '../vars'

import * as moment from 'moment'

export type LogType = 'error' | 'warn' | 'info' | 'debug'

interface Options {
  level: LogType
  name: string
  operation: string
  data: any
}

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private vars: Vars) {}

  log(message: string, level: LogType = 'info', name?: string, operation?: string, data?: any): void {
    let shouldLog = this.vars.debug

    let logMessage: string = `${this.getDate()} - ${this.getLoggerName(name, operation)}${message}`

    if (shouldLog) {
      switch (level) {
        case 'debug': {
          data ? console.debug(logMessage, data) : console.debug(logMessage)
          break
        }
        case 'warn': {
          data ? console.warn(logMessage, data) : console.warn(logMessage)
          break
        }
        case 'error': {
          data ? console.error(logMessage, data) : console.error(logMessage)
          break
        }
        default: {
          data ? console.log(logMessage, data) : console.log(logMessage)
          break
        }
      }
    }
  }

  trace(name: string, operation: string) {
    this.log('****', 'debug', name, operation)
  }

  info(message: string, name?: string, operation?: string, data?: any) {
    this.log(message, 'info', name, operation, data)
  }

  debug(message: string, name?: string, operation?: string, data?: any) {
    this.log(message, 'debug', name, operation, data)
  }

  warn(message: string, name?: string, operation?: string, data?: any) {
    this.log(message, 'warn', name, operation, data)
  }

  error(message: string, name?: string, operation?: string, data?: any) {
    this.log(message, 'error', name, operation, data)
  }

  private getDate(): string {
    return moment().format('YYYY-MM-DD HH:mm:ss')
  }

  private getLoggerName(name?: string, operation?: string): string {
    if (name && operation) {
      return `${name}.${operation}() - `
    } else if (name && !operation) {
      return `${name} - `
    } else if (!name && operation) {
      return `${operation}() - `
    } else {
      return ``
    }
  }
}
