<!--
 * @Author: kavinluo
 * @Date: 2023-03-15 11:03:44
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 09:37:44
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
    <el-col :span="11">
      <el-form-item label="规则名称："  prop="paperName">
        <el-input v-model.number="ruleForm.paperName"
        clearable v-if="type !== 'view'" placeholder="输入规则名称" />
        <span v-else>{{ ruleForm.paperName }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="7">
      <el-form-item label="考试模式："  prop="examModel">
        <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.examModel" placeholder="选择考试模式">
          <el-option value="任意时间开考" label="任意时间开考"></el-option>
          <el-option value="统一开考/结束" label="统一开考/结束"></el-option>
        </el-select>
        <span v-else>{{ ruleForm.examModel }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="专业编码：" prop="categoryCode">
        <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.categoryCode" placeholder="选择专业编码">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
        <span v-else>{{ ruleForm.categoryCode }}</span>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="场次允许开考时间：" prop="allowExamTimeLength" label-width="150px">
        <template v-if="type !== 'view'">
          <el-input v-model.number="ruleForm.allowExamTimeLength" style="width: 160px"
          clearable v-if="type !== 'view'" placeholder="场次允许开考时间" />&nbsp;分钟
        </template>
        <span v-else>{{ ruleForm.allowExamTimeLength }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="计时方式："
          prop="recordType">
          <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.recordType" placeholder="选择计时方式">
          <el-option value="令牌" label="令牌"></el-option>
          <el-option value="无" label="无"></el-option>
        </el-select>
      <template v-else>{{ ruleForm.recordType }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="类型："
          prop="examType">
          <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.examType" placeholder="选择类型">
          <el-option value="笔试" label="笔试"></el-option>
          <el-option value="无" label="无"></el-option>
        </el-select>
      <template v-else>{{ ruleForm.examType }}</template>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="考试时长：" label-width="150px" prop="examTimeLength">
          <template v-if="type !== 'view'" >
            <el-input v-model.number="ruleForm.examTimeLength" clearable placeholder="输入考试时长" style="width: 160px"/>&nbsp;分钟
          </template>
        <template v-else>{{ ruleForm.examTimeLength }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="考生提前登录时间：" label-width="150px" prop="ksPreLoginTimeLength">
          <template v-if="type !== 'view'" >
            <el-input v-model.number="ruleForm.ksPreLoginTimeLength" clearable placeholder="输入考生提前登录时间" style="width: 160px"/>&nbsp;分钟
          </template>
      <template v-else>{{ ruleForm.ksPreLoginTimeLength }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="6">
      <el-form-item label="分段控制：" prop="showTmType">
        <template  v-if="type !== 'view'">
          <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.showTmType" placeholder="选择分段控制">
              <el-option value="不控制" label="不控制"></el-option>
              <el-option value="按题型分段" label="按题型分段"></el-option>
              <el-option value="按试题控制" label="按试题控制"></el-option>
              <el-option value="自定义" label="自定义"></el-option>
          </el-select>
      </template>
      <template v-else>{{ ruleForm.showTmType }}</template>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
  <el-col :span="9">
    <el-form-item label="考生缺考认定时间：" prop="missExamTimeLength" label-width="150px">
      <template v-if="type !== 'view'">
        <el-input v-model.number="ruleForm.missExamTimeLength" style="width: 160px" clearable v-if="type !== 'view'" placeholder="输入考生缺考认定时间"/>&nbsp;分钟
      </template>
      <template v-else>{{ ruleForm.missExamTimeLength }}</template>
    </el-form-item>
  </el-col>
  <el-col :span="9">
    <el-form-item label="自动延时时长：" prop="autoDelayedTimeLength" label-width="150px">
      <template v-if="type !== 'view'">
        <el-input v-model.number="ruleForm.autoDelayedTimeLength" style="width: 160px" clearable v-if="type !== 'view'" placeholder="输入考生缺考认定时间"/>&nbsp;分钟
      </template>
      <template v-else>{{ ruleForm.autoDelayedTimeLength }}</template>
    </el-form-item>
  </el-col>
  <el-col :span="6">
      <el-form-item label="分页题数：" prop="everyPageTmNum">
      <template v-if="type !== 'view'">
        <el-input v-model.number="ruleForm.everyPageTmNum" clearable v-if="type !== 'view'" placeholder="输入分页题数"
          />
      </template>
      <template v-else>{{ ruleForm.everyPageTmNum }}</template>
    </el-form-item>
    </el-col>
</el-row>
  <el-row>
    <el-col>
      <el-form-item label="" label-width="150px">
        <el-checkbox :disabled="type === 'view'" v-model="ruleForm.tmDisOrder" :true-label="1" :false-label="0">试题乱序</el-checkbox>
        <el-checkbox :disabled="type === 'view'" v-model="ruleForm.tmOptionsDisOrder" :true-label="1" :false-label="0">选项乱序</el-checkbox>
        <el-checkbox :disabled="type === 'view'" v-model="ruleForm.showExamMark" :true-label="1" :false-label="0">现场出分</el-checkbox>
        <el-checkbox :disabled="type === 'view'" v-model="ruleForm.examPlace" :true-label="1" :false-label="0">考点查看成绩</el-checkbox>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col> 
      <el-form-item label="考生须知：" prop="examineeNote" label-width="150px">
        <tinymce v-if="type !== 'view'" v-model="ruleForm.examineeNote" width="100%" height="300" :menubar="false"  />
        <div v-else v-html="ruleForm.examineeNote"></div>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col> 
      <el-form-item label="考试规则：" prop="examRule" label-width="150px">
        <tinymce v-if="type !== 'view'" v-model="ruleForm.examRule" height="300" width="100%" :menubar="false" />
        <div v-else v-html="ruleForm.examRule"></div>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col> 
      <el-form-item label="考生承诺：" prop="examineeCommitment" label-width="150px" width="100%">
        <tinymce v-if="type !== 'view'" v-model="ruleForm.examineeCommitment" height="300"  width="100%" :menubar="false" />
        <div v-else v-html="ruleForm.examineeCommitment"></div>
      </el-form-item>
    </el-col>
  </el-row>
  <div></div>

    <el-row style="margin:20px 0 -20px; justify-content: flex-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">导入</el-button>
      <el-button type="warning" @click="$emit('cancel', 'addModal')">关闭</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref, getCurrentInstance } from 'vue'
  import { stuInfo } from './rules.js'
  import { modify, getExamTheoryRule, add } from './api.js'
  import { useState } from '@/store/hooks'
  // import { useStore } from '@/store'
  const { proxy } = getCurrentInstance()
  const rules = reactive(stuInfo)
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  // const $store = useStore()
  const formSize = ref('default')
  // const isGetSuccess = ref(true)
  // const addNum = ref(0)
  const ruleFormRef = ref()
  const ruleForm = reactive({
    taskId: examTask.value.id,
    paperName: '', // 规则名称
    examModel: '', // 考试模式
    recordType: '', //  计时方式
    examType: '', // 类型
    missExamTimeLength: '', // 考生缺考认定时间
    autoDelayedTimeLength: '', // 自动延时时长
    showTmType: '', // 分段控制
    everyPageTmNum: '', // 分页题数
    tmDisOrder: '', // 试题乱序，1（是），0（否）
    tmOptionsDisOrder: '', // 试题选项乱序，1（是），0（否）
    showExamMark: '', // 现场打分，1（是）,0（否）
    examineeNote: '', // 考生须知
    examRule: '', // 考试规则
    ksPreLoginTimeLength: '', //考生提前登陆时间
    examineeCommitment: '', // 考生承诺
    categoryCode: '', // 专业编码
    examTimeLength: '', // 考生提前登陆时间
    allowExamTimeLength: '', // 场次允许开考时间
    examPlace: '', // 考点查看成绩
  })
  console.log('examTask', examTask.value)
  if (props.type === 'edit' || props.type === 'view') {
    getExamTheoryRule(props.rowData.paperId).then((res) => {
      for (let k in ruleForm) {
        ruleForm[k] = res.data[k]
      }
    })
  }
  // const setUploadHeaderSuccessUrl = (resData) => {
  //   ruleForm.headPhoto = resData;
  //   imgSrc.value = $store.state.envs.networkHttp + resData;
  // }
  // const getSchoolsName = async () => {
  //   const { data } = await getByCode({taskId: examTask.value.id, code: ruleForm.schoolsCode })
  //   if (data) {
  //     ruleForm.schoolsName = data.name
  //   } else {
  //     proxy.$message.warning('请检查考点编号是否正确！')
  //   }
  // }

  // const getSceneTime = async () => {
  //   const { data } = await getBySort({taskId: examTask.value.id, sort: ruleForm.scene })
  //   if (data) {
  //     ruleForm.examTime = data.startTime
  //   } else {
  //     proxy.$message.warning('请检查场次是否正确！')
  //   }
  // }

  // const getSchoolName = async () => {
  //   const { data } = await getByExamPlaceArrange({taskId: examTask.value.id, code: ruleForm.schoolCode })
  //   if (data) {
  //     ruleForm.schoolName = data.examRoomName
  //   } else {
  //     proxy.$message.warning('请检查考场编号是否正确！')
  //   }
  // }

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('props.type', props.type)
       let res = await (props.type ==='add' ? add(ruleForm) : modify(ruleForm, props.rowData.paperId ))
       if(res.status.code === '0') {
          $emit('cancel', 'addModal', true)
       } else{
         proxy.$message.warning(res.status.msg)
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