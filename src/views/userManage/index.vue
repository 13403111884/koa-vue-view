<template>
  <div>
    <Search :params="params" />

    <Button type="primary" class="mb10" @click="basicInfo()">添加信息</Button>

    <Table border max-height="490" :columns="columns" :data="tableData.list"></Table>

    <div class="mr10 fr">
      <Page
        :total="tableData.total"
        :current="tableData.page.current"
        :page-size="tableData.page.pageSize"
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>

    <BasicInfo :basicInfo="modalData.basicInfo" />

    <Business :business="modalData.business" />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import columns from './modlues/table'
import Search from './modlues/search'
import BasicInfo from './modlues/basicInfo'
import Business from './modlues/business'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    store.dispatch('getClient')
  },
  components: { Search, BasicInfo, Business },
  data () {
    return {
      showImport: false,
      loading: false,
      params: {
        company: '',
        name: '',
        phone: '',
        area: '',
        industry: '',
        ctime: ''
      },
      modalData: {
        basicInfo: {
          type: 'add',
          show: false,
          title: '基本信息',
          loading: false,
          params: {
            company: '',
            name: '',
            phone: '',
            area: '',
            industry: '',
            remarks: ''
          }
        },
        business: {
          show: false,
          title: '业务信息',
          loading: false,
          params: {
            companyId: null,
            product: null,
            cTime: null,
            amount: null,
            profit: null
          }
        }
      },
      columns: columns(this) || []
    }
  },
  computed: {
    ...mapGetters(['tableData'])
  },
  mounted () {},
  methods: {
    ...mapMutations([
      'getClient',
      'addClient',
      'deleteClient'
    ]),
    pageChange (current) {
      this.getClientList({ current })
    },
    pageSizeChange (current) {
      this.getClientList({ current })
    },
    async getClientList (current) {
      const params = await this.filter(this.params)
      if (params.ctime) {
        params.ctime = new Date(params.ctime).valueOf()
      }
      const item = { params }
      if (current) {
        item.current = current
      }
      await this.getClient(item)
    },
    async filter (obj) {
      const params = {}
      Object.keys(obj).forEach(key => {
        if (obj[key]) {
          console.log(key)
          params[key] = obj[key]
        }
      })
      return params
    },
    show (index) {
      this.$Modal({
        type: 'info',
        title: 'User Info',
        content: `Name：${this.tableData.list[index].name}<br>Age：${this.tableData.list[index].age}<br>Address：${this.tableData.list[index].address}`
      })
    },
    remove (id) {
      this.$Modal({
        content: '<p>是否要删除此条信息</p>',
        onOk: async () => {
          await this.deleteClient({ query: { id } })
          await this.getClientList()
          this.$Message()
        },
        onCancel: () => {
          this.$Message({ content: '已关闭', type: 'info' })
        }
      })
    },
    basicInfo (type, row) {
      this.modalData.basicInfo.type = type
      if (type === 'edit') {
        const {
          id,
          company,
          name,
          phone,
          area,
          industry,
          remarks
        } = row
        this.modalData.basicInfo.params = {
          id,
          company,
          name,
          phone,
          area,
          industry,
          remarks
        }
      }
      this.modalData.basicInfo.show = true
    },
    business (id) {
      this.modalData.business.params.companyId = id
      this.modalData.business.show = true
    }
  }
}
</script>

<style lang="stylus" scoped>
/deep/ .businessStyle
  li
    line-height 30px
    &:not(:first-child)
      border-top 1px #ccc solid
</style>
