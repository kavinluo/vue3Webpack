<!--
 * @Author: kavinluo
 * @Date: 2023-03-15 11:03:44
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-17 18:03:48
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
    <el-col :span="9">
      <el-form-item label="准考证号："  prop="stuNum">
        <el-input v-model.number="ruleForm.stuNum"
        clearable v-if="type !== 'view'" placeholder="输入准考证号" />
        <span v-else>{{ ruleForm.stuNum }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="姓名："  prop="name">
        <el-input v-model="ruleForm.name"
        clearable v-if="type !== 'view'" placeholder="输入姓名" />
        <span v-else>{{ ruleForm.name }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="姓别：" prop="sex" label-width="90px">
        <el-select filterable style="width: 100%" clearable v-if="type !== 'view'" 
          v-model="ruleForm.sex" placeholder="选择性别">
          <el-option value="男" label="男"></el-option>
          <el-option value="女" label="女"></el-option>
        </el-select>
        <span v-else>{{ ruleForm.sex }}</span>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="证件类型："  prop="idCardType">
        <el-select filterable style="width: 100%" v-if="type !== 'view'" 
          v-model="ruleForm.idCardType" clearable placeholder="选择证件类型">
          <el-option value="中国居民身份证" label="中国居民身份证"></el-option>
          <el-option value="港澳台护照" label="港澳台护照"></el-option>
        </el-select>
        <span v-else>{{ ruleForm.idCardType }}</span>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="证件号码："
          prop="idCard">
        <el-input v-model="ruleForm.idCard" clearable v-if="type !== 'view'" placeholder="输入证件号码"
          />
      <template v-else>{{ ruleForm.idCard }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="5">
      <el-form-item label="证件照：" label-width="90px"></el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="专业："
          prop="specialty">
        <el-input v-model="ruleForm.specialty" clearable v-if="type !== 'view'" placeholder="输入专业"
          />
      <template v-else>{{ ruleForm.specialty }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="考试专业编码："
          prop="specialtyCode">
          <el-select filterable style="width: 100%" v-if="type !== 'view'" 
          v-model="ruleForm.specialtyCode" clearable placeholder="选择考试专业编码">
          <el-option value="AG" label="AG"></el-option>
          <el-option value="AH" label="AH"></el-option>
        </el-select>
      <template v-else>{{ ruleForm.specialtyCode }}</template>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="考点编号："
          prop="specialty">
        <el-input @blur="getSchoolsName" v-model.number="ruleForm.schoolsCode" clearable v-if="type !== 'view'" placeholder="输入考点编号"
          />
      <template v-else>{{ ruleForm.schoolsCode }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="考点名称："> {{ ruleForm.schoolsName }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="场次：" prop="scene">
        <template  v-if="type !== 'view'">
          第&nbsp;<el-input @blur="getSceneTime" style="width:80px;" v-model.number="ruleForm.scene" clearable placeholder="输入场次"/>&nbsp;场
        </template>
      <template v-else>{{ ruleForm.scene }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="开始考试时间："> {{ ruleForm.examTime }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="考场编号：" prop="schoolCode">
        <el-input v-if="type !== 'view'" @blur="getSchoolName" v-model.number="ruleForm.schoolCode" clearable placeholder="输入考场编号"/>
        <template v-else>{{ ruleForm.schoolCode }}</template>
      </el-form-item>
    </el-col>
    <el-col :span="9">
      <el-form-item label="考场名称："> {{ ruleForm.schoolName }}
      </el-form-item>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="9">
      <el-form-item label="座位号：" prop="userSeatNum">
        <el-input v-if="type !== 'view'" v-model.number="ruleForm.userSeatNum" clearable placeholder="输入座位号"/>
        <template v-else>{{ ruleForm.userSeatNum }}</template>
      </el-form-item>
    </el-col>
  </el-row>
  <div></div>
  <div style="" class="header-top">
    <uploadHeader
    :disabled="type === 'view'" 
    @uploadSuccess="setUploadHeaderSuccessUrl"
    :imgFile="imgSrc"
    :actionUrl="uploadHeaderUrl"
    :avatarTips="true" />
  </div>

    <el-row style="margin:20px 0 -20px; justify-content: flex-end">
      <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="type !=='view'">保存</el-button>
      <el-button type="warning" @click="$emit('cancel', 'addModal')">关闭</el-button>
    </el-row>
  </el-form>
</template>

<script setup>
  import { reactive, ref, getCurrentInstance } from 'vue'
  import { stuInfo } from './rules.js'
  import { addUserInfo, getStu, getByCode, getByExamPlaceArrange, getBySort, modifyUserInfo } from './api.js'
  import { useState } from '@/store/hooks'
  import { useStore } from '@/store'
  import uploadHeader from '@/components/common/uploadHeader.vue'
  const { proxy } = getCurrentInstance()
  const rules = reactive(stuInfo)
  const { examTask } = useState(['examTask'], 'examPlan')
  const props = defineProps(['type', 'rowData'])
  const $emit = defineEmits(['cancel'])
  const $store = useStore()
  const formSize = ref('default')
  // const addNum = ref(0)
  const uploadHeaderUrl = ref('/api/passport/pc/file/upload/headImg')
  const ruleFormRef = ref()
  const imgSrc = ref(null)
  const ruleForm = reactive({
    taskId: examTask.value.id,
    stuNum: '', // 准考证号
    name: '', // 姓名
    sex: '', //  性别
    scene: '', // 场次
    specialty: '', // 专业
    specialtyCode: '', // 考试专业编码
    idCardType: '', // 证件类型
    idCard: '', // 证件号码
    schoolCode: '', // 考场编码
    schoolsCode: '', //  考点编号
    userSeatNum: '', // 考生座位号
    headPhoto: '', // 头像
    schoolsName: '', // 考点名称
    examTime: '', // 开始考试时间
    schoolName: '' // 考场名称
  })
  console.log('examTask', examTask.value)
  if (props.type === 'edit' || props.type === 'view') {
    getStu(props.rowData.id).then((res) => {
      for (let k in ruleForm) {
        ruleForm[k] = res.data[k]
      }
      const sexObj = {
        BOY: '男',
        GIRL: '女'
      }
      ruleForm.stuNum = Number(ruleForm.stuNum)
      ruleForm.schoolCode = Number(ruleForm.schoolCode)
      ruleForm.sex = sexObj[res.data.sex]
      if(res.data.headPhoto) {
        imgSrc.value = $store.state.envs.networkHttp + res.data.headPhoto
      }
    })
  }
  const setUploadHeaderSuccessUrl = (resData) => {
    ruleForm.headPhoto = resData;
    imgSrc.value = $store.state.envs.networkHttp + resData;
  }
  const getSchoolsName = async () => {
    const { data } = await getByCode({taskId: examTask.value.id, code: ruleForm.schoolsCode })
    if (data) {
      ruleForm.schoolsName = data.name
    } else {
      proxy.$message.warning('请检查考点编号是否正确！')
    }
  }

  const getSceneTime = async () => {
    const { data } = await getBySort({taskId: examTask.value.id, sort: ruleForm.scene })
    if (data) {
      ruleForm.examTime = data.startTime
    } else {
      proxy.$message.warning('请检查场次是否正确！')
    }
  }

  const getSchoolName = async () => {
    const { data } = await getByExamPlaceArrange({taskId: examTask.value.id, code: ruleForm.schoolCode })
    if (data) {
      ruleForm.schoolName = data.examRoomName
    } else {
      proxy.$message.warning('请检查考场编号是否正确！')
    }
  }

  const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        console.log('props.type', props.type)
       let res = await (props.type ==='add' ? addUserInfo(ruleForm) : modifyUserInfo(ruleForm, props.rowData.id ))
       if(res.status.code === '0') {
          $emit('cancel', 'addModal', true)
       } else if(res.status.code === '2002'){
         const errorMsgList = res.data[0].errorMsgList.join('，')
         proxy.$message.warning(errorMsgList)
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