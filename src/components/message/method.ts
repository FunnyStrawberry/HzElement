import { render } from 'vue'
import type { ICreateMessageProps, IMessageContext } from './type'
import MessageConstructor from './message.vue'
import useZIndex from '@/hooks/use-z-index'
let seed = 1
const messageInstanceList: IMessageContext[] = shallowReactive([])

export const createMessage = (props: ICreateMessageProps) => {
  const id = `message_${seed++}`
  const container = document.createElement('div') // 创建message节点容器
  // 当message组件消失后, 移除message组件
  const remove = () => {
    // 删除message组件实例数组中的实例
    const idx = messageInstanceList.findIndex((instance) => instance.id === id)
    if (idx === -1) return
    messageInstanceList.splice(idx, 1)
    render(null, container)
  }
  // 手动移除message组件
  const manualRemove = () => {
    const messageInstance = messageInstanceList.find((instance) => instance.id === id)
    if (messageInstance) {
      messageInstance.vm.exposed!.isVisible.value = false
    }
  }
  // 获取zIndex
  const { nextZIndex } = useZIndex()
  const newProps = {
    id,
    ...props,
    zIndex: nextZIndex(),
    onRemove: remove,
  }
  // h 函数生成虚拟节点
  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild!)
  // 虚拟节点的实例
  const vm = vnode.component!
  const messageInstance = {
    id,
    vnode,
    vm,
    props: newProps,
    remove: manualRemove,
  }
  messageInstanceList.push(messageInstance)
  return messageInstance
}

// 获取message组件实例数组中的最后一项
export const getLastMessageInstance = () => {
  return messageInstanceList.at(-1)
}
// 获取上一个message组件的底部到page顶部距离
export const getLastMessageBottomOffset = (id: string) => {
  const idx = messageInstanceList.findIndex((instance) => instance.id === id)
  if (idx <= 0) return 0
  const prev = messageInstanceList[idx - 1]
  return prev.vm.exposed!.currentBottomOffset.value
}
// 移除message组件实例数组中所有实例
export const removeAllMessage = () => {
  messageInstanceList.forEach((instance) => {
    instance.remove()
  })
}
