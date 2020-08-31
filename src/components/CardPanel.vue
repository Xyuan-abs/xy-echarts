<template>
  <div class="card-panel">
    <span v-if="title" class="title">{{ title }}</span>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPanel',
  props: {
    title: String,
  },
  data() {
    return {}
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card-panel {
  margin-bottom: 15px;
  margin-right: 6px;
  margin-left: 6px;
  .title {
    position: relative;
    display: inline-block;
    margin-left: 8px;
    font-size: 14px;
    margin-bottom: 5px;
    &::before {
      position: absolute;
      top: 50%;
      left: -8px;
      transform: translateY(-50%);
      content: '';
      display: inline-block;
      width: 3px;
      height: 15px;
      background-color: #0885ff;
    }
  }
  .content {
    width: 400px;
    height: 300px;
    border: 1px solid #e4e7ed;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
