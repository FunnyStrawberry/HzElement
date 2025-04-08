export type AlertType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type AlertEffect = 'light' | 'dark'

export interface IAlertProps {
  title?: string
  type: AlertType
  closable?: boolean
  effect?: AlertEffect
}

export interface IAlertEmits {
  (e: 'close'): void
}
