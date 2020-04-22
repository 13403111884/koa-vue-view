<template>
  <div>
    <Form ref="search" :model="params" :label-width="80" inline>
      <FormItem label="联系人" prop="contactPerson">
        <Input type="text" v-model="params.contactPerson" />
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
      <FormItem label="成交时间" prop="transactionTime">
        <Input type="text" v-model="params.transactionTime" />
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
export default {
  data () {
    return {
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
  methods: {
    handleSubmit () {
      this.$Message({ content: 'Success!' })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
