import type { ComponentInternalInstance } from 'vue'

export type MessageType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type TimerType = NodeJS.Timeout | string | number | undefined

export interface IMessageProps {
  id: string
  message?: string | VNode // 消息文字
  type?: MessageType // 消息类型
  duration?: number // 显示时间，单位为毫秒。 设为 0 则不会自动关闭
  showClose?: boolean // 是否显示关闭按钮
  offset?: number // message距离窗口顶部的偏移量
  transitionName?: string
  zIndex: number
  onRemove: () => void
}
export type ICreateMessageProps = Omit<IMessageProps, 'id' | 'zIndex' | 'onRemove'>

export interface IMessageContext {
  id: string
  vnode: VNode
  vm: ComponentInternalInstance
  props: IMessageProps
  remove: () => void
}
