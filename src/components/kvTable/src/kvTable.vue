<!--
 * @Author: kevin
 * @Date: 2022-03-07 10:20:25
 * @LastEditors: kavinluo
 * @LastEditTime: 2023-03-23 12:28:22
 * @Description: table 封装
-->
<template>
  <el-table
    :class="['kv-table',isRadio ? 'handle-tr' : '']"
    ref="multipleTableRef"
    :data="tableData"
    border
    v-bind="tableOtherOption"
    :expand-row-keys="expandRowKeys"
    row-key="id"
    @current-change="handleCurrentChangeRadio"
    :highlight-current-row="isRadio"
    @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="55" v-if="showSelectColumn && !isRadio" />
    <!-- 单选 -->
    <el-table-column label="选择" align="center" width="65" v-if="isRadio">
      <template #default="scope">
        <el-radio :label="scope.row.id" v-model="radio">&nbsp;</el-radio>
      </template>
    </el-table-column>
    <el-table-column type="index" label="序号" align="center" width="60" v-if="showIndexColumn">
      <template #default="scope">
        {{ (pagination.curPage - 1) * pagination.pageSize + scope.$index + 1 }}
      </template>
    </el-table-column>
    <template v-for="item in propList" :key="item.prop">
      <el-table-column v-bind="item" :align="item.align ? item.align : 'center'">
        <template #default="scope">
          <slot :name="item.slotName" :row="scope.row">
            {{ scope.row[item.prop] }}
          </slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
  <div class="table-footer" v-if="showFooter">
    <slot name="footer">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.curPage"
      :page-size="pagination.pageSize"
      :page-sizes="props.useSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </slot>
  </div>
</template>

 <script setup>
  import { ref, watch, nextTick, onMounted } from 'vue'
  // import { useStore } from '@/store'
  import propsList  from './props'
  const props = defineProps(propsList)
  const emit = defineEmits(['handleSelectionChange', 'update:pagination', 'changePageSize', 'changeCurrentPage'])
  const multipleTableRef = ref()
  const radio = ref(false)

  const pagination = ref({
    curPage: 1,
    pageSize: 10
  });
  const tableData = ref([])
  const total = ref(0)
  const param = ref({})
  let getList = null
  if(props.getDataFn) {
     getList = async () =>  {
      param.value = props.hasPageSize ? {...pagination.value, ...props.params } : { ...props.params }
     const data = await props.getDataFn(param.value)
     console.log('data', data)
     tableData.value = data.data?.list ?? data.data
     total.value = data.data.total || data.data.length || 0
    }
    getList()
  } else {
    tableData.value = ref(props.useSelectData)
  }
    onMounted(() => {
      
    })

    const clearTable = () => {
      multipleTableRef.value.clearSelection()
    }
    // 暴露方法给父组件
    defineExpose({
      getList,
      clearTable
    })
    // 监听参数变化进行搜索
    // watch(() => props.params, (val, old) => {
    //   console.log('props.params', val, 'old', old)
    //   getList()
    // })
  // }

  
    // 选中回显
    if (props.showSelectColumn && props.useSelectData) {
      watch(() => props.useSelectData.value, (rows) => {
        nextTick(() => {
          rows.forEach(row => {
            multipleTableRef.value.toggleRowSelection(row, undefined)
          })
        })
      })
    }
    const handleSelectionChange = (val) => {
      if (val) {
        emit('handleSelectionChange', val)
      }
    }
    const handleSizeChange = (pageSize) => {
      pagination.value.pageSize = pageSize
      emit('update:pagination', { ...pagination.value, pageSize })
      getList()
    }
    const handleCurrentChange = (curPage) => {
      emit('update:pagination', { ...pagination.value, curPage })
      pagination.value.curPage = curPage
      getList()
    }

    // 单选
    const handleCurrentChangeRadio = (val) => {
      if (!props.isRadio) return
      if (val) {
        emit('handleSelectionChange', val)
        radio.value = val?.id
      }
    }
</script>
<script>
export default {
  name: 'KvTable'
}
</script>
<style lang="scss">
.table-footer {
  text-align: right;
  margin-top: 15px;
  display: flex;
  .el-pagination {
    margin-left: auto;
  }
}
.kv-table {
  border-top: solid #ebeef5 1px;
}
.handle-tr {
  .el-table__body {
    .el-table__row {
      cursor: pointer;
    }
    .current-row td {
      background-color: #c0deff !important;
    }
  }
}
</style>
