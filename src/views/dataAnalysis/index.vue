<template>
  <div>
    <div id="dataBar">图标：{{analysisList}}</div>
    <input type="file" @change="fileChange">
    <button @click="submitBtn()">上传</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MD5 from 'md5'
import axios from 'axios'
export default {
  // 在路由组件上暴露出一个自定义静态函数 asyncData。
  // 注意，由于此函数会在组件实例化之前调用，所以它无法访问 this
  asyncData ({ store }) {
    return store.dispatch('getAnalysis').then(() => { })
  },
  data () {
    return {
      file: null,
      blobSlice: null,
      chunkSize: 2 * 1024 * 1024,
      fileHash: ''
    }
  },
  mounted () {
    this.blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  },
  methods: {
    fileChange (e) {
      if (!e.target.files || !e.target.files[0]) return
      this.file = e.target.files[0]
      const reader = new FileReader()
      this.file && reader.readAsArrayBuffer(this.file)
      reader.onload = e => {
        const bstr = e.target.result
        this.fileHash = MD5(bstr)
        
        console.log(this.blobSlice, bstr, new Blob([bstr]),)
      }
      reader.onerror = () => {
        console.warn('文件读取失败！')
      }
    },
    async submitBtn (file) {
      file = file || this.file
      if (!file) {
        console.log('没有获取文件')
        return
      }
      const axiosPromiseArray = []
      const fileSize = file.size
      console.log()
      const chunks = Math.ceil(fileSize / this.chunkSize)

      for (let i = 0; i < chunks; i++) {
        const start = i * this.chunkSize;
        const end = Math.min(file.size, start + this.chunkSize)
        const sheet = this.blobSlice.call(file, start, end)

        const form = new FormData()
        form.append('file', sheet)
        form.append('name', file.name)
        form.append('total', chunks)
        form.append('index', i)
        form.append('size', file.size)
        form.append('sheetHash', MD5(sheet))
        form.append('fileHash', this.fileHash)
        // ajax提交 分片，此时 content-type 为 multipart/form-data
        const axiosOptions = {
          onUploadProgress: e => {
            // 处理上传的进度
            console.log(chunks, i, e, file)
          },
        };
        // 加入到 Promise 数组中
        axiosPromiseArray.push(axios.post('/file/upload', form, axiosOptions))
      }
      // 所有分片上传后，请求合并分片文件
      await axios.all(axiosPromiseArray).then(() => {
        // 合并chunks
        const data = {
          size: file.size,
          name: file.name,
          total: chunks,
          fileHash: this.fileHash
        }
        axios.post('/file/merge_chunks', data).then(res => {
          console.log('上传成功');
          console.log(res.data, file)
        }).catch(err => {
          console.log(err)
        })
      })
    }
  },
  computed: {
    ...mapGetters(['analysisList'])
  }
}
</script>

<style lang="stylus" scoped>
.div
  overflow hidden
  div
    float left
    width 300px
    height 300px
    display inline-block
    margin-right: 9px
    border 1px solid #000
    li
      border 1px solid #cccccc
</style>
