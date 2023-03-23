<!--
 * @Author: kavinluo
 * @Date: 2023-02-17 16:16:16
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-20 16:42:23
 * @Description: 无
-->
<template>
 <el-form
    style="margin-right: 40px;"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    class="demo-ruleForm"
    :size="formSize"
    label-width="100"
    status-icon
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="用 户 名：" prop="account">
          <el-input v-model="ruleForm.account" clearable v-if="type !== 'view'" placeholder="请输入用户名" />
          <template v-else> {{  ruleForm.account }}</template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="角色：">
            <span>考点管理员</span>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="考点名称：" prop="schoolId">
              <el-select filterable style="width: 100%" v-if="type !== 'view'" v-model="ruleForm.schoolId" placeholder="请选择考点名称">
                <el-option
                  v-for="item in examinationSiteData"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <span v-else>{{ ruleForm.schoolName }}</span>
            </el-form-item>
        </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="联系人：" prop="name">
          <el-input v-model="ruleForm.name" clearable v-if="type !== 'view'" placeholder="请输入联系人"/>
          <template v-else>{{ ruleForm.name }}</template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="部门：" prop="department">
          <el-input v-model="ruleForm.department" clearable v-if="type !== 'view'" placeholder="请输入部门"/>
          <template v-else>{{ ruleForm.department }}</template>
        </el-form-item>
       </el-col>
      
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="职务：" prop="post">
          <el-input placeholder="请输入职务" v-model="ruleForm.post" clearable v-if="type !== 'view'"/>
          <template v-else>{{ ruleForm.post }}</template>
        </el-form-item>
       </el-col>
      <el-col :span="12">
        <el-form-item label="手机：" prop="mobile">
          <el-input v-model="ruleForm.mobile" clearable v-if="type !== 'view'" placeholder="请输入手机号"/>
          <template v-else>{{ ruleForm.mobile }}</template>
        </el-form-item>
      </el-col>

    </el-row>
    <el-row style='margin:20px 0 -20px; justify-content: flex-end'>
        <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">保存</el-button>
        <el-button @click="resetForm(ruleFormRef)" v-if="type !== 'view'">重置</el-button>
        <el-button type="warning" @click="$emit('cancel', false)" v-else>关闭</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { createUser } from '../rules.js'
  import { addExamUser, modifyExamUser, getList, getExamUser } from '../api.js'
  import { useState } from '@/store/hooks'
  const rules = reactive(createUser)
  const examinationSiteData = ref([])
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  console.log('props', props, examTask)
  const formSize = ref('default')
  const ruleFormRef = ref()
  const ruleForm = reactive({
    taskId: examTask.value.id,
    name: '',
    account: '',
    schoolId: '',
    department: '',
    post: '',
    mobile: '',
    schoolName: '',
    userType: 'SCHOOL'
  })
   // 获取所有考场
  const getAllExamList = async () => {
    const res = await getList({curPage: 1,pageSize: 9999, taskId: examTask.value.id, type:'SCHOOLS'})
    examinationSiteData.value = res.data
  }
  // let init = () => {
   getAllExamList()
   if (props.type === 'edit' || props.type === 'view') {
     getExamUser(props.rowData.id).then((res) => {
       console.log('res', res)
       for (let k in ruleForm) {
         ruleForm[k] = res.data[k]
       }
     })
   }
//  }
  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate( async (valid, fields) => {
      if (valid) {
       let res = await (props.type === 'add' ? addExamUser(ruleForm) : modifyExamUser(ruleForm, props.rowData.id))
       if(res.status.code === '0') {
        $emit('cancel', 'add')
       }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

  const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
  }


</script>
<style lang="scss" scoped>

</style>