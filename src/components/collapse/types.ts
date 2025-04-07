export type NameType = string | number

export type CollapseModelType = NameType[]

export interface ICollapseProps {
  accordion?: boolean
}

export interface ICollapseItemProps {
  name: NameType
  title?: string
  disabled?: boolean
}

export interface ICollapseContext {
  activeNames: Ref<NameType[]>
  handleItemClick: (name: NameType) => void
}

export interface ICollapseEmits {
  (e: 'change', values: NameType[]): void
}
export const collapseContextKey: InjectionKey<ICollapseContext> = Symbol('collapseContextKey')
