<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:55:17
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 11:38:52
 * @Description: 计算成绩
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-button type="primary" @click="handelImportData">导入作答数据</el-button>
        <myFirm :key="new Date().getTime()"
         :options="{ajaxFn: computationalResults,params:{taskId: examTask.id}}"
             :title="'您确定要计算成绩吗？'"
             @confirm="searchHandle"
             buttonType="primary"
             buttonText="计算成绩"
             ></myFirm>
        <el-button type="primary" @click="handelImportData">核对完毕</el-button>
      </el-col>
      <el-col :span="12" algin="right" class="justify-end">
        <el-form :model="from" inline>
          <el-form-item>
            <el-input v-model="from.searchValue" type="text" style="width: 200px;" clearable placeholder="请输入要查询的内容"></el-input>
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
      :propList="columns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #name="scope">
         <a href="##" @click="handleShow(scope.row)">{{ scope.row.name }} </a>
      </template>
      <template #type="scope">
        {{scope.row.type === 'THEORY' ? '理论' : scope.row.type === 'SKILL' ? '技能' : ''}}
      </template>
      <template #uninstallCode="scope">
         <myFirm v-if="!scope.row.uninstallCode" :key="scope.row.uninstallCode"
         :options="{ajaxFn: uninstallCode, params:{placeCode:scope.row.schoolsCode, type: 'THEORY'}}"
             :title="'您确定要生成卸载码吗？'"
             @confirm="searchHandle"
             buttonType="primary"
             buttonSize="small"
             buttonText="允许卸载"
             ></myFirm>
             <template v-else>
              {{ scope.row.uninstallCode }}
             </template>
      </template>
  </kv-table>
  </div>

  <kv-dialog  v-model="modal.batchModal" :width="400" @cancel="cancel('batchModal')" :headerTitle="{title:'导入作答数据'}">
    <import-data-file v-if="modal.batchModal" :ajax-fn="importUserTheoryScoreFile" @cancel="cancel('batchModal')"/>
  </kv-dialog>


</template>

<script setup>
  import { ref, reactive } from 'vue'
  // import { isSelected } from '@util/util'
  import importDataFile from '@/components/common/importFile.vue'
  import { useState } from '@store/hooks/index'
  import { importUserTheoryScoreFile, listDto, computationalResults } from "./api"
  import { columns } from './table'

  // const type = ref('add')
  const { examTask } = useState(['examTask'], 'examPlan')
  const from = ref({
    taskId: examTask.value.id,
  })
  const myTable = ref({})
  const modal = reactive({
    batchModal: false,
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
 

  const handelImportData = () => {
    // importUserTheoryScoreFile()
    modal.batchModal = true
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
    if(title) {
      searchHandle()
    }
  } 

</script>

<style lang="scss" scoped>

</style>
