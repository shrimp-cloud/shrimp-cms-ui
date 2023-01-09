<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
      <el-form-item prop="author">
        <el-input v-model="queryParams.author" placeholder="作者" clearable style="width: 160px" @keyup.enter="handleQuery"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery" v-hasPermi="['page']">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" icon="Plus" @click="handleAdd" v-hasPermi="['create']">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" height="680" :data="dataList">
      <el-table-column label="ID" align="center" prop="id" width="80"/>
      <el-table-column label="作者" align="left" prop="author" min-width="120" />
      <el-table-column label="赞" align="left" prop="praiseTimes" min-width="120"/>
      <el-table-column label="内容" align="left" prop="mainContent" min-width="240" :show-overflow-tooltip="true"/>
      <el-table-column label="修改人" align="left" prop="updateBy" width="100" :show-overflow-tooltip="true"/>
      <el-table-column label="修改时间" align="center" prop="updateTime" width="160">
        <template #default="scope"><span>{{ parseTime(scope.row.updateTime) }}</span></template>
      </el-table-column>
      <el-table-column label="创建人" align="left" prop="createBy" width="100" :show-overflow-tooltip="true"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="160">
        <template #default="scope"><span>{{ parseTime(scope.row.createTime) }}</span></template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed='right' width="160" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button type="text" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['update']">修改</el-button>
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

    <edit ref="editRef" @change="getList"/>
  </div>
</template>

<script setup name="MottoPage">
import {mottoPage, mottoRemove} from "@/api/motto";
import Edit from "./components/edit"

const { proxy } = getCurrentInstance();
const dataList = ref([]);
const loading = ref(true);
const total = ref(0);
const queryParams = ref({
  current: 1,
  size: 20,
  author: undefined,
});

/** 查询参数列表 */
function getList() {
  loading.value = true;
  mottoPage(queryParams.value).then(res => {
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

function handleAdd() {
  proxy.$refs["editRef"].handleEdit();
}
function handleUpdate(row) {
  proxy.$refs["editRef"].handleEdit(row);
}

/** 删除按钮操作 */
function handleDelete(row) {
  proxy.$modal.confirm('是否确认删除内容: "' + row.mainContent + '"？').then(() => {
    mottoRemove({id: row.id}).then(res => {
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
