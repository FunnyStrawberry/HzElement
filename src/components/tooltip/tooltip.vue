<script setup lang="ts">
import { useFloating, offset, flip, shift, arrow, autoUpdate } from '@floating-ui/vue'
import { debounce } from 'lodash'
import type { ITooltipProps, ITooltipEmits, ITooltipInstance } from './types'
import useClickOutside from '@/hooks/use-click-outside'

defineOptions({
  name: 'HzTooltip',
})
const {
  trigger = 'hover',
  effect = 'light',
  placement = 'bottom',
  manual,
  popperOptions,
  transition = 'fade',
  addDelay = 0,
  removeDelay = 0,
} = defineProps<ITooltipProps>()
const emits = defineEmits<ITooltipEmits>()

const isShow = ref(false) // 判断 tooltip 内容是否显示
const tooltipNode = useTemplateRef<HTMLElement>('tooltipRef')
const triggerNode = useTemplateRef<HTMLElement>('triggerRef')
const popperNode = useTemplateRef<HTMLElement>('popperRef')
const arrowNode = useTemplateRef<HTMLElement>('arrowRef')
const useFloatingOptions = computed(() => {
  return {
    placement,
    middleware: [offset(9), flip(), shift({ padding: 5 }), arrow({ element: arrowNode })],
    whileElementsMounted: autoUpdate,
    ...popperOptions,
  }
})
let staticSide = ''
const staticSideOptions: Record<string, string> = {
  top: 'bottom',
  right: 'left',
  bottom: 'top',
  left: 'right',
}
const { floatingStyles, middlewareData } = useFloating(
  triggerNode,
  popperNode,
  useFloatingOptions.value,
)

let tooltipEvents: Record<string, unknown> = reactive({})
let triggerEvents: Record<string, unknown> = reactive({})
const addPopper = debounce(() => {
  isShow.value = true
  emits('visible-change', true)
}, addDelay)
const removePopper = debounce(() => {
  isShow.value = false
  emits('visible-change', false)
}, removeDelay)
const addPopperFinal = () => {
  removePopper.cancel()
  addPopper()
}
const removePopperFinal = () => {
  addPopper.cancel()
  removePopper()
}

const togglePopper = () => {
  if (isShow.value) {
    removePopperFinal()
  } else {
    addPopperFinal()
  }
}
const attachEvents = () => {
  if (trigger === 'hover') {
    tooltipEvents['mouseleave'] = removePopperFinal
    triggerEvents['mouseenter'] = addPopperFinal
  } else if (trigger === 'click') {
    triggerEvents['click'] = togglePopper
  }
}
if (!manual) {
  attachEvents()
}
useClickOutside(tooltipNode, () => {
  if (trigger === 'click' && isShow.value === true && !manual) {
    removePopper()
  }
})

onMounted(() => {
  if (triggerNode.value && popperNode.value) {
    autoUpdate(triggerNode.value, popperNode.value, () => floatingStyles.value)
  }
})

watch(
  () => trigger,
  (newTrigger, oldTrigger) => {
    if (newTrigger !== oldTrigger) {
      // clear the events
      tooltipEvents = {}
      triggerEvents = {}
      attachEvents()
    }
  },
)
watch(
  () => manual,
  (isManual) => {
    if (isManual) {
      tooltipEvents = {}
      triggerEvents = {}
    } else {
      attachEvents()
    }
  },
)
watch(
  () => middlewareData.value,
  (newMiddlewareData) => {
    const placementFirst = newMiddlewareData.offset?.placement.split('-')[0]
    const newFlip = newMiddlewareData.flip
    if (placementFirst && newFlip) {
      staticSide = staticSideOptions[placementFirst]
    }
  },
  { deep: true },
)

defineExpose<ITooltipInstance>({
  add: addPopperFinal,
  remove: removePopperFinal,
})
</script>

<template>
  <div
    class="hz-tooltip"
    :class="{
      [`is-${effect}`]: effect,
    }"
    ref="tooltipRef"
    v-on="tooltipEvents"
  >
    <div class="hz-tooltip__trigger" ref="triggerRef" v-on="triggerEvents">
      <slot />
    </div>
    <Transition :name="transition">
      <div v-if="isShow" class="hz-tooltip__popper" ref="popperRef" :style="floatingStyles">
        <slot name="content">
          {{ content }}
        </slot>
        <div
          class="hz-tooltip__arrow"
          ref="arrowRef"
          :style="{
            left: middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : '',
            top: middlewareData.arrow?.y != null ? `${middlewareData.arrow.y}px` : '',
            [staticSide]: '-4px',
          }"
          :data-popper-placement="staticSide"
        ></div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
