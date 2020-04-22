<template>
  <Modal v-model="business.show" @on-cancel="handleReset()" :title="business.title" width="520">
    <Form ref="business" :model="business.params" :rules="rules" :label-width="80">
      <FormItem label="联系人" prop="contactPerson">
        <Input v-model="business.params.contactPerson" placeholder="请输入联系人" />
      </FormItem>
      <FormItem label="客户名称" prop="name">
        <Input v-model="business.params.name" placeholder="请输入客户名称" />
      </FormItem>
      <FormItem label="联系电话" prop="phone">
        <Input v-model="business.params.phone" placeholder="请输入联系电话" />
      </FormItem>
      <FormItem label="所属地区" prop="area">
        <Input v-model="business.params.area" placeholder="请输入所属地区" />
      </FormItem>
      <FormItem label="所属行业" prop="industry">
        <Input v-model="business.params.industry" placeholder="请输入所属行业" />
      </FormItem>
      <FormItem label="成交时间" prop="transactionTime">
        <Input v-model="business.params.transactionTime" placeholder="请输入成交时间" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()" :loading="business.loading">提交</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
function ruleInput (message) {
  return { required: true, message, trigger: 'blur' }
}
export default {
  props: {
    business: { type: Object, default: () => ({ params: {} }) }
  },
  data () {
    return {
      rules: {
        contactPerson: [ruleInput('请填写联系人')],
        name: [ruleInput('请填写客户名称')],
        phone: [ruleInput('请填写联系电话')],
        area: [ruleInput('请填写所属地区')],
        industry: [ruleInput('请填写所属行业')],
        transactionTime: [ruleInput('请填写成交时间')]
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.business.validate(valid => {
        if (valid) {
          this.business.loading = true
          setTimeout(() => {
            this.$Message()
            this.business.loading = false
            this.business.show = false
          }, 2000)
        } else {
          this.$Message({ type: 'error' })
        }
      })
    },
    handleReset () {
      this.$refs.business.resetFields()
      this.business.show = false
    }
  }
}
</script>
