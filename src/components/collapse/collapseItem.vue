<script setup lang="ts">
import type { ICollapseItemProps } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'HzCollapseItem',
})
const { name, disabled } = defineProps<ICollapseItemProps>()

const collapseContext = inject(collapseContextKey)
const isActive = computed(() => collapseContext?.activeNames.value.includes(name))
const handleClick = () => {
  if (disabled) return
  collapseContext?.handleItemClick(name)
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px'
    el.style.overflow = 'hidden'
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`
  },
  afterEnter(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`
    el.style.overflow = 'hidden'
  },
  leave(el) {
    el.style.height = `0px`
  },
  afterLeave(el) {
    el.style.height = ''
    el.style.overflow = ''
  },
}
</script>

<template>
  <div
    class="hz-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  >
    <div
      class="hz-collapse-item__header"
      :class="{
        'is-disabled': disabled,
        'is-active': isActive,
      }"
      :id="`item-header-${name}`"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="hz-collapse-item__wrapper" v-show="isActive">
        <div class="hz-collapse-item__content" :id="`item-content-${name}`">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped></style>
