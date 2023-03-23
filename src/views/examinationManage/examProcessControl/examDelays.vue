<!--
 * @Author: kavinluo
 * @Date: 2023-02-14 10:47:37
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 12:01:08
 * @Description: 考试延迟
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
      :getDataFn="delayedLogList"
      :params="from"
      :propList="delayedColumns">
      <template #type="scope">
        {{scope.row.type === 'THEORY' ? '理论' : scope.row.type === 'SKILL' ? '技能' : ''}}
      </template>
      <template #authorizeCode="scope">
        <myFirm v-if="scope.row.authorizeStatus == 'NOT_AUDIT'" :key="scope.row.authorizeCode"
         :options="{ajaxFn: ()=> ({}), params:{}}"
             :title="'您确定要同意延迟吗？'"
             @confirm="searchHandle"
             buttonType="primary"
             buttonSize="small"
             buttonText="同意延迟"
             ></myFirm>
             <template v-else>
              {{ scope.row.authorizeCode }}
             </template>
      </template>
      <template #authorizeStatus="scope">
        {{ statusMap[scope.row.authorizeStatus] }}
      </template>
      <template #createTime="scope">
        {{ formatDate(scope.row.createTime, 'yyyy-MM-dd HH:mm') }}
      </template>
      <template #describe="scope">
        <el-popover
          placement="top-start"
          title=""
          :width="200"
          trigger="hover"
          :content="scope.row.authorizeStatus">
          <template #reference>
            <span style="color: #2670df;">{{scope.row.authorizeStatus.substring(0,5)}}</span>
          </template>
        </el-popover>
      </template>
  </kv-table>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { delayedColumns } from './table'
  import { useState } from '@store/hooks/index'
  import { delayedLogList } from './api.js'
  import { formatDate } from '@/utils/formatDate.js'
  const { examTask } = useState(['examTask'], 'examPlan')
  const myTable = ref({})
  const from = reactive({
    taskId: examTask.value.id,
  })
  const statusMap = reactive({
    'NOT_AUDIT': '待授权',
    'AUDIT_SUCCESS': '授权成功',
    'AUDIT_FAILURE': "授权失败"
  })

    const searchHandle = () => {
      myTable.value.getList()
    }


</script>