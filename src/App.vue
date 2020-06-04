<template>
  <div>
    <router-view
      v-if="['login', 'register', 'error'].includes($route.name)"
      :name="$route.name === 'error' ? $route.params.code : ''"
    ></router-view>
    <NAV v-else />
  </div>
</template>

<script>
import NAV from './components/doorFrame'
export default {
  components: { NAV },
  mounted () {}
}
</script>

<style lang="less" scoped>
.top{
  padding: 10px;
  background: rgba(0, 153, 229, .7);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>
