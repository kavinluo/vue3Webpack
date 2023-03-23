<!--
 * @Author: kavinluo
 * @Date: 2023-03-09 14:16:47
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-10 14:11:23
 * @Description: 无
-->
<!--
 * @Author: kavinluo
 * @Date: 2023-02-04 14:23:27
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-02-27 15:49:11
 * @Description: 无
-->
<template>
  <div>
    <el-button type="primary" @click="svaHandle" v-if="inputType === 'edit'">保存</el-button>
    <el-button type="warning" @click="editHandle" v-else>修改</el-button>
    <myFirm :key="new Date().getTime()" :options="{ajaxFn: enable, params:{id:examTask.id, enable: examTask.enable ? '0' : 1 }}"
             :title="'您确定要'+ (examTask.enable ? '停用' : '启用')+'吗?'" @confirm="handleConfirm"
             :buttonType="examTask.enable ? 'danger' : 'success'"
             :buttonText="examTask.enable ? '停用' : '启用'"
             ></myFirm>
             <el-button type="warning" @click="inputType = 'view'" v-if="inputType === 'edit'">取消</el-button>
  </div>
  <br>
  <br>
  <el-form :model="ruleForm" label-width="120px" :rules="rules" :inline="false" style="width: 500px;">
    <el-form-item label="当前状态：">
      {{ ruleForm.enable ? '启用' : '停用' }}
    </el-form-item>
    <el-form-item label="开放时间：" prop="time">
      <el-date-picker
        v-if="inputType === 'edit'"
        v-model="ruleForm.time"
        unlink-panels
        type="datetimerange"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        range-separator="~"
      />
      <template v-else>
        {{ ruleForm.startTime }} ~ {{ ruleForm.endTime }}
      </template>
    </el-form-item>
    <el-form-item label="包含专业代码：">
        {{ ruleForm.categoryCode }}
    </el-form-item>
    <template v-if="inputType === 'edit'">
      <el-form-item label="场次及时间：">
        <el-button type="primary" :icon="Plus" @click="handlePlus"></el-button>
      </el-form-item>
      <el-form-item  class="input-line" label-width="100px" :label="'场次'+ (item.sort) + ':'" v-for="(item,index) in ruleForm.examPlanSceneDtoList" :key="index">
        <el-date-picker
          style="width: 210px;"
          v-model="item.startTime"
          type="datetime"
          placeholder="请选择时间"
        />&nbsp;<el-button type="primary" :icon="Minus" @click="handleMinus(index)"></el-button>
      </el-form-item>
    </template>
    <template v-else>
      <el-form-item label="场次及时间：" style="margin-bottom: 10px">
      </el-form-item>
      <dl style="margin-left: 53px;line-height: 2;">
        <dd :key="item.sort" v-for="(item) in ruleForm.examPlanSceneDtoList">
          {{ item.sceneName}}：{{  item.startTime }}
        </dd>
      </dl>
    </template>
  </el-form>

</template>

<script setup>
  import { Plus, Minus } from '@element-plus/icons-vue'
  import { reactive, ref, getCurrentInstance } from 'vue'
  import { getExam, enable, modifyExamPlan } from './api';
  import { useStore } from '@/store'
  import { formDate } from '@/utils/formatDate.js'

  import { useState } from '@store/hooks/index'
  const { proxy } = getCurrentInstance()
  const $store = useStore()
  const { examTask } = useState(['examTask'], 'examPlan')
  const inputType = ref('view')
  const count = ref(0) // 场次计数
  const ruleForm = reactive({
    enable: 0,
    categoryCode: 'AH；BH',
    startTime: '',
    endTime: '',
    time: [],
    examPlanSceneDtoList: []
  })

  const handleConfirm = () => {
    getData()
  }

  // 修改保存
  const svaHandle = () => {
    if(!formatTime()) return
    ruleForm.id = examTask.value.id
    modifyExamPlan(ruleForm).then(res => {
      if(res.data) {
        inputType.value = 'view'
        getData()
      }
    })
  }
  const formatTime = () => {
    let flag = true
    if(!ruleForm.time || !ruleForm.startTime) {
      proxy.$message.warning('请选择开放时间！')
      flag = false
      return flag
    }
    ruleForm.startTime = ruleForm.time[0]
    ruleForm.endTime = ruleForm.time[1]
    for (let index = 0; index < ruleForm.examPlanSceneDtoList.length; index++) {
      const element = ruleForm.examPlanSceneDtoList[index];
      if (!element.startTime) {
        proxy.$message.warning(`场次${index+1}时间不能为空！`)
        flag = false
        return flag
      }
    }
    formDate(ruleForm,['startTime', 'endTime'], 'yyyy-MM-dd HH:mm:ss')
    formDate(ruleForm.examPlanSceneDtoList,['startTime'], 'yyyy-MM-dd HH:mm:ss')
    return flag
  }

  const editHandle = () => {
    inputType.value = 'edit'
  }

  // 获取内容
  const getData = async () => {
    const { data } = await getExam(examTask.value.id)
    ruleForm.enable = data.enable
    ruleForm.examPlanSceneDtoList = data.examPlanDto.examPlanSceneDtoList
    ruleForm.time = [data.examPlanDto.startTime, data.examPlanDto.endTime]
    ruleForm.startTime = data.examPlanDto.startTime
    ruleForm.endTime = data.examPlanDto.endTime
    ruleForm.categoryCode = data.ruleForm
    if(data.examPlanDto.examPlanSceneDtoList.length) {
      count.value = data.examPlanDto.examPlanSceneDtoList.length
    }
    // 存储当前选取的考试
    $store.dispatch('examPlan/actionsCurrExam', data)
  }
  getData()

  const handlePlus = () =>{
    count.value++
    ruleForm.examPlanSceneDtoList.push({
      sceneName:'场次'+ count.value,
      startTime: '',
      sceneType: 'THEORY',
      sort: count.value
    })
  }
  const handleMinus = (index) => {
    ruleForm.examPlanSceneDtoList.splice(index,1)
  }
  const rules = reactive({
    time: [
    { required: true, message: '请选择开放时间', trigger: 'blur' },
    ],
  })
</script> 

<style lang="scss">
.input-line {
  .el-input {
    flex: initial;
    width: 180px;
  }
}
</style>