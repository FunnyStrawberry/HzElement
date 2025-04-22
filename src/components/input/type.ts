export type InputModelType = string

export interface IInputProps {
  type?: string
  size?: 'large' | 'small'
  disabled?: boolean
  clearable?: boolean
  showPassword?: boolean
  placeholder?: string
  readonly?: boolean
  autocomplete?: string
  autofocus?: boolean
  form?: string
}

export interface IInputEmits {
  (e: 'input', value: string): void
  (e: 'change', value: string): void
  (e: 'focus', value: FocusEvent): void
  (e: 'blur', value: FocusEvent): void
  (e: 'clear'): void
}

export interface IInputInstance {
  ref: HTMLInputElement | HTMLTextAreaElement
}
