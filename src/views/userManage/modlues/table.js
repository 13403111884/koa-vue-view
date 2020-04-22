export default function (Vue) {
  return [
    {
      title: 'id',
      key: 'id',
      render: (h, params) => {
        return h('div', [
          h('Icon', {
            props: {
              type: 'person'
            }
          }),
          h('strong', params.row.name)
        ]);
      }
    },
    {
      title: '联系人',
      key: 'age'
    },
    {
      title: '客户名称',
      key: 'address'
    },
    {
      title: '联系电话',
      key: 'address'
    },
    {
      title: '所属地区',
      key: 'address'
    },
    {
      title: '成交时间',
      key: 'address'
    },
    {
      title: '已做业务',
      key: 'address'
    },
    {
      title: '合同额',
      key: 'address'
    },
    {
      title: '利润',
      key: 'address'
    },
    {
      title: '备注',
      key: 'address'
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
                click: () => { Vue.business(params.row) }
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
                click: () => { Vue.remove(params.index) }
              }
            },
            '删除'
          )
        ])
      }
    }
  ]
}
