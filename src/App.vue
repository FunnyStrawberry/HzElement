<script setup lang="ts">
import HzButton from '@/components/button/button.vue'
import type { IButtonInstance } from './components/button/types'
import HzCollapse from './components/collapse/collapse.vue'
import HzCollapseItem from './components/collapse/collapseItem.vue'
import HzIcon from './components/icon/icon.vue'
import HzAlert from './components/alert/alert.vue'

const hzButtonEl = useTemplateRef<IButtonInstance>('hzButtonRef')
const openedValue = ref(['a'])
const handleWarningAlert = () => {
  alert('warning')
}

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
        <hz-button size="large" loading>Loading</hz-button>
        <hz-button size="large" icon="arrow-up">Icon</hz-button>
      </div>
    </div>
  </div>
  <div class="example">
    <div class="example-showcase">
      <hz-collapse v-model="openedValue" accordion>
        <hz-collapse-item name="a">
          <template #title>
            <h1>nice title</h1>
          </template>
          <div>this is aaaaa test</div>
        </hz-collapse-item>
        <hz-collapse-item name="b" title="Title B">
          <div>this is bbbbb test</div>
        </hz-collapse-item>
        <hz-collapse-item name="c" title="Disabled Title" disabled>
          <div>this is cccc test</div>
        </hz-collapse-item>
      </hz-collapse>
    </div>
  </div>
  <div class="example">
    <div class="example-showcase">
      <hz-icon icon="arrow-left" size="2xl" />
      <hz-icon icon="arrow-up" size="2xl" type="primary" />
      <hz-icon icon="arrow-right" size="2xl" type="primary" color="#f00" />
      <hz-icon icon="arrow-down" size="2xl" type="primary" color="#0f0" />
    </div>
  </div>
  <div class="example">
    <div class="example-showcase">
      <hz-alert type="primary">
        <template #title>
          <h1>Primary alert</h1>
        </template>
      </hz-alert>
      <hz-alert title="Success alert" type="success" />
      <hz-alert title="Info alert" type="info" />
      <hz-alert title="Warning alert" type="warning" @close="handleWarningAlert" />
      <hz-alert title="Error alert" type="danger" :closable="false" />
      <hz-alert title="Primary alert" type="primary" effect="dark" />
      <hz-alert title="Success alert" type="success" effect="dark" />
      <hz-alert title="Info alert" type="info" effect="dark" />
      <hz-alert title="Warning alert" type="warning" effect="dark" />
      <hz-alert title="Error alert" type="danger" effect="dark" :closable="false" />
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
  .hz-alert {
    margin: 20px 0 0;
  }
  .hz-alert:first-child {
    margin: 0;
  }
}
</style>
