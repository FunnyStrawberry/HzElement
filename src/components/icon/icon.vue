<script setup lang="ts">
import type { IIconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

defineOptions({
  name: 'HzIcon',
  inheritAttrs: false,
})
const { type, color, ...fontAwesomeIconProps } = defineProps<IIconProps>()
const customStyles = computed(() => {
  return color ? { color } : {}
})
</script>

<template>
  <i class="hz-icon" :class="{ [`hz-icon--${type}`]: type }" :style="customStyles">
    <font-awesome-icon v-bind="fontAwesomeIconProps" />
  </i>
</template>

<style scoped></style>
