<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:29:07
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 13:46:24
 * @Description: 考点管理员维护
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="addHandle">新建</el-button>
        <el-button type="warning" @click="editHandle">修改</el-button>
        <el-button type="danger"  @click="delHandle">删除</el-button>
        <el-button type="primary" @click="disEnableHandle">启用/停用</el-button>
        <el-button type="primary" @click="resetHandle">重置密码</el-button>
        <el-button type="primary" @click="deriveHandle">解除绑定</el-button>
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
      :getDataFn="getExamUserList"
      :propList="columns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #account="scope">
         <a href="#" @click="handleShow(scope.row)">{{ scope.row.account }} </a>
      </template>
  </kv-table>
  </div>
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
  import { useState } from '@store/hooks/index'
  import { getExamUserList } from "../api"
  import { columns } from './table'
  import add from './input.vue'
  const { examTask } = useState(['examTask'], 'examPlan')
  const { proxy } = getCurrentInstance()
  const type = ref('add')
  const deleteUrl = ref('/passport/pc/archivesBasicInfo/remove')
  const from = ref({
    searchValue:'',
    taskId: examTask.value.id,
    userType: 'SCHOOL'
  })
  const myTable = ref({})
  const addModal = ref(false)
  const removeModal = ref(false)
  const rowData = ref([])
  const addTitle = ref({title: '新建考点管理员'})
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
      addTitle.value.title = '修改考点管理员'
      rowData.value = rowData.value[0]
    }
  }
  // 查看
  const handleShow = (row) => {
    rowData.value = row
    type.value = 'view'
    addTitle.value.title = '查看考点管理员'
    addModal.value = true
  }

  // 停用
  const disEnableHandle = () =>{

  }
  // 重置密码
  const resetHandle = () =>{

  }
  // 导出
  const deriveHandle = () =>{

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