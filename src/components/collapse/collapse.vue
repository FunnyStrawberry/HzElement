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
  let _activeNames = [...activeNames.value]
  if (accordion) {
    _activeNames = [_activeNames[0] === item ? '' : item]
    activeNames.value = _activeNames
  } else {
    const index = _activeNames.indexOf(item)
    if (index > -1) {
      // 存在, 删除数组对应的一项
      _activeNames.splice(index, 1)
    } else {
      // 不存在, 插入对应的name
      _activeNames.push(item)
    }
    activeNames.value = _activeNames
  }
  emits('change', _activeNames)
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
