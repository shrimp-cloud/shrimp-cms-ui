<template>
  <el-card shadow="hover">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="keyword">
        <el-input v-model="queryParams.keyword" placeholder="回车查询租户" clearable style="width: auto" @input="filterTenant"/>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
        min-height="240"
        max-height="680"
        highlight-current-row
        :data="dataSelectList"
        ref="tableRef"
        @row-click="handleSelect"
        :show-header="false">
      <el-table-column label="租户" align="left" min-width="160" :show-overflow-tooltip="true">
        <template #default="scope">{{ scope.row.displayName }}</template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup name="TenantSelect">
import {tenantOptions} from "@/api/tenant";
import { ElTable } from 'element-plus'

const { proxy } = getCurrentInstance();
const emit = defineEmits(['select']);
const dataList = ref([]);
const dataSelectList = ref([]);
const loading = ref(true);
const currentRow = ref()
const queryParams = ref({
  keyword: undefined,
});
function getList() {
  loading.value = true;
  tenantOptions({}).then(res => {
    dataList.value = res.data;
    filterTenant();
    if (!currentRow.value && dataList.value.length > 0) {
      currentRow.value = dataList.value[0];
      proxy.$refs["tableRef"].setCurrentRow(currentRow.value);
      handleSelect(currentRow.value);
    }
  }).finally(() => {
    loading.value = false;
  });
}

function filterTenant() {
  const keyword = queryParams.value.keyword;
  const filted = [];
  for (const d of dataList.value) {
    d.displayName = d.tenantCode + ':' + d.tenantName;
    if (!keyword || d.displayName.indexOf(keyword) !== -1) {
      filted.push(d);
    }
  }
  dataSelectList.value = filted;
}


function handleSelect(row) {
  currentRow.value = row;
  emit("select", currentRow.value);
}
getList();
</script>

<style>
.el-card__body {
  padding: 12px 6px 12px 6px !important;
}
</style>
