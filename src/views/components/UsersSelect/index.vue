<template>
  <el-dialog title="用户选择器" v-model="open" width="960px" append-to-body draggable :close-on-click-modal="false">
    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>请选择用户</span>
            </div>
          </template>
          <el-form :model="queryParams" ref="queryRef" :inline="true" label-width="68px">
            <el-form-item prop="tenantCode">
              <el-input v-model="queryParams.username" placeholder="用户名" clearable style="width: 160px" @keyup.enter="handleQuery"/>
            </el-form-item>
            <el-form-item prop="tenantName">
              <el-input v-model="queryParams.nickName" placeholder="姓名 " clearable style="width: 160px" @keyup.enter="handleQuery"/>
            </el-form-item>
            <el-form-item style="float: right;">
              <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
            </el-form-item>
          </el-form>
          <el-table v-loading="loading" height="320" :data="dataList" size="small">
            <el-table-column label="用户名" align="left" prop="username" min-width="100" :show-overflow-tooltip="true" />
            <el-table-column label="姓名 " align="left" prop="nickName" min-width="100" :show-overflow-tooltip="true" />
            <el-table-column label="性别" align="left" prop="gender" min-width="80" :show-overflow-tooltip="true"/>
            <el-table-column label="状态" align="left" prop="userStatus" min-width="80" :show-overflow-tooltip="true"/>
            <el-table-column label="操作" align="center" fixed='right' width="70" class-name="small-padding fixed-width">
              <template #default="scope">
                <el-button type="text" icon="Pointer" :disabled="scope.row.checked" @click="handleCheck(scope.row)">选择</el-button>
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
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>已选择的用户</span>
            </div>
          </template>
          <el-form :inline="true" label-width="68px">
            <el-form-item style="float: right;">
              <el-button type="primary" icon="Select" @click="handleSubmit">确定</el-button>
            </el-form-item>
          </el-form>
          <el-table height="320" :data="selecteds" size="small">
            <el-table-column label="用户名" align="left" prop="username" min-width="100" :show-overflow-tooltip="true" />
            <el-table-column label="姓名 " align="left" prop="nickName" min-width="100" :show-overflow-tooltip="true" />
            <el-table-column label="操作" align="center" fixed='right' width="70" class-name="small-padding fixed-width">
              <template #default="scope">
                <el-button type="text" icon="Pointer" @click="handleUnCheck(scope.row)">取消</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script setup name="UserSelect">
import {userOptions} from "@/api/user";
import { ElTable } from 'element-plus'

defineExpose({init})
const { proxy } = getCurrentInstance();
const emit = defineEmits(['select']);
const open = ref(false);
const dataList = ref([]);
const total = ref(0);
const loading = ref(true);
const selecteds = ref([]);

const queryParams = ref({
  username: undefined,
  nickName: undefined,
});

function init() {
  dataList.value = [];
  selecteds.value = [];
  getList();
}

function getList() {
  loading.value = true;
  open.value = true;
  userOptions(queryParams.value).then(res => {
    const data = res.data;
    dataList.value = data.rows;
    total.value = data.total;
  }).finally(() => {
    loading.value = false;
  });
}
function handleQuery() {
  getList();
}

function handleCheck(row) {
  selecteds.value.push(row);
  disableCheckeds();
}

function handleUnCheck(row) {
  const newArr = [];
  for (const s of selecteds.value) {
    if (s.userCode !== row.userCode) {
      newArr.push(s);
    }
  }
  selecteds.value = newArr;
  disableCheckeds();
}

function disableCheckeds() {
  for (const d of dataList.value) {
    d.checked = false;
    for (const s of selecteds.value) {
      if (s.userCode === d.userCode) {
        d.checked = true;
        break;
      }
    }
  }
}

function handleSubmit() {
  const usernames = selecteds.value.map(s => s.username);
  emit("select", usernames);
  open.value = false;
}

</script>

<style>
.el-card__body {
  padding: 12px 6px 12px 6px !important;
}
</style>
