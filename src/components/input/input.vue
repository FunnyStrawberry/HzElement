<script setup lang="ts">
import type { InputModelType, IInputProps, IInputEmits } from './type'
import Icon from '../icon/icon.vue'

defineOptions({
  name: 'HzInput',
  inheritAttrs: false,
})
const {
  type = 'text',
  disabled,
  clearable,
  showPassword,
  autocomplete = 'off',
} = defineProps<IInputProps>()
const emits = defineEmits<IInputEmits>()
const innerValue = defineModel<InputModelType>({
  required: true,
})

const attrs = useAttrs()
const inputNode = useTemplateRef<HTMLInputElement>('inputRef')
const keepFocus = async () => {
  await nextTick()
  inputNode.value?.focus()
}
const isFocus = ref(false) // input 是否获得焦点
const showClear = computed(() => clearable && !disabled && !!innerValue.value && isFocus.value)
const handleInput = () => {
  emits('input', innerValue.value)
}
const handleChange = () => {
  emits('change', innerValue.value)
}
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true
  emits('focus', event)
}
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false
  emits('blur', event)
}
const clearValue = () => {
  innerValue.value = ''
  emits('clear')
  emits('input', '')
  emits('change', '')
}
const isPasswordVisible = ref(false)
const showPasswordArea = computed(() => showPassword && !disabled && !!innerValue.value)
const togglePasswordVisible = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
const NOOP = () => {}

defineExpose({
  ref: inputNode,
})
</script>

<template>
  <div
    class="hz-input"
    :class="{
      [`hz-input--${type}`]: type,
      [`hz-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="hz-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="hz-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="hz-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          ref="inputRef"
          class="hz-input__inner"
          :type="showPassword ? (isPasswordVisible ? 'text' : 'password') : type"
          v-bind="attrs"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          v-model="innerValue"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="hz-input__suffix"
          @click="keepFocus"
        >
          <slot name="suffix" />
          <icon
            class="hz-input__clear"
            icon="circle-xmark"
            v-if="showClear"
            @click="clearValue"
            @mousedown.prevent="NOOP"
          />
          <icon
            class="hz-input__password"
            icon="eye-slash"
            v-if="showPasswordArea && !isPasswordVisible"
            @click="togglePasswordVisible"
          />
          <icon
            class="hz-input__password"
            icon="eye"
            v-if="showPasswordArea && isPasswordVisible"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="hz-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        ref="inputRef"
        class="hz-textarea__wrapper"
        v-bind="attrs"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        v-model="innerValue"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>

<style scoped></style>
