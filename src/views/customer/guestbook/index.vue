<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
      <el-form-item prop="mobile">
        <el-input v-model="queryParams.mobile" placeholder="手机号" clearable style="width: 160px" @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="userCode">
        <el-input v-model="queryParams.userCode" placeholder="用户编码" clearable style="width: 160px" @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input v-model="queryParams.nickName" placeholder="用户名" clearable style="width: 160px" @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery" v-hasPermi="['page']">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :height="tableHeight" :data="dataList">
      <el-table-column label="ID" align="center" prop="id" width="80"/>
      <el-table-column label="用户编码" align="left" prop="userCode" min-width="120" :show-overflow-tooltip="true"/>
      <el-table-column label="用户名" align="left" prop="nickName" min-width="120" :show-overflow-tooltip="true"/>
      <el-table-column label="手机号" align="left" prop="mobile" min-width="120" :show-overflow-tooltip="true"/>
      <el-table-column label="邮箱" align="left" prop="email" min-width="160" :show-overflow-tooltip="true"/>
      <el-table-column label="留言消息" align="left" prop="message" min-width="200" :show-overflow-tooltip="true"/>
      <el-table-column label="处理状态" align="left" prop="processingStatus" min-width="100" :show-overflow-tooltip="true"/>
      <el-table-column label="处理人" align="left" prop="processingUserCode" min-width="120" :show-overflow-tooltip="true"/>
      <el-table-column label="处理记录" align="left" prop="processedNote" min-width="200" :show-overflow-tooltip="true"/>
      <el-table-column label="修改人" align="left" prop="updateBy" width="100" :show-overflow-tooltip="true"/>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="160">
        <template #default="scope"><span>{{ parseTime(scope.row.updateTime) }}</span></template>
      </el-table-column>
      <el-table-column label="创建人" align="left" prop="createBy" width="100" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template #default="scope"><span>{{ parseTime(scope.row.createTime) }}</span></template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed='right' width="80" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button type="text" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
        v-show="total > 0"
        :total="total"
        v-model:page="queryParams.current"
        v-model:limit="queryParams.size"
        @pagination="getList"
    />

  </div>
</template>

<script setup name="GuestbookPage">
import {guestbookPage, guestbookRemove} from "@/api/guestbook";

const tableHeight = computed(() => window.innerHeight - 216);
const { proxy } = getCurrentInstance();
const dataList = ref([]);
const loading = ref(true);
const total = ref(0);
const queryParams = ref({
  current: 1,
  size: 20,
  userCode: undefined,
  nickName: undefined,
  mobile: undefined,
});

/** 查询参数列表 */
function getList() {
  loading.value = true;
  guestbookPage(queryParams.value).then(res => {
    const data = res.data;
    dataList.value = data.rows;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  });
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.current = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateRange.value = [];
  proxy.resetForm("queryRef");
  handleQuery();
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除内容: "' + row.id + '"？').then(() => {
    guestbookRemove({id: row.id}).then(res => {
      if (res.code === 1) {
        getList();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        proxy.$modal.msgError('删除失败: ' + res.msg);
      }
    })
  }).catch(() => {});
}

getList();
</script>
