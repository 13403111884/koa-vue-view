export default function (Vue) {
  const ul = (h, list, key, is) => {
    const arr = []
    if (list.length) {
      list.forEach(item => {
        const obj = { attrs:{}, class: 'ell' }
        if (is === 'title') {
          obj.attrs.title = item[key]
        }
        if (key === 'ctime') {
          arr.push(h('li', obj, Vue.$getTime(item.ctime, 'YYYY-MM-DD')))
        } else {
          arr.push(h('li', obj, item[key]))
        }
      })
    }
    return h('ul', { class: 'businessStyle' }, arr)
  }
  return [
    {
      fixed: 'left',
      title: 'id',
      width: 60,
      key: 'id'
    },
    {
      title: '联系人',
      width: 120,
      key: 'company'
    },
    {
      title: '客户名称',
      width: 220,
      key: 'name'
    },
    {
      title: '联系电话',
      width: 130,
      key: 'phone'
    },
    {
      title: '所属地区',
      width: 130,
      key: 'area'
    },
    {
      title: '所属行业',
      width: 130,
      key: 'industry'
    },
    {
      title: '成交时间',
      width: 130,
      key: 'cTime',
      render: (h, ctx) => ul(h, ctx.row.business, 'ctime')
    },
    {
      title: '已做业务',
      width: 130,
      key: 'product',
      render: (h, ctx) => ul(h, ctx.row.business, 'product', 'title')
    },
    {
      title: '合同额',
      width: 80,
      key: 'amount',
      render: (h, ctx) => ul(h, ctx.row.business, 'amount')
    },
    {
      title: '利润',
      width: 80,
      key: 'profit',
      render: (h, ctx) => ul(h, ctx.row.business, 'profit')
    },
    {
      title: '备注',
      width: 220,
      key: 'remarks'
    },
    {
      fixed: 'right',
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
