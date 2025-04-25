<script setup lang="ts">
import { TinyColor } from '@ctrl/tinycolor'
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
  tag = 'button',
  color,
} = defineProps<IButtonProps>()
const slots = defineSlots()

// 判断是否存在默认插槽
const hasDefaultSlot = !!slots.default
const buttonNode = useTemplateRef<HTMLButtonElement>('buttonRef')
// 当存在 buttonGroup 获取其 type 和 size
const buttonGroupContext = inject(buttonGroupContextKey, undefined)
const _type = computed(() => (type ? type : buttonGroupContext?.type))
const _size = computed(() => (size ? size : buttonGroupContext?.size))
// 当存在 color 属性, 进行计算自定义按钮颜色
const customStyle = reactive({
  color: '',
  'color-light-3': '',
  'color-light-5': '',
  'color-light-7': '',
  'color-light-8': '',
  'color-light-9': '',
  'color-dark-2': '',
  'text-color': '',
})
if (color) {
  const customColor = new TinyColor(color)
  customStyle['color'] = customColor.toHexString()
  customStyle['color-light-3'] = customColor.mix('#fff', 30).toHexString()
  customStyle['color-light-5'] = customColor.mix('#fff', 50).toHexString()
  customStyle['color-light-7'] = customColor.mix('#fff', 70).toHexString()
  customStyle['color-light-8'] = customColor.mix('#fff', 80).toHexString()
  customStyle['color-light-9'] = customColor.mix('#fff', 90).toHexString()
  customStyle['color-dark-2'] = customColor.mix('#000', 20).toHexString()
  customStyle['text-color'] = customColor.isLight() ? '#000000' : '#ffffff'
}

defineExpose({
  ref: buttonNode,
})
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    class="hz-button"
    :class="{
      [`hz-button--${_type}`]: _type,
      [`hz-button--${_size}`]: _size && _size !== 'default',
      'hz-button--custom': color,
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
  </component>
</template>

<style>
.hz-button--custom {
  --hz-button-custom-color: v-bind("customStyle['color']");
  --hz-button-custom-color-light-3: v-bind("customStyle['color-light-3']");
  --hz-button-custom-color-light-5: v-bind("customStyle['color-light-5']");
  --hz-button-custom-color-light-7: v-bind("customStyle['color-light-7']");
  --hz-button-custom-color-light-8: v-bind("customStyle['color-light-8']");
  --hz-button-custom-color-light-9: v-bind("customStyle['color-light-9']");
  --hz-button-custom-color-dark-2: v-bind("customStyle['color-dark-2']");
}
.hz-button--custom {
  --hz-button-text-color: v-bind("customStyle['text-color']");
  --hz-button-bg-color: var(--hz-button-custom-color);
  --hz-button-border-color: var(--hz-button-custom-color);
  --hz-button-disabled-text-color: var(--hz-button-text-color);
  --hz-button-disabled-bg-color: var(--hz-button-custom-color-light-5);
  --hz-button-disabled-border-color: var(--hz-button-custom-color-light-5);
  --hz-button-hover-text-color: var(--hz-button-text-color);
  --hz-button-hover-bg-color: var(--hz-button-custom-color-light-3);
  --hz-button-hover-border-color: var(--hz-button-custom-color-light-3);
  --hz-button-active-text-color: var(--hz-button-text-color);
  --hz-button-active-bg-color: var(--hz-button-custom-color-dark-2);
  --hz-button-active-border-color: var(--hz-button-custom-color-dark-2);
  --hz-button-outline-color: var(--hz-button-custom-color-light-5);

  &.is-plain {
    --hz-button-text-color: var(--hz-button-custom-color);
    --hz-button-bg-color: var(--hz-button-custom-color-light-9);
    --hz-button-border-color: var(--hz-button-custom-color-light-5);
    --hz-button-disabled-text-color: var(--hz-button-custom-color-light-5);
    --hz-button-disabled-bg-color: var(--hz-button-custom-color-light-9);
    --hz-button-disabled-border-color: var(--hz-button-custom-color-light-8);
    --hz-button-hover-text-color: v-bind("customStyle['text-color']");
    --hz-button-hover-bg-color: var(--hz-button-custom-color);
    --hz-button-hover-border-color: var(--hz-button-custom-color);
  }
  &.is-link {
    --hz-button-text-color: var(--hz-button-custom-color);
    --hz-button-disabled-text-color: var(--hz-button-custom-color-light-5);
    --hz-button-hover-text-color: var(--hz-button-custom-color-light-5);
    --hz-button-active-text-color: var(--hz-button-custom-color-dark-2);
  }
  &.is-text {
    --hz-button-text-color: var(--hz-button-custom-color);
    --hz-button-disabled-text-color: var(--hz-button-custom-color-light-5);
  }
}
</style>
