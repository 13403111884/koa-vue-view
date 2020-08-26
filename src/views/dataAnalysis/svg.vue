<template>
  <svg
    :class="iconStyle"
    aria-hidden="true"
  >
    <use :xlink:href="`#${iconClass}`" />
  </svg>
</template>
<script>
import './iconfont'
export default {
  name: 'IconSvg',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    iconStyle: {
      type: String,
      default: ''
    }
  }
}
</script>
