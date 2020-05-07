<template>
  <div>
    <Form ref="search" :model="params" :label-width="80" inline>
      <FormItem label="联系人" prop="company">
        <Input type="text" v-model="params.company" />
      </FormItem>
      <FormItem label="客户名称" prop="name">
        <Input type="text" v-model="params.name" />
      </FormItem>
      <FormItem label="联系电话" prop="phone">
        <Input type="text" v-model="params.phone" number />
      </FormItem>
      <FormItem label="所属地区" prop="area">
        <Input type="text" v-model="params.area" />
      </FormItem>
      <FormItem label="所属行业" prop="industry">
        <Input type="text" v-model="params.industry" />
      </FormItem>
      <FormItem label="成交时间" prop="ctime">
        <DatePicker @on-change="DatePickerChange" type="date" show-week-numbers placeholder="请输入成交时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem class="fr pr20">
        <Button type="primary" @click="handleSubmit()">搜索</Button>
        <Button @click="handleReset('search')" style="margin-left: 8px">重置</Button>
      </FormItem>
      <div class="clear"></div>
    </Form>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
export default {
  data () {
    return {
      params: {
        company: '',
        name: '',
        phone: '',
        area: '',
        industry: '',
        ctime: ''
      }
    }
  },
  methods: {
    ...mapActions([]),
    ...mapMutations('Client', ['getClient']),
    async handleSubmit () {
      const params = await this.filter(this.params)
      if (params.ctime) {
        params.ctime = new Date(params.ctime).valueOf()
      }
      await this.getClient({ params })
      this.$Message({ content: 'Success!' })
    },
    DatePickerChange (time) {
      this.params.ctime = time
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
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
