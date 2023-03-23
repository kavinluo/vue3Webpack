<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:47:37
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 11:15:18
 * @Description: 考程监控
-->
<template>
  <el-row>
      <el-col :span="24" algin="right" class="justify-end">
        <el-form :model="from" inline>
          <el-form-item label="">
            <el-input v-model="from.searchValue" style="width: 180px" type="text" clearable placeholder="请输入要查询的内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchHandle" type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  <kv-table
      ref="myTable"
      :getDataFn="listDto"
      :params="from"
      :propList="examColumns">
      <template #type="scope">
        {{scope.row.type === 'THEORY' ? '理论' : scope.row.type === 'SKILL' ? '技能' : ''}}
      </template>
      <template #systemInstall="scope">
        <uIcon :attrType="scope.row.systemInstall==='Y'"></uIcon>
      </template>
      <template #examineImportNum="scope">
        <uIcon :attrType="scope.row.examineImportNum"></uIcon>
      </template>
      <template #getAuthorizeCode="scope">
        <uIcon :attrType="scope.row.getAuthorizeCode === 'Y'"></uIcon>
      </template>
      <template #paperPageImport="scope">
        <uIcon :attrType="scope.row.paperPageImport === 'Y'"></uIcon>
      </template>
      <template #scoreUploadNum="scope">
        <uIcon :attrType="scope.row.scoreUploadNum"></uIcon>
      </template>
  </kv-table>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { examColumns } from './table'
  import uIcon from './icon.vue'
  import { useState } from '@store/hooks/index'
  import { listDto } from './api.js'
  const { examTask } = useState(['examTask'], 'examPlan')
  const myTable = ref({})
  const from = reactive({
    searchValue: '',
    type: 'THEORY',
    taskId: examTask.value.id,
  })

    const searchHandle = () => {
      myTable.value.getList()
    }


</script>