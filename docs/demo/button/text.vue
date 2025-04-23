<template>
  <p>基础文字按钮</p>
  <div class="mb-4">
    <hz-button text>text</hz-button>
    <hz-button type="primary" text>primary</hz-button>
    <hz-button type="success" text>success</hz-button>
    <hz-button type="info" text>info</hz-button>
    <hz-button type="warning" text>warning</hz-button>
    <hz-button type="danger" text>danger</hz-button>
  </div>

  <p>带背景文字按钮</p>
  <div class="mb-4">
    <hz-button text textBg>text</hz-button>
    <hz-button type="primary" text textBg>primary</hz-button>
    <hz-button type="success" text textBg>success</hz-button>
    <hz-button type="info" text textBg>info</hz-button>
    <hz-button type="warning" text textBg>warning</hz-button>
    <hz-button type="danger" text textBg>danger</hz-button>
  </div>

  <p>禁用文字按钮</p>
  <div>
    <hz-button text disabled>text</hz-button>
    <hz-button type="primary" text disabled>primary</hz-button>
    <hz-button type="success" text disabled>success</hz-button>
    <hz-button type="info" text disabled>info</hz-button>
    <hz-button type="warning" text disabled>warning</hz-button>
    <hz-button type="danger" text disabled>danger</hz-button>
  </div>
</template>
