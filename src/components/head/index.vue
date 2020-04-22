<template>
  <div class="Header">
    <Tooltip placement="right" content="侧边栏切换">
      <Icon @click.native="handleCollapsed" :size="32" class="menu-wrapper fl" :type="IconType" />
    </Tooltip>
    <Poptip class="user fr" placement="bottom-end" width="81">
      <div class="userName">
        <Icon type="md-contact" />用户
      </div>
      <ul class="menu-content" slot="content">
        <li>
          <Icon type="md-settings" />设置
        </li>
        <li>
          <Icon type="md-log-out" />退出
        </li>
      </ul>
    </Poptip>
    <span class="welcomeSpeech fr">欢迎您使用！</span>
    <div class="clear"></div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: { collapsed: { type: Boolean } },
  computed: {
    triggerClasses () {
      return ['trigger-icon', this.collapsed ? 'rotate' : '']
    },
    IconType () {
      return this.collapsed ? 'md-bookmarks' : 'ios-bookmarks'
    }
  },
  methods: {
    handleCollapsed () {
      this.$emit('handleCollapsed')
      this.TooltipDisabled = true
    }
  }
}
</script>

<style lang="less" scoped>
.Header {
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}
.menu-wrapper {
  padding: 16px;
  cursor: pointer;
}
.welcomeSpeech {
  font-size: 12px;
  margin-right: 20px;
}
.user {
  font-size: 18px;
  margin-right: 20px;
  cursor: pointer;
  &:hover .userName {
    color: #2d8cf0;
  }
  .userName {
    height: 50px;
    font-weight: bold;
    text-align: center;
  }
  .menu-content {
    li {
      line-height: 36px;
      border-bottom: 1px solid #cccccc;
      &:hover {
        color: #2d8cf0;
      }
    }
  }
}
</style>
