import type { ButtonType, ButtonSize } from './button'

export interface IButtonGroupProps {
  type?: ButtonType
  size?: ButtonSize
}

export interface IButtonGroupContext {
  type?: Ref<ButtonType>
  size?: Ref<ButtonSize>
}

export const buttonGroupContextKey: InjectionKey<IButtonGroupContext> =
  Symbol('buttonGroupContextKey')
