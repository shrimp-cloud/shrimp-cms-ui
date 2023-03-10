<template>
   <div class="app-container">
      <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
        <el-form-item prop="position">
          <el-select v-model="queryParams.position" placeholder="位置" clearable style='width: 100px'>
            <el-option v-for="dict in BANNER_POSITION" :key="dict.value" :label="dict.label" :value="dict.value"/>
          </el-select>
        </el-form-item>
         <el-form-item prop="name">
            <el-input v-model="queryParams.name" placeholder="名称" clearable style="width: 160px" @keyup.enter="handleQuery"/>
         </el-form-item>
         <el-form-item>
           <el-date-picker v-model="dateRange" style='width: 380px' value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            <el-button icon="Refresh" @click="resetQuery">重置</el-button>
         </el-form-item>
        <el-form-item style="float: right">
          <el-button type="primary" plain icon="Plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>

      <el-table v-loading="loading" :height="tableHeight" :data="pageList">
        <el-table-column label="ID" align="center" prop="id" width="80"/>
        <el-table-column label="名称" align="left" prop="name" min-width="120" :show-overflow-tooltip="true" />
        <el-table-column label="位置" align="center" prop="position" min-width="120">
          <template #default="scope"><dict-tag :options="BANNER_POSITION" :value="scope.row.position"/></template>
        </el-table-column>
        <el-table-column prop="pic" label="图片" align="center" width="100">
          <template #default="scope">
            <el-image style='width: 40px; height: 40px' :src='scope.row.pic' :preview-src-list=[scope.row.pic]></el-image>
          </template>
        </el-table-column>
        <el-table-column label="点击次数" align="left" prop="clickCount" width="80" :show-overflow-tooltip="true"/>
        <el-table-column label="启用状态" align="left" prop="enableStatus" width="80" :show-overflow-tooltip="true"/>
        <el-table-column label="跳转地址" align="left" prop="url" min-width="160" :show-overflow-tooltip="true"/>
        <el-table-column label="描述" align="left" prop="summary" min-width="160" :show-overflow-tooltip="true"/>
        <el-table-column label="排序" align="left" prop="sort" width="80" :show-overflow-tooltip="true"/>
        <el-table-column label="修改人" align="left" prop="updateByName" width="100" :show-overflow-tooltip="true"/>
        <el-table-column label="修改时间" align="center" prop="updateTime" width="160">
          <template #default="scope"><span>{{ parseTime(scope.row.updateTime) }}</span></template>
        </el-table-column>
        <el-table-column label="创建人" align="left" prop="createByName" width="100" :show-overflow-tooltip="true"/>
        <el-table-column label="创建时间" align="center" prop="createTime" width="160">
          <template #default="scope"><span>{{ parseTime(scope.row.createTime) }}</span></template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed='right' width="160" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button type="text" icon="Edit" @click="handleUpdate(scope.row)">修改</el-button>
            <el-button type="text" icon="Delete" @click="handleDelete(scope.row)">删除</el-button>
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

<script setup name="BannerPage">
import {bannerPage, bannerRemove} from "@/api/banner";
import Edit from "./components/edit"

const tableHeight = computed(() => window.innerHeight - 216);
const { proxy } = getCurrentInstance();
const { BANNER_POSITION } = proxy.useDict("BANNER_POSITION");

const pageList = ref([]);
const loading = ref(false);
const total = ref(0);
const dateRange = ref([]);
const queryParams = ref({
  current: 1,
  size: 20,
  position: undefined,
  name: undefined,
});

function init() {
  queryParams.value.current = 1;
}

/** 查询参数列表 */
function getList() {
  loading.value = true;
  bannerPage(proxy.addDateRange(queryParams.value, dateRange.value)).then(res => {
    const data = res.data;
    pageList.value = data.rows;
    total.value = data.total;
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
  proxy.$modal.confirm('是否确认删除:"' + row.imageName + '"？').then(() => {
    bannerRemove({id: row.id}).then(res => {
      if (res.code === 1) {
        getList();
        proxy.$modal.msgSuccess("删除成功");
      } else {
        proxy.$modal.msgError('删除失败: ' + res.msg);
      }
    })
  }).catch(() => {});
}

init();
getList();
</script>
