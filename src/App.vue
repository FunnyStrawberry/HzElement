<script setup lang="ts">
import Button from '@/components/button/button.vue'
import type { IButtonInstance } from './components/button/types'

const buttonRef = ref<IButtonInstance | null>(null)

onMounted(() => {
  if (buttonRef.value) {
    console.log(buttonRef.value.ref)
  }
})
</script>

<template>
  <div>
    <Button type="primary" plain disabled ref="buttonRef">Test Button</Button>
    <a href="#">123131</a>
  </div>
</template>

<style scoped></style>
