<!--
 * @Author: kavinluo
 * @Date: 2023-03-16 16:16:08
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-17 09:55:53
 * @Description: 无
-->
<template>
  <el-dialog
    :close-on-click-modal="closeOnclickModal"
    v-model="dialog"
    :width="width"
    @close="cancel"
    :before-close="handleClose"
  >
  <template #header>
    <modal-header :content="headerTitle"></modal-header>
  </template>
  <slot></slot>
  <template #footer v-if="isFooter">
  </template>
  </el-dialog>
</template>

<script setup>
  import { ref } from 'vue'
  const $emit = defineEmits(['cancel'])
 const props = defineProps({
    headerTitle: {
      type: Object,
      default: () => ({title: '标题'})
    },
    width: {
      type: Number,
      default: 600
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isFooter: {
      type: Boolean,
      default: true
    },
    closeOnclickModal: {
      type: Boolean,
      default: false
    }
  })
  const dialog = ref(props.dialogVisible)

  // const dialogVisible = ref(false)
  // if(toDialog.value) {
  //   dialogVisible.value =toDialog
  // }
  const handleClose = () => {
    dialog.value = false
    $emit('cancel')
  }
  const cancel = ()=> {
    $emit('cancel')
  }
</script>
<script>
  export default {
    name: 'KvDialog'
  }
</script>