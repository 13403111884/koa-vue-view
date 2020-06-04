<template>
  <div class="side-menu-wrapper userNO">
    <slot></slot>
    <Menu width="auto" theme="dark" v-show="!collapsed">
      <template v-for="item in list">
        <ReSubmenu v-if="item.children" :key="`menu_${item.name}`" :name="item.name" :parent="item">
          <menu-item></menu-item>
        </ReSubmenu>
        <menu-item v-else :key="`menu_${item.name}`" :name="item.name" :to="{ name: item.name }">
          <Icon :type="item.meta.icon" />
          {{ item.meta.title }}
        </menu-item>
      </template>
    </Menu>
    <div class="drop-wrapper" v-show="collapsed">
      <template v-for="item in list">
        <ReDropdown
          v-if="item.children"
          icon-color="#fff"
          :show-title="false"
          :key="`drop_${item.name}`"
          :parent="item"
        />
        <router-link
          :title="item.meta.title"
          :to="{ name: item.name }"
          v-else
          :key="`drop_${item.name}`"
          class="drop-menu-span"
        >
          <Icon :type="item.meta.icon" color="#fff" :size="30" />
        </router-link>
      </template>
    </div>
  </div>
</template>
<script>
import ReSubmenu from './modules/re-submenu'
import ReDropdown from './modules/re-dropdown'
export default {
  name: 'SideMenu',
  components: {
    ReSubmenu,
    ReDropdown
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {}
}
</script>
<style lang="less">
.side-menu-wrapper {
  overflow-y: auto;
  .ivu-tooltip,
  .drop-menu-span {
    display: block;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }
  .drop-wrapper > .ivu-dropdown {
    display: block;
    padding: 10px;
    margin: 0 auto;
  }
}
</style>
