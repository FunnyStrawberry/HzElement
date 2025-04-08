<script setup lang="ts">
import type { IButtonProps } from './types'
import Icon from '../icon/icon.vue'

defineOptions({
  name: 'HzButton',
})
const { nativeType = 'button' } = defineProps<IButtonProps>()

const buttonEl = useTemplateRef<HTMLButtonElement>('buttonRef')

defineExpose({
  ref: buttonEl,
})
</script>

<template>
  <button
    ref="buttonRef"
    class="hz-button"
    :class="{
      [`hz-button--${type}`]: type,
      [`hz-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
      'is-loading': loading,
    }"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <icon icon="spinner" spin v-if="loading" />
    <icon :icon="icon" v-if="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
