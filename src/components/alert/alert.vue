<script setup lang="ts">
import type { IAlertProps, IAlertEmits } from './types'
import Icon from '../icon/icon.vue'

defineOptions({
  name: 'HzAlert',
})
const { effect = 'light' } = defineProps<IAlertProps>()
const emits = defineEmits<IAlertEmits>()

const isShow = ref(true)
const handleCloseClick = () => {
  emits('close')
  isShow.value = false
}
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeLeave(el) {
    el.style.opacity = '1'
  },
  leave(el) {
    el.style.opacity = '0'
  },
  afterLeave(el) {
    el.style.opacity = ''
  },
}
</script>

<template>
  <Transition name="opacity" v-on="transitionEvents">
    <div
      class="hz-alert"
      :class="{
        [`hz-alert--${type}`]: type,
        [`is-${effect}`]: effect,
      }"
      v-show="isShow"
    >
      <div class="hz-alert__content">
        <slot name="title">
          <span class="hz-alert__title">{{ title }}</span>
        </slot>
        <icon icon="xmark" class="hz-alert__close-btn" v-if="!closable" @click="handleCloseClick" />
      </div>
    </div>
  </Transition>
</template>

<style scoped></style>
