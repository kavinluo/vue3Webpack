<!--
 * @Author: kavinluo
 * @Date: 2023-02-17 16:16:16
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-14 14:20:02
 * @Description: 无
-->
<template>
 <el-form
    style="margin-right: 40px;"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="type !== 'view' ? rules : {}"
    class="demo-ruleForm"
    :size="formSize"
    label-width="100"
    status-icon
  >
    <el-row>
      <el-col :span="22">
        <el-form-item label="考点名称："  prop="schoolId">
          <el-select filterable style="width: 100%" v-if="type !== 'view'" 
            v-model="ruleForm.schoolId" placeholder="请选择考点名称">
            <el-option
              v-for="item in examinationSiteData"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <span v-else>{{ ruleForm.schoolsName }}</span>
        </el-form-item>
      </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
        <el-form-item label="考场数量：" prop="groupNum_" :rules="type !== 'view' ?[{
              required: true,
              message: '考场数量必须是数字,且不能大于100',
              trigger: 'blur',
              min: 0, max: 100,
              type: 'number',
            }]:{}">
          <el-input v-model.number="ruleForm.groupNum_"
          clearable v-if="type !== 'view'" placeholder="请输入考点数量" @blur="blurHandel" />
          <template v-else>{{ ruleForm.groupNum }}</template>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="考场信息："></el-form-item>
        </el-col>
      </el-row>
      <el-row v-for="(item, index) in ruleForm.examTheoryRoomDtoList" :key="index">
        <el-col :span="10">
          <el-form-item :label="'编号'+ (index+1) + '：'+'名称:'"
             :prop="'examTheoryRoomDtoList.' + index + '.examRoomName'"
              :rules="type !== 'view' ?{
              required: true,
              message: '编号名称不能为空',
              trigger: 'blur',
            }: {}" label-width="120px">
            <el-input v-model="item.examRoomName" clearable v-if="type !== 'view'" placeholder="请输入名称"
             />
          <template v-else>{{ item.examRoomName }}</template>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="坐席数："
            :prop="'examTheoryRoomDtoList.' + index + '.seatNum'"
            :rules="type !== 'view' ? {
              required: true,
              message: '坐席数不能为空',
              trigger: 'blur',
            } : {}">
          <el-input v-model.number="item.seatNum" clearable v-if="type !== 'view'" placeholder="请输入坐席数"/>
          <template v-else>{{ item.seatNum }}</template>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="备用机："
          :prop="'examTheoryRoomDtoList.' + index + '.backupNum'"
            :rules="type !== 'view' ? {
              required: true,
              message: '备用机数不能为空',
              trigger: 'blur',
            }: {}">
          <el-input v-model.number="item.backupNum" clearable v-if="type !== 'view'" placeholder="请输入备用机"/>
          <template v-else>{{ item.backupNum }}</template>
          </el-form-item>
        </el-col>
      </el-row>

    <el-row style="margin:20px 0 -20px; justify-content: flex-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">保存</el-button>
      <!-- <el-button @click="resetForm(ruleFormRef)" v-if="type !== 'view'">重置</el-button> -->
      <el-button type="warning" @click="$emit('cancel', false)" v-else>关闭</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { arrange } from '../rules.js'
  import { addOrModifyPlaceArrange, getOrModifyPlaceArrange, getList } from '../api.js'
  import { useState } from '@/store/hooks'
  const rules = reactive(arrange)
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  const examinationSiteData = ref([])
  const formSize = ref('default')
  // const addNum = ref(0)
  const ruleFormRef = ref()
  const ruleForm = reactive({
    schoolsName: '',
    schoolId: '',
    groupNum_: 0, // 验证
    groupNum: 0, // 考场数量
    examMode: '', // 考试形式
    examTheoryRoomDtoList: []
  })
  // 获取所有考场   
  const getAllExamList = async () => {
    const res = await getList({curPage: 1,pageSize: 9999, taskId: examTask.value.id, type:'EXAM_PLACE'})
    examinationSiteData.value = res.data
  }
  getAllExamList()
  if (props.type === 'edit' || props.type === 'view') {
    getOrModifyPlaceArrange(props.rowData.schoolsId).then((res) => {
      for (let k in ruleForm) {
        ruleForm[k] = res.data[k]
      }
      ruleForm.schoolId = res.data.schoolsId
      ruleForm.groupNum_ = res.data.groupNum
      console.log('ruleForm', ruleForm)
    })
  }

  const blurHandel = () => {
    const val = ruleForm.groupNum_  //
    if(val === '' || val > 100) return
    if(val >= ruleForm.groupNum) {
      for (let index = ruleForm.groupNum; index < val; index++) {
        ruleForm.examTheoryRoomDtoList[index] = {
          code: index, // 编号
          examRoomName: '', //考室名称
          seatNum: '', // 坐席数
          backupNum: '' // 备用机
        }
      }
    } else if(val < ruleForm.groupNum) {
      ruleForm.examTheoryRoomDtoList.splice(val, ruleForm.groupNum - val)
    } else if(val >= 0) {
      ruleForm.examTheoryRoomDtoList = []
      for (let index = 0; index < ruleForm.groupNum; index++) {
        ruleForm.examTheoryRoomDtoList[index] = {
          code: index, // 编号
          examRoomName: '',//考室名称
          seatNum: '', // 坐席数
          backupNum: '' // 备用机
        }
      }
    } 
    ruleForm.groupNum = ruleForm.groupNum_
  }

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate( async (valid, fields) => {
      if (valid) {
        ruleForm.examTheoryRoomDtoList.forEach((item, c) => {
          item.code = ++c // 修改和添加 重置 code
        })
       let res = await addOrModifyPlaceArrange(ruleForm, props.type)
       if(res.status.code === '0') {
        $emit('cancel', 'add')
       }
      } else {
        console.log('error submit!', fields)
      }
    })
  }

</script>
<style lang="scss" scoped>

</style>