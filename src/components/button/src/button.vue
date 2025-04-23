<script setup lang="ts">
import type { IButtonProps } from './types'
import Icon from '@/components/icon/icon.vue'

defineOptions({
  name: 'HzButton',
})
const { nativeType = 'button' } = defineProps<IButtonProps>()
const slots = defineSlots()

// 判断是否存在默认插槽
const hasDefaultSlot = !!slots.default
const buttonNode = useTemplateRef<HTMLButtonElement>('buttonRef')

defineExpose({
  ref: buttonNode,
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
    <span v-if="hasDefaultSlot">
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
