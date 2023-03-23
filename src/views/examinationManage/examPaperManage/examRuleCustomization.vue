<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:35:23
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 13:44:53
 * @Description: 考生信息维护
-->
<template>
  <el-row>
    <el-col :span="12">
      <el-button type="primary" @click="addHandle">新建</el-button>
      <el-button type="warning" @click="editHandle">修改</el-button>
      <el-button type="danger"  @click="delHandle">删除</el-button>
      <el-button type="primary" @click="disEnableHandel">试卷包导入</el-button>
      <el-button type="primary" @click="enableHandel">规则导出</el-button>
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
    <template #paperName="scope">
        <a href="##" @click="handleShow(scope.row)">{{ scope.row.paperName }} </a>
    </template>
    <template #paperPagePath="scope">
        {{ scope.row.paperPagePath ? '已导入' : '未导入'}}
    </template>
    <template #sex="scope">
        {{ sex[scope.row.sex] }} 
    </template>
  </kv-table>
  <!-- 新建 -->
  <kv-dialog  v-model="modal.addModal" :width="1000" @cancel="cancel('addModal')" :headerTitle="addTitle">
    <add v-if="modal.addModal" :type="type" @cancel="cancel"  :rowData="rowData"/>
  </kv-dialog>
  <!-- 导出 -->
  <kv-dialog  v-model="modal.toChannelModal" :isFooter="false" :width="400" @cancel="cancel('toChannelModal')"
    :headerTitle="toChannelTitle">
    <div style="font-size: 16px;text-align: center; margin-bottom: 15px;">
    你确定要导出规则吗？
    </div>
    <div style="margin: 35px 50px 0 0; text-align: right;">
      <el-button type="primary" @click="handleExport">确定</el-button>
      <el-button type="warning" @click="cancel('toChannelModal')">取消</el-button>
    </div>
  </kv-dialog>

  <!-- 删除 -->
  <kv-dialog  v-model="modal.removeModal" :width="400" @cancel="cancel('removeModal')" :headerTitle="{title:'删除'}">
    <remove v-if="modal.removeModal" @cancel="cancel('removeModal')" :deleteUrl="deleteUrl" :rowData="rowData"/>
  </kv-dialog>

  <!-- 试卷包导入 -->
  <kv-dialog  v-model="modal.batchModal" :width="400" @cancel="cancel('batchModal')" :headerTitle="{title:'试卷包导入'}">
    <paper-import 
    v-if="modal.batchModal"
    tip="请选择格式为.gkp的文件导入。"
    accept=".gkp"
    :ajax-fn="importTheoryTmPage"
    @cancel="cancel('batchModal')"/>
  </kv-dialog>

</template>

<script setup>
  import { ref, getCurrentInstance, reactive } from 'vue'
  // import paperImport  from './paperImport.vue'
  import paperImport  from '@/components/common/importFile.vue'
  import { isSelected } from '@util/util'
  import { useState } from '@store/hooks/index'
  import { getListPage, exportTheoryRule, importTheoryTmPage } from "./api"
  import { columns } from './table'
  import add from './input.vue'
  const { proxy } = getCurrentInstance()
  const type = ref('add')
  const { examTask } = useState(['examTask'], 'examPlan')
  const deleteUrl = ref('/passport/pc/schools/remove')
  const from = ref({
    taskId: examTask.value.id,
    // paperPagePath: -1
  })
  const myTable = ref({})
  const modal = reactive({
    addModal: false,
    removeModal: false,
    toChannelModal: false,
    batchModal: false,
  })
  const sex = reactive({
    BOY:'男',
    GIRL:'女'
  })
  // const addModal = ref(false)
  // const removeModal = ref(false)
  // const toChannelModal = ref(false)
  const rowData = ref([])
  const addTitle = reactive({title: '新建考试规则'})
  const toChannelTitle = ref({title: '规则导出'})
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
      addTitle.title = '修改考试规则'
      rowData.value = rowData.value[0]
    }
  }
  // 查看
  const handleShow = (row) => {
    rowData.value = row
    type.value = 'view'
    addTitle.title = '查看考试规则'
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

  // 导出
  const enableHandel = () => {
    if(isSelected(rowData.value, true)) {
      modal.toChannelModal = true
      rowData.value = rowData.value[0]
    }
  }
  // 导入
  const disEnableHandel = () => {
    modal.batchModal = true
  }

  const handleExport = () => {
    exportTheoryRule(rowData.value.paperId).then(res => {
      const blob = res.data;
      const fileName =  res.headers['content-disposition'] && decodeURIComponent(res.headers[
        'content-disposition'].split(
        '=')[1]) || '暂无数据.xls';
      if ('download' in document.createElement('a')) { // 非IE下载
        const link = document.createElement('a');
        link.download = fileName;
        link.style.display = 'none';
        link.href = URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // 释放URL 对象
        document.body.removeChild(link);
      } else { // IE10+下载
        navigator.msSaveBlob(blob, fileName);
      }
      modal.toChannelModal = false
      proxy.$message.success('导出成功！')
    })
  }
  const searchHandle = () => {
    myTable.value.getList()
  }
  // const successCall = (modalType, title) => {
  //   modal[modalType] = false
  //   if(title) {
  //     proxy.$message.success(title)
  //     searchHandle()
  //   }
  // }

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