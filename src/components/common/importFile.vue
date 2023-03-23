<!-- eslint-disable no-unused-vars -->
<!--
 * @Author: kavinluo
 * @Date: 2023-03-17 09:31:00
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 10:35:23
 * @Description: file文件导入
-->
<template>
  <div style="margin-left: 20px">
    <el-upload
    ref="uploadRef"
    class="upload-demo"
    action=""
    :auto-upload="autoUpload"
    :http-request="httpRequest"
    :multiple="multiple"
    :on-change="beforeUpload"
    :before-remove="beforeRemove"
    :file-list="fileList"
    :accept="accept"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>&nbsp;&nbsp;
    <template #tip>
      <div class="el-upload__tip" style="margin-top:15px">
        {{ tip }}
      </div>
    </template>
  </el-upload>
  </div>
</template>

<script setup>
  import { ref, getCurrentInstance } from 'vue'
  const props = defineProps({
    ajaxFn: {
      type: Function,
      default: () => ({})
    },
    tip: {
      type: String,
      default: '请选择要导入的文件。'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    autoUpload: {
      type: Boolean,
      default: true,
    },
    accept: {
      type: String,
      default: '*'
    }
  })
  const $emit = defineEmits(['cancel'])
  const { proxy } = getCurrentInstance()
  const uploadRef = ref()
  const restLength = ref(0)
  const allLength = ref(0)
  const listLength = ref(0)
  const fileList = ref([])

  const httpRequest = async (file)=> {
    const formData = new FormData();
    formData.append('file',file.file);
    if(props.ajaxFn) {
      const res = await props.ajaxFn(formData);
      uploadEnd(res, file)
    }
  }
  //上传结束
  // eslint-disable-next-line no-unused-vars
  let uploadEnd = (res, file) => {
      if (res.status.code === '0') {
        restLength.value ++
        fileList.value = fileList.value.filter(te =>{
         return te.name !== file.file.name
        })
      } else {
        proxy.$message.warning('导入失败，' + res.status.msg);
        restLength.value --
      }
      if (restLength.value === allLength.value) {
        proxy.$message.success('导入成功！')
        $emit('cancel')
      }
    restLength.value = 0
    restLength.value =0
  }

  const beforeRemove = (UploadFile) => {
    console.log('UploadFile', UploadFile)
  }

  //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
  const beforeUpload = (file,fileLists) => {
    console.log('change', file,fileLists)
    fileList.value = fileLists
      listLength.value++
      allLength.value++
    }

</script>

<style lang="scss" scoped>

</style>