import type { ButtonType, ButtonSize } from './button'

export interface IButtonGroupProps {
  type?: ButtonType
  size?: ButtonSize
}

export const buttonGroupContextKey: InjectionKey<IButtonGroupProps> =
  Symbol('buttonGroupContextKey')
