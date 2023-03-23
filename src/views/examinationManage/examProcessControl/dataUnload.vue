<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:48:24
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-22 09:40:01
 * @Description: 数据卸载
-->

<template>
  <div>
    <el-row>
      <el-col :span="12">
        <myFirm :key="new Date().getTime()" :options="{ajaxFn: allUninstallCode, params:{type:'THEORY'}}"
             :title="'您确定要一键生成卸载码吗？'" @confirm="searchHandle"
             buttonType="primary"
             buttonText="一键生成卸载码"
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
      :getDataFn="listDto"
      :propList="dataUnloadColumns"
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
  <!-- 新建 -->
  <!-- <kv-dialog  v-model="modal.addModal" :width="750" @cancel="cancel('addModal')" :headerTitle="addTitle">
    <add v-if="modal.addModal" :type="type" @cancel="cancel"  :rowData="rowData"/>
  </kv-dialog> -->



</template>

<script setup>
  import { ref, reactive } from 'vue'
  // import { isSelected } from '@util/util'
  import { useState } from '@store/hooks/index'
  import { allUninstallCode,uninstallCode, listDto } from "./api"
  import { dataUnloadColumns } from './table'
  // const type = ref('add')
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
 

  // 查看
  const handleShow = (row) => {
    rowData.value = row
    addTitle.title = '查看授权'
    modal.viewModal = true
  }


  const searchHandle = () => {
    console.log('2313', 2313)
    myTable.value.getList()
  }


</script>

<style lang="scss" scoped>

</style>
