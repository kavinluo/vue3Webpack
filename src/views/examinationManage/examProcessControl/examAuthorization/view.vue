<!-- eslint-disable no-prototype-builtins -->
<!--
 * @Author: kavinluo
 * @Date: 2023-03-21 11:41:46
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-21 16:35:03
 * @Description: 无
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
      :propList="listDtoColumns">
      <template #type="scope">
        {{scope.row.type === 'THEORY' ? '理论' : scope.row.type === 'SKILL' ? '技能' : ''}}
      </template>
  </kv-table>
</template>

<script setup>
  import { reactive, ref } from 'vue'
  import { listDtoColumns } from '../table'
  import { listDto } from '../api.js'
  const myTable = ref({})
  const props = defineProps(['type', 'rowData'])
 console.log(' props.rowData',  props.rowData)
  const from = reactive({
    searchValue: '',
    ruleId: props.rowData.paperId
  })

    const searchHandle = () => {
      myTable.value.getList()
    }


</script>
<style lang="scss" scoped>
</style>