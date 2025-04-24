<script setup lang="ts">
import type { IButtonProps } from './button'
import { buttonGroupContextKey } from './button-group'
import Icon from '@/components/icon/icon.vue'

defineOptions({
  name: 'HzButton',
})
const {
  type,
  size,
  nativeType = 'button',
  iconPosition = 'left',
  loadingIcon = 'spinner',
} = defineProps<IButtonProps>()
const slots = defineSlots()

// 判断是否存在默认插槽
const hasDefaultSlot = !!slots.default
const buttonNode = useTemplateRef<HTMLButtonElement>('buttonRef')
// 当存在 buttonGroup 获取其 type 和 size
const buttonGroupContext = inject(buttonGroupContextKey)
const _type = computed(() => (type ? type : buttonGroupContext?.type))
const _size = computed(() => (size ? size : buttonGroupContext?.size))

defineExpose({
  ref: buttonNode,
})
</script>

<template>
  <button
    ref="buttonRef"
    class="hz-button"
    :class="{
      [`hz-button--${_type}`]: _type,
      [`hz-button--${_size}`]: _size !== 'default',
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
    <icon :icon="loadingIcon" spin v-if="loading" />
    <icon :icon="icon" v-if="icon && iconPosition === 'left'" />
    <span v-if="hasDefaultSlot">
      <slot />
    </span>
    <icon :icon="icon" v-if="icon && iconPosition === 'right'" />
  </button>
</template>

<style scoped></style>
