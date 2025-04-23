<script setup lang="ts"></script>

<template>
  <div class="mb-4">
    <hz-button>Default</hz-button>
    <hz-button type="primary">Primary</hz-button>
    <hz-button type="success">Success</hz-button>
    <hz-button type="info">Info</hz-button>
    <hz-button type="warning">Warning</hz-button>
    <hz-button type="danger">Danger</hz-button>
  </div>

  <div class="mb-4">
    <hz-button plain>Plain</hz-button>
    <hz-button type="primary" plain>Primary</hz-button>
    <hz-button type="success" plain>Success</hz-button>
    <hz-button type="info" plain>Info</hz-button>
    <hz-button type="warning" plain>Warning</hz-button>
    <hz-button type="danger" plain>Danger</hz-button>
  </div>

  <div class="mb-4">
    <hz-button round>Round</hz-button>
    <hz-button type="primary" round>Primary</hz-button>
    <hz-button type="success" round>Success</hz-button>
    <hz-button type="info" round>Info</hz-button>
    <hz-button type="warning" round>Warning</hz-button>
    <hz-button type="danger" round>Danger</hz-button>
  </div>

  <div>
    <hz-button icon="search" circle />
    <hz-button type="primary" icon="edit" circle />
    <hz-button type="success" icon="check" circle />
    <hz-button type="info" icon="envelope" circle />
    <hz-button type="warning" icon="star" circle />
    <hz-button type="danger" icon="trash-can" circle />
  </div>
</template>
