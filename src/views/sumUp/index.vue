<template>
  <div>
    <Button type="primary" @click="submit()">提交</Button>
    <Editor :apiKey="editorApiKey" v-model="value" :init="init" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Editor from '@tinymce/tinymce-vue'

export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getMovielist').then(() => { })
  },
  components: { Editor },
  data () {
    return {
      value: '',
      init: {
        height: 360,
        branding: false, // 是否禁用“Powered by TinyMCE”
        menubar: false, // 顶部菜单栏显示,
        toolbar:
          ` undo redo | styleselect | bold italic underline strikethrough forecolor backcolor emoticons | fontsizeselect |
          alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | ilink unlink image code | removeformat`,
        plugins: 'paste  link'
      }
    }
  },
  computed: {
    ...mapState(['editorApiKey']),
    ...mapGetters(['movieList'])
  },
  mounted () { },
  methods: {
    submit () {
      console.log(this.value)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
