<script setup lang="ts">
import type { CommandType, IDropdownProps, IDropdownEmits, IDropdownInstance } from './type'
import { dropdownContextKey } from './type'
import Tooltip from '../tooltip/tooltip.vue'
import type { ITooltipInstance } from '../tooltip/types'

defineOptions({
  name: 'HzDropdown',
})
const { hideOnClick = true } = defineProps<IDropdownProps>()
const emits = defineEmits<IDropdownEmits>()

const tooltipNode = useTemplateRef<ITooltipInstance>('tooltipRef')
const visibleChange = (e: boolean) => {
  emits('visible-change', e)
}
const handleItemClick = (command: CommandType) => {
  emits('command', command)
  if (hideOnClick) tooltipNode.value?.remove()
}
provide(dropdownContextKey, {
  handleItemClick,
})

defineExpose<IDropdownInstance>({
  add: () => tooltipNode.value?.add(),
  remove: () => tooltipNode.value?.remove(),
})
</script>

<template>
  <div class="hz-dropdown">
    <tooltip
      ref="tooltipRef"
      :effect="effect"
      :trigger="trigger"
      :placement="placement"
      :manual="manual"
      :popperOptions="popperOptions"
      :transition="transition"
      :addDelay="addDelay"
      :removeDelay="removeDelay"
      @visibleChange="visibleChange"
    >
      <slot />
      <template #content>
        <slot name="dropdown" />
      </template>
    </tooltip>
  </div>
</template>

<style scoped></style>
