<template>
  <Dropdown placement="right-start">
    <span class="drop-menu-span" :style="titleStyle">
      <Icon :type="parent.meta.icon" :color="iconColor" :size="30"></Icon>
      <span color="#515a6e" v-if="showTitle">{{ parent.meta.title }}</span>
    </span>
    <DropdownMenu slot="list">
      <template v-for="item in parent.children">
        <re-dropdown v-if="item.children" :key="`drop_${item.name}`" :parent="item"></re-dropdown>
        <router-link v-else :to="{ name: item.name }" :key="`drop_${item.name}`" :name="item.name">
          <Icon :type="item.meta.icon" color="#515a6e" :size="30"></Icon>
          <span class="title">{{ item.meta.title }}</span>
        </router-link>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
export default {
  name: 'ReDropdown',
  props: {
    parent: {
      type: Object,
      default: () => ({})
    },
    iconColor: {
      type: String,
      default: '#515a6e'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    titleStyle () {
      return {
        textAlign: this.showTitle ? 'left' : 'center',
        paddingLeft: this.showTitle ? '16px' : ''
      }
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.title {
  display: inline-block;
  line-height: 30px;
  height: 30px;
  color: #515a6e;
  position: relative;
  top: -5px;
}
a:hover {
  span {
    color: #2d8cf0;
  }
}
</style>
