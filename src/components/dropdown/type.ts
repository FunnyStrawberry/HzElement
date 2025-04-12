import type { ITooltipProps } from '../tooltip/types'

export type CommandType = string | number | object

export interface IDropdownProps extends ITooltipProps {
  hideOnClick?: boolean
}

export interface IDropdownItemProps {
  command?: CommandType
  disabled?: boolean
  divided?: boolean
}

export interface IDropdownContext {
  handleItemClick: (command: CommandType) => void
}

export interface IDropdownEmits {
  (e: 'visible-change', value: boolean): void
  (e: 'command', value: CommandType): void
}

export interface IDropdownInstance {
  add: () => void
  remove: () => void
}

export const dropdownContextKey: InjectionKey<IDropdownContext> = Symbol('dropdownContextKey')
