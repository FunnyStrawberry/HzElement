<script setup lang="ts">
import type { NameType, CollapseModelType, ICollapseProps, ICollapseEmits } from './types'
import { collapseContextKey } from './types'

defineOptions({
  name: 'HzCollapse',
})
const { accordion } = defineProps<ICollapseProps>()
const emits = defineEmits<ICollapseEmits>()
const activeNames = defineModel<CollapseModelType>({
  required: true,
})

if (accordion && activeNames.value.length > 1) {
  console.warn('accordion mode should only have one active item')
}
const handleItemClick = (item: NameType) => {
  if (accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item]
  } else {
    const index = activeNames.value.indexOf(item)
    if (index > -1) {
      // 存在, 删除数组对应的一项
      activeNames.value.splice(index, 1)
    } else {
      // 不存在, 插入对应的name
      activeNames.value.push(item)
    }
  }
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick,
})
</script>

<template>
  <div class="hz-collapse">
    <slot />
  </div>
</template>

<style scoped></style>
