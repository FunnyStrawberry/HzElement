<script setup lang="ts">
import type { IDropdownItemProps } from './type'
import { dropdownContextKey } from './type'

defineOptions({
  name: 'HzDropdownItem',
})
const { command, disabled } = defineProps<IDropdownItemProps>()

const dropdownContext = inject(dropdownContextKey)
const handleClick = () => {
  if (disabled) return
  if (command) dropdownContext?.handleItemClick(command)
}
</script>

<template>
  <li v-if="divided" class="hz-dropdown-menu__divided" />
  <li
    class="hz-dropdown-menu__item"
    :class="{ 'is-disabled': disabled, 'is-divided': divided }"
    @click="handleClick"
  >
    <slot />
  </li>
</template>

<style scoped></style>
