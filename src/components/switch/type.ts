export type SwitchModelType = boolean | string | number

export interface ISwitchProps {
  id?: string
  name?: string
  size?: 'small' | 'large'
  activeText?: string
  inactiveText?: string
  activeValue?: SwitchModelType
  inactiveValue?: SwitchModelType
  disabled?: boolean
}

export interface ISwitchEmits {
  (e: 'change', value: SwitchModelType): void
}
