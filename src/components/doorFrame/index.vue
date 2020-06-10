<template>
  <div class="layout-wrapper">
    <Layout class="layout-outer">
      <Sider collapsible v-model="collapsed" hide-trigger breakpoint="sm" class="layout-Menu">
        <SideMenu :collapsed="collapsed" :list="menuList" />
      </Sider>
      <Layout>
        <Header class="layout-header">
          <Head @handleCollapsed="handleCollapsed" :collapsed="collapsed" />
        </Header>
        <Content class="layout-content">
          <div class="layout-content-view">
            <router-view />
          </div>
        </Content>
      </Layout>
    </Layout>
    <BackTop></BackTop>
  </div>
</template>
<script>
import Head from './head'
import SideMenu from './menuContainer'

import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    SideMenu,
    Head
  },
  data () {
    return {
      collapsed: true,
      menuList: []
    }
  },
  computed: {
    ...mapGetters([])
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.getMenuList()
    },
    ...mapActions([]),
    handleCollapsed () {
      this.collapsed = !this.collapsed
    },
    async getMenuList () {
      this.menuList = []
      if (!this.$nav && !this.$nav.length) return
      this.$nav.forEach(item => {
        if (item.name && item.meta.show !== false) {
          this.menuList.push(item)
        } else if (item.children && item.children.length) {
          item.children.forEach(el => {
            this.menuList.push(el)
          })
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
/deep/ .ivu-layout-sider-children
  overflow-y auto !important
  padding-bottom: 80px

.layout-wrapper,
.layout-outer
  .layout-Menu
    height 100vh
  .layout-header
    background #fff
    padding 0
  .layout-content
    background-color #fff
    margin 6px
    padding 10px 10px 60px
    overflow-y auto
    border-radius 5px
    height calc(100vh - 81px)
    box-shadow 0px 0px 6px rgba(0, 0, 0, 0.1)
</style>