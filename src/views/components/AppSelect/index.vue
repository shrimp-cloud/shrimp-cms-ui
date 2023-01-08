<template>
  <el-card shadow="hover">
    <el-form :model="queryParams" ref="queryRef" :inline="true">
      <el-form-item prop="keyword">
        <el-input v-model="queryParams.keyword" placeholder="回车查询应用" clearable style="width: auto" @keyup.enter="handleQuery" @clear="handleQuery"/>
      </el-form-item>
    </el-form>
    <el-table
        v-loading="loading"
        min-height="240"
        max-height="680"
        highlight-current-row
        :data="dataList"
        ref="tableRef"
        @row-click="handleSelect"
        :show-header="false">
      <el-table-column label="应用" align="left" min-width="160" :show-overflow-tooltip="true">
        <template #default="scope">
          <el-tooltip class="box-item" effect="dark" :content="scope.row.domain" placement="right">
            {{ scope.row.appCode + ':' + scope.row.appName }}
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup name="AppSelect">
import {appOptions} from "@/api/app";
import { ElTable } from 'element-plus'

const { proxy } = getCurrentInstance();
const emit = defineEmits(['select']);
const dataList = ref([]);
const loading = ref(true);

const currentRow = ref()

const queryParams = ref({
  keyword: undefined,
});
function getList() {
  loading.value = true;
  appOptions(queryParams.value).then(res => {
    dataList.value = res.data;
    if (!currentRow.value && dataList.value.length > 0) {
      currentRow.value = dataList.value[0];
      proxy.$refs["tableRef"].setCurrentRow(currentRow.value);
      handleSelect(currentRow.value);
    }
  }).finally(() => {
    loading.value = false;
  });
}
function handleQuery() {
  getList();
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
