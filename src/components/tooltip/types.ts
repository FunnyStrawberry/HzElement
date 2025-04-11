import type { Placement, UseFloatingOptions } from '@floating-ui/vue'

export interface ITooltipProps {
  content?: string // 显示的内容，也可被 slot#content 覆盖
  effect?: 'light' | 'dark' // Tooltip 主题
  trigger?: 'hover' | 'click' // 如何触发 Tooltip
  placement?: Placement // Tooltip 组件出现的位置
  manual?: boolean // 是否手动触发 Tooltip
  popperOptions?: UseFloatingOptions // popper 参数
  transition?: string // 动画名称
  addDelay?: number // 加载 Tooltip 延迟时间
  removeDelay?: number // 移除 Tooltip 延迟时间
}

export interface ITooltipEmits {
  (e: 'visible-change', value: boolean): void
}

export interface ITooltipInstance {
  add: () => void
  remove: () => void
}
