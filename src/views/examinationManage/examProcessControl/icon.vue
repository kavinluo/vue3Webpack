<template>
  <div>
    <el-icon v-if="attrType" style="color: green">
      <kvIcon name="Select"></kvIcon>
    </el-icon>
    <el-icon v-else style="color: red">
      <kvIcon name="CloseBold"></kvIcon>
    </el-icon>
  </div>
</template>

<script setup>
   defineProps({
      attrType: {
        type:[String,Boolean,Number],
        default: null
      }
  })

</script>



<style scoped>

</style>