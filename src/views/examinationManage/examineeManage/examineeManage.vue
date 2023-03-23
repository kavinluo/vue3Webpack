<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:35:23
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 13:47:06
 * @Description: 考生信息维护
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="addHandle">新建</el-button>
        <el-button type="warning" @click="editHandle">修改</el-button>
        <el-button type="danger"  @click="delHandle">删除</el-button>
        <el-button type="primary" @click="enableHandel">导入</el-button>
        <el-button type="primary" @click="disEnableHandel">导出</el-button>
        <el-button type="primary" @click="batchUploadHandel">批量上传头像</el-button>
        <!-- <el-button type="primary" @click="batchUploadHandel">生成考生加密包</el-button> -->
        <myFirm :key="new Date().getTime()"
          :options="{ajaxFn: generateExamineeEncryptionPackage, params:{taskId: examTask.id}}"
          :title="'您确定要生成加密包吗？'"
          @confirm="searchHandle"
          buttonType="primary"
          buttonText="生成考生加密包"/>
      </el-col>
      <el-col :span="12" algin="right" class="justify-end">
        <el-form :model="from" inline>
          <el-form-item>
            <el-input v-model="from.searchValue" type="text" clearable placeholder="请输入要查询的内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchHandle" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <kv-table
      ref="myTable"
      :getDataFn="getStuListPage"
      :propList="columns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #name="scope">
         <a href="##" @click="handleShow(scope.row)">{{ scope.row.name }} </a>
      </template>
      <template #sex="scope">
         {{ sex[scope.row.sex] }} 
      </template>
  </kv-table>
  </div>
  <!-- 新建 -->
  <kv-dialog  v-model="modal.addModal" :width="1000" @cancel="cancel('addModal')" :headerTitle="addTitle">
    <add v-if="modal.addModal" :type="type" @cancel="cancel"  :rowData="rowData"/>
  </kv-dialog>
  <!-- 导入 -->
  <kv-dialog  v-model="modal.toChannelModal" :width="600" @cancel="cancel('toChannelModal')" :headerTitle="toChannelTitle">
    <toChannel :taskId="examTask.id" v-if="modal.toChannelModal" :type="type" @success="successCall" @cancel="cancel"/>
  </kv-dialog>

  <!-- 删除 -->
  <kv-dialog  v-model="modal.removeModal" :width="400" @cancel="cancel('removeModal')" :headerTitle="{title:'删除'}">
    <remove v-if="modal.removeModal" @cancel="cancel('removeModal')" :deleteUrl="deleteUrl" :rowData="rowData"/>
  </kv-dialog>

  <!-- 批量上传头像 -->
  <kv-dialog  v-model="modal.batchModal" :width="400" @cancel="cancel('batchModal')" :headerTitle="{title:'批量上传头像'}">
    <batch-upload v-if="modal.batchModal" @cancel="cancel('batchModal')"/>
  </kv-dialog>

</template>

<script setup>
  import { ref, getCurrentInstance, reactive } from 'vue'
  import toChannel from './stuInfo_toChannel'
  import batchUpload from './batchUpload.vue'
  import { isSelected } from '@util/util'
  import { useState } from '@store/hooks/index'
  import { getStuListPage, generateExamineeEncryptionPackage } from "./api"
  import { columns } from './table'
  import add from './input.vue'
  const { proxy } = getCurrentInstance()
  const type = ref('add')
  const { examTask } = useState(['examTask'], 'examPlan')
  const deleteUrl = ref('/passport/pc/schools/remove')
  const from = ref({
    taskId: examTask.value.id,
  })
  const myTable = ref({})
  const modal = reactive({
    addModal: false,
    removeModal: false,
    toChannelModal: false,
    batchModal: false
  })
  const sex = reactive({
    BOY:'男',
    GIRL:'女'
  })
  // const addModal = ref(false)
  // const removeModal = ref(false)
  // const toChannelModal = ref(false)
  const rowData = ref([])
  const addTitle = reactive({title: '新建学员信息'})
  const toChannelTitle = ref({title: '导入学员信息'})
  const handleSelectionChange = (res) => {
    rowData.value = res
    console.log('res', res)
  }
  // 添加
  const addHandle =() => {
    modal.addModal = true
    type.value = 'add'
  }  
  // 编辑
  const editHandle =() => {
    if(isSelected(rowData.value, true)) {
      modal.addModal = true
      type.value = 'edit'
      addTitle.title = '修改学员信息'
      rowData.value = rowData.value[0]
    }
  }
  // 查看
  const handleShow = (row) => {
    rowData.value = row
    type.value = 'view'
    addTitle.title = '查看学员信息'
    modal.addModal = true
  }
  // 删除
  const delHandle =() => {
    if(rowData.value.length) {
      modal.removeModal = true
    } else {
      proxy.$message.warning('请选择数据！')
    }
  }

  const batchUploadHandel = () => {
    modal.batchModal = true
  }

  // // 导入
  const enableHandel = () => {
    modal.toChannelModal = true
  }
  // 暂停
  const disEnableHandel = () => {

  }
  const searchHandle = () => {
    myTable.value.getList()
  }
  const successCall = (modalType, title) => {
    modal[modalType] = false
    if(title) {
      proxy.$message.success(title)
      searchHandle()
    }
  }

  const cancel = (modalType,title) => {
    modal[modalType] = false
    myTable.value.clearTable()
    type.value = 'add'
    rowData.value = []
    addTitle.title = '新建考点信息'
    if(title) {
      searchHandle()
    }
  } 
</script>

<style lang="scss" scoped>

</style>