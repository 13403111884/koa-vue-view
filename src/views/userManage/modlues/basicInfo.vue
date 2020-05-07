<template>
  <Modal v-model="basicInfo.show" @on-cancel="handleReset()" :title="basicInfo.title" width="520">
    <Form ref="basicInfo" :model="basicInfo.params" :rules="rules" :label-width="80">
      <FormItem label="联系人" prop="company">
        <Input v-model="basicInfo.params.company" placeholder="请输入联系人" />
      </FormItem>
      <FormItem label="客户名称" prop="name">
        <Input v-model="basicInfo.params.name" placeholder="请输入客户名称" />
      </FormItem>
      <FormItem label="联系电话" prop="phone">
        <Input v-model="basicInfo.params.phone" placeholder="请输入联系电话" />
      </FormItem>
      <FormItem label="所属地区" prop="area">
        <Input v-model="basicInfo.params.area" placeholder="请输入所属地区" />
      </FormItem>
      <FormItem label="所属行业" prop="industry">
        <Input v-model="basicInfo.params.industry" placeholder="请输入所属行业" />
      </FormItem>
      <FormItem label="备注" prop="remarks">
        <Input type="textarea" v-model="basicInfo.params.remarks" placeholder="请输入成交时间" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()" :loading="basicInfo.loading">提交</Button>
      <Button @click="handleReset()" style="margin-left: 8px">取消</Button>
    </div>
  </Modal>
</template>
<script>
import { mapMutations } from 'vuex'
function ruleInput (message) {
  return { required: true, message, trigger: 'blur' }
}
export default {
  props: {
    basicInfo: { type: Object, default: () => ({ params: {} }) }
  },
  data () {
    return {
      rules: {
        company: [ruleInput('请填写联系人')],
        name: [ruleInput('请填写客户名称')],
        phone: [ruleInput('请填写联系电话')],
        area: [ruleInput('请填写所属地区')],
        industry: [ruleInput('请填写所属行业')]
      }
    }
  },
  methods: {
    ...mapMutations('Client', [
      'getClient',
      'addClient',
      'editClient'
    ]),
    handleSubmit () {
      this.$refs.basicInfo.validate(async valid => {
        if (valid) {
          this.basicInfo.loading = true
          if (this.basicInfo.type !== 'edit') {
            await this.addClient({ params: this.basicInfo.params })
          } else {
            await this.editClient({ params: this.basicInfo.params })
          }
          this.getClient()
          this.$Message()
          this.basicInfo.loading = false
          this.basicInfo.show = false
        } else {
          this.$Message({ type: 'error' })
        }
      })
    },
    handleReset () {
      this.$refs.basicInfo.resetFields()
      this.basicInfo.show = false
    }
  }
}
</script>
