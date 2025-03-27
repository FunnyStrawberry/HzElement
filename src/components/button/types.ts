export type buttonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type buttonSize = 'large' | 'small'
export type nativeType = 'button' | 'submit' | 'reset'

export interface IButtonProps {
  type?: buttonType
  size?: buttonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  // button 的原生属性
  nativeType?: nativeType
  autofocus?: boolean
}
export interface IButtonInstance {
  ref: HTMLButtonElement
}
