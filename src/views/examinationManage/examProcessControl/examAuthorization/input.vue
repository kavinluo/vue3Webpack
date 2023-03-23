<!-- eslint-disable no-prototype-builtins -->
<!--
 * @Author: kavinluo
 * @Date: 2023-03-21 11:41:46
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 14:59:46
 * @Description: 无
-->
<template>
  <el-form
    style="margin-right: 40px; position: reactive"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="type !== 'view' ? rules : {}"
    class="demo-ruleForm"
    :size="formSize"
    label-width="130"
    status-icon
  >
  <el-row>
    <el-col :span="12">
      <el-form-item label="考试规则：">
        <span>{{ ruleForm.paperName }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="场次：">
        <span >{{ ruleForm.scene }}</span>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <el-form-item label="考试模式：">
        <span>{{ ruleForm.examModel  }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="考试时间：">
        <span>{{ ruleForm.examTimeLength }}&nbsp;分钟</span>
      </el-form-item>
    </el-col>
    </el-row>
    <el-row>
    <el-col :span="12">
      <el-form-item label="授权开始时间：" prop="examTimeStart">
        <el-date-picker type="datetime"
        :default-time="new Date(2000, 1, 1, 8, 0, 0)"
        v-model="ruleForm.examTimeStart"
        clearable
        v-if="type === 'add'"
        placeholder="选择授权开始时间"/>
      <template v-else>{{ ruleForm.examTimeStart }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="12">
      <el-form-item label="授权结束时间：" prop="examTimeEnd">
        <el-date-picker type="datetime"
        v-model="ruleForm.examTimeEnd"
        clearable
        :default-time="new Date(2000, 1, 1, 17, 30, 0)"
        v-if="type === 'add'"
        placeholder="选择授权结束时间"/>
      <template v-else>{{ ruleForm.examTimeEnd }}</template>
      </el-form-item>
    </el-col>
  </el-row>
    <el-row style="margin:20px 0 -20px; justify-content: flex-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">提交</el-button>
      <el-button type="warning" @click="$emit('cancel', 'addModal')">关闭</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { stuInfo } from '../rules.js'
  import { authorizeExam, cancelAuthorize } from '../api.js'
  import { useState } from '@/store/hooks'
  import { formDate } from '@/utils/formatDate.js'
  const rules = reactive(stuInfo)
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  const formSize = ref('default')
  const ruleFormRef = ref()
  const ruleForm = reactive({
    taskId: examTask.value.id,
    examTimeEnd: '', // 授权结束时间
    examTimeStart: '', // 授权开始时间
    paperId: '', //  规则ID
    paperName: '',
    scene: '',
    examModel: '',
    examTimeLength: ''
  })

  const frm = reactive(props.rowData)
  console.log('frm', frm)
  for (let k in ruleForm) {
    if(Object.prototype.hasOwnProperty.call(frm, k)){
      ruleForm[k] = frm[k]
    }
  }

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        formDate(ruleForm,['examTimeEnd', 'examTimeStart'], 'yyyy-MM-dd HH:mm:ss')
       let res = await (props.type === 'add' ? authorizeExam(ruleForm) : cancelAuthorize(props.rowData.paperId ))
       if(res.status.code === '0') {
          $emit('cancel', 'addModal', true)
       }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

</script>
<style lang="scss" scoped>
.header-top{
    clear: both;
    height: 170px;
    width: 150px;
    position: absolute;
    right: 50px;
    top: 135px;
}
</style>