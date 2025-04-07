export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'

export interface IButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  // button 的原生属性
  nativeType?: NativeType
  autofocus?: boolean
}
export interface IButtonInstance {
  ref: HTMLButtonElement
}
