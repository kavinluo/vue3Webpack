<template>
  <div class="upload-container">
    <el-button 
      :style="{background:color,borderColor:color}" 
      :disabled="disabled === 1" size="small" type="primary" 
      @click="dialogVisible=true">上传</el-button>
    <kv-dialog v-model="dialogVisible" :width="500" @cancel="cancel" :headerTitle="{title: '上传'}">
      <el-upload
        :multiple="true"
        accept="image/png, image/jpeg, image/gif"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :headers="headers"
        class="editor-slide-upload"
        action="/api/passport/pc/file/upload/headImg"
        list-type="picture-card"

      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
      <el-button @click="cancel">关闭</el-button>
    </kv-dialog>

  </div>
</template>

<script>
import { getCookie } from '@/utils/util'
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    readonly: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogVisible: false,
      disabled: 0,
      listObj: {},
      fileList: [],
      dialogVisibleId: {
          id: 'selectUserId',
          title: '上传'
      },
      headers: {}
    }
  },
  watch: {
    readonly(val) {
      this.disabled = val
      console.log(this.disabled, 'jj')
    }
  },
  mounted() {
    this.disabled = this.readonly
    this.headers = {
        'Token': getCookie('Token')
      };
      console.log('this.$store', this.$store)
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!')
        return
      }
      this.$emit('successCBK', arr)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    },
    handleSuccess(response, file) {
      console.log(response, file)
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.data //+ response.relativePathFile
          console.log(this.listObj[objKeyArr[i]].url)
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('图片大小不能超过5MB!');
          return isLt5M
      }
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
        }
        resolve(true)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
}
// .editor-slide-upload ::v-deep .el-upload--picture-card {
//     width: 100%;
//   }
</style>
