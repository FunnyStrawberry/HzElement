<script setup lang="ts">
import HzButton from '@/components/button/button.vue'
import type { IButtonInstance } from './components/button/types'

const hzButtonEl = useTemplateRef<IButtonInstance>('hzButtonRef')

import Collapse from './components/collapse/collapse.vue'
import CollapseItem from './components/collapse/collapseItem.vue'

const openedValue = ref(['a'])

onMounted(() => {
  if (hzButtonEl.value) {
    console.log('hzButtonEl', hzButtonEl.value.ref)
  }
})
</script>

<template>
  <div class="example">
    <div class="example-showcase">
      <div class="mb-4">
        <hz-button ref="hzButtonRef">Default</hz-button>
        <hz-button type="primary">Primary</hz-button>
        <hz-button type="success">Success</hz-button>
        <hz-button type="info">Info</hz-button>
        <hz-button type="warning">Warning</hz-button>
        <hz-button type="danger">Danger</hz-button>
      </div>
      <div class="mb-4">
        <hz-button plain>Default</hz-button>
        <hz-button type="primary" plain>Primary</hz-button>
        <hz-button type="success" plain>Success</hz-button>
        <hz-button type="info" plain>Info</hz-button>
        <hz-button type="warning" plain>Warning</hz-button>
        <hz-button type="danger" plain>Danger</hz-button>
      </div>
      <div class="mb-4">
        <hz-button round>Default</hz-button>
        <hz-button type="primary" round>Primary</hz-button>
        <hz-button type="success" round>Success</hz-button>
        <hz-button type="info" round>Info</hz-button>
        <hz-button type="warning" round>Warning</hz-button>
        <hz-button type="danger" round>Danger</hz-button>
      </div>
      <div class="mb-4">
        <hz-button circle>HZ</hz-button>
        <hz-button size="large">Large</hz-button>
        <hz-button size="small">Small</hz-button>
        <hz-button disabled>Disabled Button</hz-button>
      </div>
    </div>
  </div>
  <div class="example">
    <div class="example-showcase">
      <collapse v-model="openedValue" accordion>
        <collapse-item name="a">
          <template #title>
            <h1>nice title</h1>
          </template>
          <div>this is aaaaa test</div>
        </collapse-item>
        <collapse-item name="b" title="Title B">
          <div>this is bbbbb test</div>
        </collapse-item>
        <collapse-item name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </collapse-item>
      </collapse>
    </div>
  </div>
</template>

<style scoped>
.example {
  width: 100%;
  border: 1px solid var(--hz-border-color);
  border-radius: var(--hz-border-radius-base);
  .example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    background-color: var(--hz-bg-color);
    .mb-4 {
      margin-bottom: 1rem;
    }
  }
}
</style>
