<!--
 * @Author: kavinluo
 * @Date: 2023-03-09 09:04:59
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 12:03:27
 * @Description: 无
-->
<template>
  <el-popconfirm
    :width="width"
    :confirm-button-text="confirmButtonText"
    :cancel-button-text="cancelButtonText"
    :icon="InfoFilled"
    cancel-button-type="text"
    :icon-color="iconColor"
    :title="title"
    @confirm="onConfirm"
    @cancel="onCancel"
  >
    <template #reference>
      <el-button
        :type="buttonType"
        :size="buttonSize"
        :disabled="buttonDisabled"
        :loading="buttonLoading"
      >{{ buttonText }}
      </el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>
import { ref, toRefs, getCurrentInstance } from 'vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { valDataType } from '@/utils/util'
// export default {
  // name: 'MyPopconfirm',
  const { proxy } = getCurrentInstance()
  const $emit = defineEmits(['confirm','cancel'])
  const props = defineProps({
    width: {
      type: String,
      default: '220'
    },
    confirmButtonText: {
      type: String,
      default: '确定'
    },
    cancelButtonText: {
      type: String,
      default: '关闭'
    },
    iconColor: {
      type: String,
      default: '#626AEF'
    },
    title: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: 'primary'
    },
    buttonSize: {
      type: String,
      default: 'default'
    },
    buttonText: {
      type: String,
      default: '删除'
    },
    buttonIcon: {
      type: String,
      default: 'el-icon-delete'
    },
    buttonDisabled: {
      type: Boolean,
      default: false
    },
    buttonLoading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => ({})
    }
  })

  const options = ref(props.options)
  //  ajaxFn 为必传
  const { ajaxFn, params={}, key, type = {}} = toRefs(options.value)
  const onConfirm = () => {
    let ids = []
    let array = []
    if(params.value && valDataType(params.value, 'Array')) {
      if(!params.value.length) {
        proxy.$message.warning('请选择数据')
        return
      }
      for(let i = 0; i < params.value.length; i++ ) {
        array.push(params.value[i][key.value.id||'id'])
        ids = array.join(',')
      }
    } else if(params.value){
      ids = params.value.id
    }
    if (ajaxFn.value) {
      ajaxFn.value(params.value,ids).then(res => {
        if(type.value && type.value === 'blob') {
          downloadFile(res)
        }
        if (res.status.code == '0') {
          $emit('confirm')
        }
      })
    }
  }
  const onCancel =()=> {
    $emit('cancel')
  }
  let downloadFile = (res) => {
    const blob = res.data;
      const fileName =  res.headers['content-disposition'] && decodeURIComponent(res.headers[
        'content-disposition'].split(
        '=')[1]) || '暂无数据.xls';
      if ('download' in document.createElement('a')) { // 非IE下载
        const link = document.createElement('a');
        link.download = fileName;
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
      // modal.toChannelModal = false
      proxy.$message.success('导出成功！')
  }
  
</script>
<script>
 export default {
  name: 'myFirm',
 }
</script>