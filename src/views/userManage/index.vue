<template>
  <div>
    <Search />

    <Button type="primary" class="mb10" @click="basicInfo()">添加信息</Button>

    <Table border :columns="columns" :data="tableData.list"></Table>

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
    store.dispatch('Client/getClient')
  },
  components: { Search, BasicInfo, Business },
  data () {
    return {
      showImport: false,
      loading: false,
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
    ...mapGetters('Client', ['tableData'])
  },
  methods: {
    ...mapMutations('Client', [
      'getClient',
      'addClient',
      'deleteClient'
    ]),
    pageChange (current) {
      this.getClient({ current })
    },
    pageSizeChange (current) {
      this.getClient({ current })
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
        onOk: () => {
          this.deleteClient({ query: { id } })
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

<style lang="less" scoped>

</style>
