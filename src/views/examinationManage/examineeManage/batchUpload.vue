<!-- eslint-disable no-unused-vars -->
<!--
 * @Author: kavinluo
 * @Date: 2023-03-17 09:31:00
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 11:20:51
 * @Description: 批量上传头像
-->
<template>
  <div style="margin-left: 20px">
    <el-upload
    ref="uploadRef"
    class="upload-demo"
    action=""
    :auto-upload="false"
    :http-request="httpRequest"
    :multiple="multiple"
    :on-change="beforeUpload"
    :before-remove="beforeRemove"
    :file-list="fileList"
    accept=".jpg,.png,.gif,.jpeg"
  >
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>&nbsp;&nbsp;
    <el-button class="ml-3" type="success" @click="submitUpload">上传</el-button>
    <template #tip>
      <div class="el-upload__tip" style="margin-top:15px">
        请上传1寸照片，格式JPG/PNG，像素大小295*413
      </div>
    </template>
  </el-upload>
  </div>
</template>

<script setup>
  import { ref, getCurrentInstance } from 'vue'
  // import { getCookie } from '@/utils/util'
  import { uploadPhoto } from './api'
  const { proxy } = getCurrentInstance()
  const uploadRef = ref()
  // const $emit = defineEmits(['uploadEnd'])
  // const fileData = ref({
  //   fileName: ''
  // })
  // const accept = ref('jpg,jpeg,png')
  const multiple = ref(true)
  const restLength = ref(0)
  // const fileSize = ref(4096)
  // const unAccept = ref(false)
  const allLength = ref(0)
  const listLength = ref(0)
  const fileList = ref([])
  // const maxLength = ref(0)
  const submitUpload = () => {
    if(allLength.value === 0) {
      proxy.$message.warning('请选择文件！');
    }
    uploadRef.value.submit()
  }
  const httpRequest = async (file)=> {
    const formData = new FormData();
    formData.append('file',file.file);
    formData.append('fileName', file.file.name)
    const res = await uploadPhoto(formData);
    uploadEnd(res, file)
  }
  //上传结束
  // eslint-disable-next-line no-unused-vars
  let uploadEnd = (res, file) => {
      if (res.status.code === '0') {
        restLength.value ++
        console.log('成功的', file, fileList.value)
        fileList.value = fileList.value.filter(te =>{
         return te.name !== file.file.name
        })
      } else {
        proxy.$message.warning('上传失败，' + res.status.msg);
        restLength.value --
      }
      if (restLength.value === allLength.value) {
        proxy.$message.success('上传成功！')
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
      // 文件大小超出默认则提示
      // if (!unSize.value) {
      //   let isBeyond = (+fileSize.value) * 1024 > file.size;
      //   if (!isBeyond) {
      //     proxy.$message.warning({
      //       title: '超出文件大小限制',
      //       desc: ` 文件  ${file.name}  太大，不能超过 ${formatUploadSize(this.fileSize) }。`
      //     });
      //     return false;
      //   }
      // }
      // //判断类型
      // if (!unAccept.value) {
      //   let type = file.name.split('.');
      //   console.log('type', type)
      //   type = (type[type.length - 1] + '').toLowerCase();
      //   let accepts = accept.value || 'doc|docx|xls|xlsx|ppt|pptx|pdf|zip|png|jpg|jpeg|bmp|gif';
      //   if (!(~accepts.indexOf(type))) {
      //     proxy.$message.warning({
      //       title: `文件格式不正确,只能传${accepts}格式文件`,
      //     });
      //     return false;
      //   }
      // }
      listLength.value++
      allLength.value++
    }


  // 点击文件列表中已上传的文件时的钩子
  // const onPreview = () => {

  // }
  // let formatUploadSize  = (value) => {
  //       let temp
  //       let init
  //       console.log(value)

  //       if (!value) return '0KB'
  //       if (value < 1024) {
  //         return value + 'kB'
  //       } else if (value < (1024 * 1024)) {
  //         temp = value / 1024
  //         temp = temp.toFixed(2)
  //         return temp + 'MB'
  //       } else if (value < (1024 * 1024 * 1024)) {
  //         init = (value / (1024 * 1024))
  //         //float = (value % (1024*1024))/1024;
  //         return init.toFixed(2) + 'GB ' //+float.toFixed(2)+'KB';
  //       }
  //   }
</script>

<style lang="scss" scoped>

</style>