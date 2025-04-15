<script setup lang="ts">
import HzButton from '../../../src/components/button/button.vue'

defineOptions({
  name: 'HzButtonBasic',
})
</script>

<template>
  <hz-button>Default</hz-button>
  <hz-button type="primary">Primary</hz-button>
  <hz-button type="success">Success</hz-button>
  <hz-button type="info">Info</hz-button>
  <hz-button type="warning">Warning</hz-button>
  <hz-button type="danger">Danger</hz-button>
</template>
