<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:55:17
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 13:28:06
 * @Description: 成绩查询
-->
<template>
  <div>
    <el-row>
      <el-col :span="12">
        <!-- <el-button type="primary" @click="handelImportData">导出Excel</el-button> -->
        <myFirm :key="new Date().getTime()"
         :options="{ajaxFn: exportUserScoreExcel, type: 'blob'}"
             :title="'您确定要导出Excel吗？'"
             @confirm="searchHandle"
             buttonType="primary"
             buttonText="导出Excel"
             ></myFirm>
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
      :getDataFn="queryUserScore"
      :propList="resultColumns"
      :params="from"
      @handleSelectionChange="handleSelectionChange"
      :showSelectColumn="true">
      <template #sex="scope">
         {{ sxeMap[scope.row.sex] }}
      </template>
  </kv-table>
  </div>
  <!-- 新建 -->
  <!-- <kv-dialog  v-model="modal.addModal" :width="750" @cancel="cancel('addModal')" :headerTitle="addTitle">
    <add v-if="modal.addModal" :type="type" @cancel="cancel"  :rowData="rowData"/>
  </kv-dialog> -->
  <!-- <kv-dialog  v-model="modal.batchModal" :width="400" @cancel="cancel('batchModal')" :headerTitle="{title:'导入作答数据'}">
    <import-data-file v-if="modal.batchModal" :ajax-fn="importUserTheoryScoreFile" @cancel="cancel('batchModal')"/>
  </kv-dialog> -->

 <!-- 导出 -->
 <!-- <kv-dialog  v-model="modal.toChannelModal" :isFooter="false" :width="400" @cancel="cancel('toChannelModal')"
    :headerTitle="{title: '导出Excel'}">
    <div style="font-size: 16px;text-align: center; margin-bottom: 15px;">
      您确定要导出Excel吗？
    </div>
    <div style="margin: 35px 50px 0 0; text-align: right;">
      <el-button type="primary" @click="handleExport">确定</el-button>
      <el-button type="warning" @click="cancel('toChannelModal')">取消</el-button>
    </div>
  </kv-dialog> -->

</template>

<script setup>
  import { ref, reactive } from 'vue'
  // import { isSelected } from '@util/util'
  // import importDataFile from '@/components/common/importFile.vue'
  import { useState } from '@store/hooks/index'
  import {  queryUserScore, exportUserScoreExcel } from "./api"
  import { resultColumns } from './table'
  // const { proxy } = getCurrentInstance()
  // const type = ref('add')
  const { examTask } = useState(['examTask'], 'examPlan')
  const from = ref({
    taskId: examTask.value.id,
  })
  const myTable = ref({})
  const sxeMap = reactive({
    BOY: '男',
    GIRL: '女'
  })
 
   
  const authorizeStatus = ref(true)

  const rowData = ref([])
  // const addTitle = reactive({title: '授权开考'})
  const handleSelectionChange = (res) => {
    rowData.value = res
    console.log('res', res)
    if(res.length) {
      authorizeStatus.value = res[0].authorizeStatus === "Y"
    }
  }
 
  // 导出
  // const handelImportData = () => {
  //   // if(isSelected(rowData.value, true)) {
  //     modal.toChannelModal = true
  //     rowData.value = rowData.value[0]
  //   // }
  // }
  // const handleExport = () => {
  //   exportUserScoreExcel().then(res => {
  //     const blob = res.data;
  //     const fileName =  res.headers['content-disposition'] && decodeURIComponent(res.headers[
  //       'content-disposition'].split(
  //       '=')[1]) || '暂无数据.xls';
  //     if ('download' in document.createElement('a')) { // 非IE下载
  //       const link = document.createElement('a');
  //       link.download = fileName;
  //       link.style.display = 'none';
  //       link.href = URL.createObjectURL(blob);
  //       document.body.appendChild(link);
  //       link.click();
  //       URL.revokeObjectURL(link.href); // 释放URL 对象
  //       document.body.removeChild(link);
  //     } else { // IE10+下载
  //       navigator.msSaveBlob(blob, fileName);
  //     }
  //     modal.toChannelModal = false
  //     proxy.$message.success('导出成功！')
  //   })
  // }
  // const handelImportData = () => {
  //   // importUserTheoryScoreFile()
  //   modal.batchModal = true
  // }
  // // 查看
  // const handleShow = (row) => {
  //   rowData.value = row
  //   addTitle.title = '查看授权'
  //   modal.viewModal = true
  // }


  const searchHandle = () => {
    myTable.value.getList()
  }
  // const cancel = (modalType) => {
  //   modal[modalType] = false
  //   // myTable.value.clearTable()
  //   // if(title) {
  //   //   searchHandle()
  //   // }
  // } 

</script>

<style lang="scss" scoped>

</style>
