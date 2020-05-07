<template>
  <Modal v-model="business.show" @on-cancel="handleReset()" :title="business.title" width="520">
    <Form ref="business" :model="business.params" :rules="rules" :label-width="80">
      <FormItem label="业务" prop="product">
        <Input v-model="business.params.product" placeholder="请输入业务" />
      </FormItem>
      <FormItem label="成交时间" prop="ctime">
        <DatePicker @on-change="DatePickerChange" type="date" show-week-numbers placeholder="请输入成交时间" style="width: 200px"></DatePicker>
      </FormItem>
      <FormItem label="合同额" prop="amount">
        <Input type="number" @on-change="keyboard" v-model="business.params.amount" placeholder="请输入合同额" />
      </FormItem>
      <FormItem label="利润" prop="profit">
        <Input type="number" @on-change="keyboard" v-model="business.params.profit" placeholder="请输入利润" />
      </FormItem>
    </Form>
    <div slot="footer">
      <Button type="primary" @click="handleSubmit()" :loading="business.loading">提交</Button>
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
    business: { type: Object, default: () => ({ params: {} }) }
  },
  data () {
    return {
      rules: {
        product: [ruleInput('请填写业务')],
        cTime: [ruleInput('请填写成交时间')],
        amount: [ruleInput('请填写合同额')],
        profit: [ruleInput('请填写利润')]
      }
    }
  },
  methods: {
    ...mapMutations('Client', [
      'getClient',
      'addBusiness'
    ]),
    DatePickerChange (time) {
      this.business.params.ctime = time
    },
    handleSubmit () {
      this.$refs.business.validate(async valid => {
        if (valid) {
          this.business.loading = true
          this.business.params.ctime = new Date(this.business.params.ctime).valueOf()
          this.business.params.amount = +this.business.params.amount
          this.business.params.profit = +this.business.params.profit
          await this.addBusiness({ params: this.business.params })
          this.getClient()
          this.$Message()
          this.business.loading = false
          this.business.show = false
        } else {
          this.$Message({ type: 'error' })
        }
      })
    },
    keyboard (e) {
      const val = String(e.target.value).replace(/[^\d]/g, '')
      if (+val === 0) {
        e.target.value = null
      } else {
        e.target.value = +val
      }
    },
    handleReset () {
      this.$refs.business.resetFields()
      this.business.show = false
    }
  }
}
</script>
