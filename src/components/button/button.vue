<script setup lang="ts">
import type { IButtonProps } from './types'

defineOptions({
  name: 'HzButton',
})
const { nativeType = 'button' } = defineProps<IButtonProps>()

const _ref = ref<HTMLButtonElement>()

defineExpose({
  ref: _ref,
})
</script>

<template>
  <button
    ref="_ref"
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
