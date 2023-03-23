<!--
 * @Author: kavinluo
 * @Date: 2023-02-09 13:22:30
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 15:57:44
 * @Description: 无 
-->
<template>
  <div style="padding: 15px" v-if="inputType === 'add'">
    <el-button type="primary" 
    style="line-height:inherit; display: block;font-size:18px; width: 100%;padding: 13px 0 8px; height: inherit;" size="large" @click="handleCreate">
      <el-icon :size="25">
        <Plus />
      </el-icon>&nbsp;创建考试</el-button>
    <el-menu :router="true" :default-active="$route.name">
      <el-menu-item :index="'examinationManage'" :route="{ name: 'examinationManage' }">
        <el-icon><icon-menu /></el-icon>
        <span>全部考试</span>
      </el-menu-item>
      <el-menu-item :index="'trash'" :route="{ name: 'trash' }">
        <el-icon>
          <DeleteFilled />
        </el-icon>
        <span>回收站</span>
      </el-menu-item>
    </el-menu>
  </div>
  <!-- 创建考试 -->
  <el-dialog height="200" cancel-text="" v-model="createModal" :width="500">
    <template #header>
      <modal-header :content="{ title: inputType === 'add' ? '创建考试' : '编辑考试名称' }"></modal-header>
    </template>
    <div v-if="createModal">
      <el-form :model="ruleForm" ref="ruleFormRef" :rules="rules">
        <el-form-item prop="taskName" label="考试名称：">
          <el-input v-model="ruleForm.taskName" clearable size="large" placeholder="请输入考试名称"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handelSave(ruleFormRef)">保存</el-button>
        <el-button @click="createModal = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { useStore } from '@/store';
  import { addExam, modifyExam } from './api.js'
   const props = defineProps({
    inputType: {
      type: String,
      default: 'add'
    }
  })
  const rules = reactive({
    taskName: [
    { required: true, message: '请输入考试名称', trigger: 'blur' },
    ],
  })
  const createModal = ref(false)
  const ruleFormRef = ref()
  const $store = useStore()
  const ruleForm = ref({
    taskName: '',
  })

  const handleCreate = (res) => {
    createModal.value = true
    if (res) {
      ruleForm.value.taskName = res.taskName
      ruleForm.value.id = res.id
    }
  }

  const handelSave =  (formEl) => {
    formEl?.validate(async (valid) => {
      if (valid) {
        const data = Object.assign({}, ruleForm.value)
        if (props.inputType === 'add') {
          await addExam(data)
        } else {
          await modifyExam(data)
        }
        createModal.value = false
        $store.dispatch('examPlan/actionsCreateExam', !$store.state.examPlan.listenCreateExam)
        ruleForm.value.taskName = ''
      } else {
        console.log('error submit!')
        return false
    }
  })
  }

defineExpose({
  handleCreate
})
</script>

<style lang="scss" scoped>

</style>