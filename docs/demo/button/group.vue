<template>
  <div class="mb-4">
    <hz-button-group type="primary">
      <hz-button icon="arrow-left">上一页</hz-button>
      <hz-button icon="arrow-right" iconPosition="right">下一页</hz-button>
    </hz-button-group>

    <hz-button-group class="ml-4" type="primary" size="default">
      <hz-button icon="edit" />
      <hz-button icon="share-nodes" />
      <hz-button icon="trash-can" />
    </hz-button-group>
  </div>

  <div>
    <hz-button-group class="ml-4" type="primary" size="small">
      <hz-button icon="edit" />
      <hz-button type="success" size="default" icon="share-nodes" />
      <hz-button type="danger" size="large" icon="trash-can" />
    </hz-button-group>
  </div>
</template>
