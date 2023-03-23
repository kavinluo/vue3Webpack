<!--
 * @Author: kavinluo
 * @  Date: 2023-02-14 10:19:45
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 13:59:46
 * @Description: 考点管理
-->
<template>
    <el-row style="">
      <el-col :span="12">
        <el-button type="primary" @click="addHandle">新建</el-button>
        <el-button type="warning" @click="editHandle">修改</el-button>
        <el-button type="danger"  @click="delHandle">删除</el-button>
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
      :getDataFn="getSchoolsList"
      :propList="columns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #name="scope">
         <a href="#" @click="handleShow(scope.row)">{{ scope.row.name }} </a>
      </template>
  </kv-table>
<!-- 新建 -->
  <kv-dialog  v-model="addModal" :width="800" @cancel="cancel" :headerTitle="addTitle">
    <add v-if="addModal" :type="type" @cancel="cancel" :rowData="rowData"/>
  </kv-dialog>
  <!-- 删除 -->

  <kv-dialog  v-model="removeModal" :width="400" @cancel="cancel" :headerTitle="{title:'删除'}">
    <remove v-if="removeModal" @cancel="cancel" :deleteUrl="deleteUrl" :rowData="rowData"/>
  </kv-dialog>


</template>

<script setup>
  import { ref, getCurrentInstance } from 'vue'
  import { isSelected } from '@util/util'
  import { getSchoolsList } from "../api"
  import { useState } from '@store/hooks/index'
  import { columns } from './table'
  import add from './input.vue'
  const { proxy } = getCurrentInstance()
  const type = ref('add')
  const deleteUrl = ref('/passport/pc/schools/remove')
  const { examTask } = useState(['examTask'], 'examPlan')
  const from = ref({
    taskId: examTask.value.id,
    type:'EXAM_PLACE',
  })
  console.log('56456456', 56456456)
  const myTable = ref({})
  const addModal = ref(false)
  const removeModal = ref(false)
  const rowData = ref([])
  const addTitle = ref({title: '新建考点信息'})
  // 选择
  const handleSelectionChange = (res) => {
    rowData.value = res
  }
  // 新建
  const addHandle =() => {
    addModal.value = true
    type.value = 'add'
  }
  // 编辑 
  const editHandle =() => {
    if(isSelected(rowData.value, true)) {
      addModal.value = true
      type.value = 'edit'
      addTitle.value.title = '修改考点信息'
      rowData.value = rowData.value[0]
    }
  }
  // 查看
  const handleShow = (row) => {
    rowData.value = row
    type.value = 'view'
    addTitle.value.title = '查看考点信息'
    addModal.value = true
  }
  // 删除
  const delHandle =() => {
    if(rowData.value.length) {
      removeModal.value = true
    } else {
      proxy.$message.warning('请选择数据！')
    }
  }
  // 搜索
  const searchHandle = () => {
    myTable.value.getList()
  }

  const cancel = (cancel) => {
    addModal.value = false
    removeModal.value = false
    myTable.value.clearTable()
    type.value = 'add'
    rowData.value = []
    addTitle.value.title = '新建考点信息'

    if(cancel) {
      searchHandle()
    }
  } 
</script>

<style lang="scss" scoped>

</style>