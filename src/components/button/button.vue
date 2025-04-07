<script setup lang="ts">
import type { IButtonProps } from './types'

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
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<style scoped></style>
