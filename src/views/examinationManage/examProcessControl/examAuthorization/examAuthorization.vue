
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="addHandle">开考授权</el-button>
        <el-button type="warning" @click="editHandle" :disabled="!authorizeStatus">取消授权</el-button>
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
      :getDataFn="getListPage"
      :propList="columns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #name="scope">
         <a href="##" @click="handleShow(scope.row)">{{ scope.row.name }} </a>
      </template>
      <template #authorizeStatus="scope">
         {{ scope.row.authorizeStatus === 'Y' ? '已授权' : '未授权' }} 
      </template>
      <template #categoryExam="scope">
         <el-button @click="handleShow(scope.row)" size="small" type="primary">查看</el-button>
      </template>
  </kv-table>
  </div>
  <!-- 新建 -->
  <kv-dialog  v-model="modal.addModal" :width="750" @cancel="cancel('addModal')" :headerTitle="addTitle">
    <add v-if="modal.addModal" :type="type" @cancel="cancel"  :rowData="rowData"/>
  </kv-dialog>

  <!-- 查看 -->
  <kv-dialog :closeOnclickModal="true"  v-model="modal.viewModal" :width="1000" @cancel="cancel('viewModal')" :headerTitle="{title:'查看授权码'}">
    <views v-if="modal.viewModal" :rowData="rowData"/>
  </kv-dialog>

</template>

<script setup>
  import { ref, reactive } from 'vue'
  import { isSelected } from '@util/util'
  import { useState } from '@store/hooks/index'
  import { getListPage } from "../api"
  import { columns } from '../table'
  import add from './input.vue'
  import views from './view.vue'
  const type = ref('add')
  const { examTask } = useState(['examTask'], 'examPlan')
  const from = ref({
    taskId: examTask.value.id,
  })
  const myTable = ref({})
  const modal = reactive({
    addModal: false,
    viewModal: false,
  })
  const authorizeStatus = ref(true)

  const rowData = ref([])
  const addTitle = reactive({title: '授权开考'})
  const handleSelectionChange = (res) => {
    rowData.value = res
    console.log('res', res)
    if(res.length) {
      authorizeStatus.value = res[0].authorizeStatus === "Y"
    }
  }
  // 添加
  const addHandle =() => {
    if(isSelected(rowData.value, true)) {
      modal.addModal = true
      type.value = 'add'
      addTitle.title = '授权开考'
      rowData.value = rowData.value[0]
    }
  }  
  // 编辑
  const editHandle =() => {
    if(isSelected(rowData.value, true)) {
      modal.addModal = true
      type.value = 'edit'
      addTitle.title = '取消授权'
      rowData.value = rowData.value[0]
    }
  }
  // 查看
  const handleShow = (row) => {
    rowData.value = row
    addTitle.title = '查看授权'
    modal.viewModal = true
  }


  const searchHandle = () => {
    myTable.value.getList()
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
