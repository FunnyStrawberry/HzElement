<script setup lang="ts">
import type { IButtonGroupProps } from './button-group'
import { buttonGroupContextKey } from './button-group'

defineOptions({
  name: 'HzButtonGroup',
})
const { type, size } = defineProps<IButtonGroupProps>()

provide(buttonGroupContextKey, {
  type: type ? toRef(() => type) : undefined,
  size: size ? toRef(() => size) : undefined,
})
</script>

<template>
  <div class="hz-button-group">
    <slot />
  </div>
</template>

<style scoped></style>
