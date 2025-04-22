export type SelectOptionType = {
  label: string
  value: string
  disabled?: boolean
}

export type SelectModelType = string
export type RenderLabelType = (option: SelectOptionType) => VNode
export type filterMethodType = (value: string) => SelectOptionType[]
export type remoteMethodType = (value: string) => Promise<SelectOptionType[]>

export interface ISelectProps {
  options?: SelectOptionType[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  renderLabel?: RenderLabelType
  filterable?: boolean
  filterMethod?: filterMethodType
  remote?: boolean
  remoteMethod?: remoteMethodType
}

export interface ISelectStates {
  inputValue: string
  selectOption: null | SelectOptionType
  mouseHover: boolean
  loading: boolean
  highLightIndex: number
}

export interface ISelectEmits {
  (e: 'change', value: string): void
  (e: 'visible-change', value: boolean): void
  (e: 'clear'): void
}
