import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

export type ButtonType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'default' | 'small'
export type NativeType = 'button' | 'submit' | 'reset'
export type IconPositionType = 'left' | 'right'

export interface IButtonProps {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  link?: boolean
  text?: boolean
  textBg?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  // button 的原生属性
  nativeType?: NativeType
  autofocus?: boolean
  // icon 的相关属性
  icon?: object | Array<string> | string | IconDefinition
  iconPosition?: IconPositionType
  loading?: boolean
  loadingIcon?: string
  color?: string
  tag?: string | Component
}

export interface IButtonEmits {
  (e: 'click', values: MouseEvent): void
}

export interface IButtonInstance {
  ref: HTMLButtonElement
}
