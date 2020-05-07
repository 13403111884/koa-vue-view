export default function (Vue) {
  return [
    {
      title: 'id',
      key: 'id'
    },
    {
      title: '联系人',
      key: 'company'
    },
    {
      title: '客户名称',
      key: 'name'
    },
    {
      title: '联系电话',
      key: 'phone'
    },
    {
      title: '所属地区',
      key: 'area'
    },
    {
      title: '所属行业',
      key: 'industry'
    },
    {
      title: '成交时间',
      key: 'cTime',
      render: (h, ctx) => {
        const arr = []
        const row = ctx.row.business
        if (row.length) {
          row.forEach((item, index) => {
            let style = 'line-height: 30px;'
            if (index) {
              style = `${style} border-top: 1px #ccc solid;`
            }
            arr.push(h('li', { style }, Vue.$getTime(item.ctime, 'YYYY-MM-DD')))
          })
        }
        return h('ul', { class: 'businessStyle' }, arr)
      }
    },
    {
      title: '已做业务',
      key: 'product',
      render: (h, ctx) => {
        const arr = []
        const row = ctx.row.business
        if (row.length) {
          row.forEach((item, index) => {
            let style = 'line-height: 30px;'
            if (index) {
              style = `${style} border-top: 1px #cccccc solid;`
            }
            arr.push(h('li', { style }, item.product))
          })
        }
        return h('ul', { class: 'businessStyle' }, arr)
      }
    },
    {
      title: '合同额',
      key: 'amount',
      render: (h, ctx) => {
        const arr = []
        const row = ctx.row.business
        if (row.length) {
          row.forEach((item, index) => {
            let style = 'line-height: 30px;'
            if (index) {
              style = `${style} border-top: 1px #cccccc solid;`
            }
            arr.push(h('li', { style }, item.amount))
          })
        }
        return h('ul', { class: 'businessStyle' }, arr)
      }
    },
    {
      title: '利润',
      key: 'profit',
      render: (h, ctx) => {
        const arr = []
        const row = ctx.row.business
        if (row.length) {
          row.forEach((item, index) => {
            let style = 'line-height: 30px;'
            if (index) {
              style = `${style} border-top: 1px #cccccc solid;`
            }
            arr.push(h('li', { style }, item.profit))
          })
        }
        return h('ul', { class: 'businessStyle' }, arr)
      }
    },
    {
      title: '备注',
      key: 'remarks'
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      align: 'center',
      render: (h, params) => {
        return h('div', [
          h(
            'Button',
            {
              props: { type: 'primary', size: 'small' },
              style: { marginTop: '5px' },
              on: {
                click: () => { Vue.basicInfo('edit', params.row) }
              }
            },
            '编辑'
          ),
          h(
            'Button',
            {
              props: { type: 'info', size: 'small' },
              style: { marginTop: '5px' },
              on: {
                click: () => { Vue.business(params.row.id) }
              }
            },
            '添加业务'
          ),
          h(
            'Button',
            {
              props: { type: 'error', size: 'small' },
              style: { marginTop: '5px', marginBottom: '5px' },
              on: {
                click: () => { Vue.remove(params.row.id) }
              }
            },
            '删除'
          )
        ])
      }
    }
  ]
}
