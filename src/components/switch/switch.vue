<script setup lang="ts">
import type { SwitchModelType, ISwitchProps, ISwitchEmits } from './type'

defineOptions({
  name: 'HzSwitch',
})
const { activeValue = true, inactiveValue = false, disabled } = defineProps<ISwitchProps>()
const emits = defineEmits<ISwitchEmits>()
const innerValue = defineModel<SwitchModelType>({
  required: true,
})

const switchNode = useTemplateRef<HTMLInputElement>('inputRef')
const isChecked = computed(() => innerValue.value === activeValue)
const switchValue = () => {
  if (disabled) return
  const newValue = isChecked.value ? inactiveValue : activeValue
  innerValue.value = newValue
  emits('change', newValue)
}

onMounted(() => {
  switchNode.value!.checked = isChecked.value
})
watch(
  () => isChecked.value,
  (newValue) => {
    switchNode.value!.checked = newValue
  },
)
</script>

<template>
  <div
    class="hz-switch"
    :class="{
      [`hz-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': isChecked,
    }"
    @click="switchValue"
  >
    <input
      ref="inputRef"
      class="hz-switch__input"
      type="checkbox"
      role="switch"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="hz-switch__core">
      <div class="hz-switch__core-inner">
        <span class="hz-switch__core-inner-text" v-if="activeText || inactiveText">
          {{ isChecked ? activeText : inactiveText }}
        </span>
      </div>
      <div class="hz-switch__core-action"></div>
    </div>
  </div>
</template>

<style scoped></style>
