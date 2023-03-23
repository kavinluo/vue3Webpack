<!--
 * @Author: kavinluo
 * @Date: 2023-02-17 16:16:16
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-13 10:07:25
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
      <el-col :span="8">
        <el-form-item label="编号：" requireAsteriskPosition="'right'" prop="code">
          <el-input placeholder="请输入编号" v-model="ruleForm.code" clearable v-if="type !== 'view'" />
          <template v-else> {{  ruleForm.code }}</template>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="省：" prop="province">
          <el-select @change="provinceChange" v-model="ruleForm.province"  placeholder="请选择省份" v-if="type !== 'view'" clearable>
            <el-option v-for="option in addressList.provinceData" :key="option.name" :label="option.name"
                         :value="option.name"></el-option>
          </el-select>
          <template v-else>{{ ruleForm.province }}</template>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="市：" prop="city">
        <el-select v-if="type !== 'view'" v-model="ruleForm.city" placeholder="请选择市" clearable>
          <el-option v-for="option in cityData" :key="option.name" :label="option.name" :value="option.name"></el-option>
        </el-select>
        <template v-else>{{ ruleForm.city }}</template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="名称：" prop="name">
          <el-input v-model="ruleForm.name" clearable v-if="type !== 'view'" placeholder="请输入名称"/>
          <template v-else>{{ ruleForm.name }}</template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="地址：" prop="address">
          <el-input v-model="ruleForm.address" clearable v-if="type !== 'view'" placeholder="请输入地址"/>
          <template v-else>{{ ruleForm.address }}</template>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="联系人：" prop="contact">
          <el-input v-model="ruleForm.contact" clearable v-if="type !== 'view'" placeholder="请输入联系人"/>
          <template v-else>{{ ruleForm.contact }}</template>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="联系方式：" prop="contactMobile">
          <el-input v-model="ruleForm.contactMobile" clearable v-if="type !== 'view'" placeholder="请输入联系方式"/>
          <template v-else>{{ ruleForm.contactMobile }}</template>
        </el-form-item>
       </el-col>
      <el-col :span="12">
        <el-form-item label="邮编：" prop="postCode">
          <el-input v-model="ruleForm.postCode" clearable v-if="type !== 'view'" placeholder="请输入邮编"/>
          <template v-else>{{ ruleForm.postCode }}</template>
        </el-form-item>
       </el-col>
    </el-row>
    <el-row style='margin: 20px 0 -20px; justify-content: flex-end'>
      <!-- <el-form-item> -->
        <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">保存</el-button>
        <el-button @click="resetForm(ruleFormRef)" v-if="type !== 'view'">重置</el-button>
        <el-button type="warning" @click="$emit('cancel', false)" v-else>关闭</el-button>
    <!-- </el-form-item> -->
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import chinaAddress from '@util/china_address'
  import { createSchool } from '../rules.js'
  import { addSchool, modifySchool, getSchool } from '../api.js'
  import { useState } from '@/store/hooks'
  const rules = reactive(createSchool)
  const addressList = ref(chinaAddress)
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  const cityData = ref([])
  const cityObj = ref(chinaAddress.provinceAndcity)
  console.log('props', props, examTask)
  const formSize = ref('default')
  const addNum = ref(0)
  const ruleFormRef = ref()
  const ruleForm = reactive({
    taskId: examTask.value.id,
    parentId: 0,
    code: '',// 考点编号
    province: '',
    city: '',
    name: '', //考点名称
    address: '',
    contact: '', // 联系人
    contactMobile: '', // 联系人手机
    postCode: '', // 邮编
    type: 'SCHOOLS', // EXAM_PLACE（考场）,SCHOOLS（考点）
    hasSkill: 'N', // 是否有技能，Y（是），N（否）
    hasTheory: 'N', //是否有理论，Y（是），N（否）

  })
  if (props.type === 'edit' || props.type === 'view') {
    getSchool(props.rowData.id).then((res) => {
      for (let k in ruleForm) {
        ruleForm[k] = res.data[k]
      }
      cityData.value = cityObj.value[ruleForm.province]
    })
  }
  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate( async (valid, fields) => {
      if (valid) {
       let res = await (props.type === 'add' ? addSchool(ruleForm) : modifySchool(ruleForm, props.rowData.id))
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
  const provinceChange = (val) => {
      if (props.type === 'edit' && addNum.value > 0) {
        ruleForm.city = ''
      } else if (props.type === 'add') {
        ruleForm.city = ''
      }
      addNum.value++
      cityData.value = cityObj.value[val]
  }


</script>
<style lang="scss" scoped>

</style>