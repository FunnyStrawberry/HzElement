<script setup lang="ts">
import type { IButtonProps } from './button'
import Icon from '@/components/icon/icon.vue'

defineOptions({
  name: 'HzButton',
})
const { nativeType = 'button', iconPosition = 'left' } = defineProps<IButtonProps>()
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
      'is-link': link,
      'is-text': text,
      'is-text-bg': textBg,
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
    <icon :icon="icon" v-if="icon && iconPosition === 'left'" />
    <span v-if="hasDefaultSlot">
      <slot />
    </span>
    <icon :icon="icon" v-if="icon && iconPosition === 'right'" />
  </button>
</template>

<style scoped></style>
