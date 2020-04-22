<template>
  <div>
    <Search />

    <Button type="primary" class="mb10" @click="basicInfo()">添加信息</Button>

    <Table border :columns="tableData.columns" :data="tableData.list"></Table>

    <BasicInfo :basicInfo="modalData.basicInfo" />

    <Business :business="modalData.business" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import columns from './modlues/table'
import Search from './modlues/search'
import BasicInfo from './modlues/basicInfo'
import Business from './modlues/business'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getUserlist').then(() => { })
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
            contactPerson: '',
            name: '',
            phone: '',
            area: '',
            industry: '',
            transactionTime: ''
          }
        },
        business: {
          show: false,
          title: '业务信息',
          loading: false,
          params: {
            contactPerson: '',
            name: '',
            phone: '',
            area: '',
            industry: '',
            transactionTime: ''
          }
        }
      },
      tableData: {
        columns: columns(this) || [],
        loading: false,
        list: [
          {
            name: 'John Brown',
            age: 18,
            address: 'New York No. 1 Lake Park'
          },
          {
            name: 'Jim Green',
            age: 24,
            address: 'London No. 1 Lake Park'
          },
          {
            name: 'Joe Black',
            age: 30,
            address: 'Sydney No. 1 Lake Park'
          },
          {
            name: 'Jon Snow',
            age: 26,
            address: 'Ottawa No. 2 Lake Park'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userList'])
  },
  methods: {
    show (index) {
      this.$Modal({
        type: 'info',
        title: 'User Info',
        content: `Name：${this.tableData.list[index].name}<br>Age：${this.tableData.list[index].age}<br>Address：${this.tableData.list[index].address}`
      })
    },
    remove (index) {
      this.$Modal({
        content: '<p>是否要删除此条信息</p>',
        onOk: () => {
          this.tableData.list.splice(index, 1)
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
          contactPerson,
          name,
          phone,
          area,
          industry,
          transactionTime
        } = row
        this.modalData.basicInfo.params = {
          contactPerson,
          name,
          phone,
          area,
          industry,
          transactionTime
        }
      }
      this.modalData.basicInfo.show = true
    },
    business () {
      this.modalData.basicInfo.show = true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
