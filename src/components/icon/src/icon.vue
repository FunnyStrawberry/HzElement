<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { IIconProps } from './icon'

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
  <i class="hz-icon" :class="{ [`hz-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="fontAwesomeIconProps" />
  </i>
</template>

<style scoped></style>
