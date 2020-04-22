import {
  Sider,
  Layout,
  Header,
  Content,
  Button,
  Icon,
  Card,
  Table,
  Modal,
  Message,
  Input,
  Form,
  FormItem,
  Row,
  Col,
  Menu,
  Submenu,
  Tooltip,
  Poptip,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  MenuItem,
  MenuGroup
} from 'view-design'

export default {
  install: (Vue) => {
    Vue.component('Sider', Sider)
    Vue.component('Layout', Layout)
    Vue.component('Header', Header)
    Vue.component('Content', Content)
    Vue.component('Button', Button)
    Vue.component('Icon', Icon)
    Vue.component('Card', Card)
    Vue.component('Table', Table)
    Vue.component('Modal', Modal)
    Vue.component('Input', Input)
    Vue.component('Form', Form)
    Vue.component('FormItem', FormItem)
    Vue.component('Row', Row)
    Vue.component('Col', Col)
    Vue.component('Dropdown', Dropdown)
    Vue.component('DropdownMenu', DropdownMenu)
    Vue.component('DropdownItem', DropdownItem)
    Vue.component('Tooltip', Tooltip)
    Vue.component('Poptip', Poptip)
    Vue.component('Menu', Menu)
    Vue.component('Submenu', Submenu)
    Vue.component('MenuItem', MenuItem)
    Vue.component('MenuGroup', MenuGroup)

    const arr = { success: '成功！', warning: '警告！', error: '失败！'}
    Vue.prototype.$Modal = function (item) {
      const {
        title = '确认窗',
        width = 416,
        loading = false,
        content = '成功',
        render = null,
        okText = '确定',
        cancelText = '取消',
        scrollable = false,
        closable = true,
        onOk = () => { Message.success({ content: '你点击了确认' }) },
        onCancel = () => { Message.warning({ content: '你点击了取消' }) },
        type = 'confirm'
      } = item || {}
      return Modal[type]({
        title,
        width,
        loading,
        content,
        render,
        okText,
        cancelText,
        scrollable,
        closable,
        onOk,
        onCancel
      })
    }

    Vue.prototype.$Message = function (item) {
      const {
        top = 24,
        background = true,
        type = 'success',
        content = null,
        render = null,
        closable = false,
        duration = 3
      } = item || {}
      const params = { top, background, duration, closable }
      if (render) {
        params.render = render
      } else {
        params.content = content || arr[type] || '提示信息！'
      }
      return Message[type](params)
    }
  }
}