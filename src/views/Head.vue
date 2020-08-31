<template>
  <ul class="head flex">
    <li :class="{ active: active === i }" v-for="(d, i) in routers" :key="i" @click="click(d, i)">
      {{ d.mate.title }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Head',
  components: {},
  computed: {
    routers() {
      return this.$router.options.routes.filter(d => d.hidden !== true)
    },
  },
  watch: {
    '$route.path'() {
      this.active = this.routers.findIndex(d => d.path === this.$route.path)
    },
  },
  data() {
    return {
      active: 0,
    }
  },
  mounted() {
    this.active = this.routers.findIndex(d => d.path === this.$route.path)
  },
  methods: {
    click(d, i) {
      if (this.active === i) return false
      this.active = i
      this.$router.push({
        path: d.path,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.head {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  padding: 10px 15px;
  border-bottom: 1px solid #dcdfe6;
  margin-bottom: 10px;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.2);
  z-index: 10;
  &.flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  li {
    text-decoration: none;
    list-style: none;
    margin-right: 15px;
    cursor: pointer;
    user-select: none;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    &.active {
      color: #088eff;
    }
  }
}
</style>
