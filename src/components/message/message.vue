<script setup lang="ts">
import type { TimerType, IMessageProps } from './type'
import { getLastMessageBottomOffset } from './method'
import useEventListener from '@/hooks/use-event-listener'
import RenderVnode from '@/common/render-vnode'
import icon from '../icon/icon.vue'

defineOptions({
  name: 'HzMessage',
})
const {
  id,
  type = 'info',
  duration = 3000,
  showClose = false,
  offset = 20,
  transitionName = 'fade-up',
  zIndex,
  onRemove,
} = defineProps<IMessageProps>()

const isVisible = ref(false) // 是否加载 messsage 组件
const messageNode = useTemplateRef<HTMLDivElement>('messageRef')
// 计算偏移高度
// 上一个message组件的底部到page顶部距离
const lastBottomOffset = computed(() => getLastMessageBottomOffset(id))
const height = ref(0) // 定义当前message组件的高度
// 当前message组件的顶部到page顶部距离
const currentTopOffset = computed(() => offset + lastBottomOffset.value)
// 当前message组件的底部到page顶部距离
const currentBottomOffset = computed(() => currentTopOffset.value + height.value)
const cssStyle = computed(() => ({
  top: currentTopOffset.value + 'px',
  zIndex,
}))
// message组件定时器部分
let timer: TimerType
const startTimer = () => {
  if (duration === 0) return
  timer = setTimeout(() => {
    isVisible.value = false
  }, duration)
}
const clearTimer = () => {
  clearTimeout(timer)
}
// ESC按键移除message组件
const keydownRemove = (e: Event) => {
  const event = e as KeyboardEvent
  if (event.code === 'Escape') {
    isVisible.value = false
  }
}
useEventListener(document, 'keydown', keydownRemove)
// 动画效果
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  enter() {
    height.value = messageNode.value!.getBoundingClientRect().height
  },
  afterLeave() {
    onRemove()
  },
}

onMounted(async () => {
  isVisible.value = true
  startTimer()
})

defineExpose({
  isVisible,
  currentBottomOffset,
})
</script>

<template>
  <Transition :name="transitionName" v-on="transitionEvents">
    <div
      ref="messageRef"
      class="hz-message"
      :class="{
        [`hz-message--${type}`]: type,
        'is-close': showClose,
      }"
      :style="cssStyle"
      v-show="isVisible"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="hz-message__content">
        <slot>
          <render-vnode :vNode="message" />
        </slot>
      </div>
      <div class="hz-message__close" v-if="showClose">
        <icon icon="xmark" @click.stop="isVisible = false" />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
