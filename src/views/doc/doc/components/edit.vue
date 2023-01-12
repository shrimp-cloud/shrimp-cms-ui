<template>
  <el-dialog :title="title" v-model="open" width="800px" append-to-body>
     <el-form ref="editRef" :model="form" :rules="rules" label-width="80px">
       <el-row>
         <el-col :span="24">
           <el-form-item label="标题" prop="title">
             <el-input v-model="form.title" placeholder="请输入标题" />
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="分类" prop="categoryCode">
             <el-tree-select
                 v-model="form.categoryCode"
                 :data="categoryOptions"
                 :render-after-expand="false"
                 default-expand-all
                 placeholder="选择分类"
                 :props="{label: 'categoryName', value: 'categoryCode', children: 'children' }"/>
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="发布状态" prop="publishStatus">
             <el-radio-group v-model="form.publishStatus">
               <el-radio v-for="dict in BOOLEAN" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
             </el-radio-group>
           </el-form-item>
         </el-col>
         <el-col :span="24">
           <el-form-item label="正文" prop="content">
             <rich-text v-model:value="form.content" ref="formContentRef" placeholder="请输入正文"/>
           </el-form-item>
         </el-col>
       </el-row>
     </el-form>
     <template #footer>
        <div class="dialog-footer">
           <el-button type="primary" @click="submitForm">确 定</el-button>
           <el-button @click="cancel">取 消</el-button>
        </div>
     </template>
  </el-dialog>
</template>

<script setup name="DocEdit">
import { docInfo,docSave, docCategoryOptions} from "@/api/doc";

defineExpose({handleEdit})
const emit = defineEmits(['change']);
const { proxy } = getCurrentInstance();
const { BOOLEAN } = proxy.useDict("BOOLEAN");

const open = ref(false);
const title = ref("");
const categoryOptions = ref([]);
const form = ref({});
const rules = ref({
  title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
  publishStatus: [{ required: true, message: "发布状态必选", trigger: "blur" }]
});

function handleEdit(row) {
  reset();
  if (!row || !row.id) {
    form.value.publishStatus = 1;
    open.value = true;
    title.value = "添加";
    getCategoryOptions();
  } else {
    docInfo({id:row.id}).then(res => {
      form.value = res.data;
      open.value = true;
      title.value = "修改";
      getCategoryOptions();
    });
  }
}
// 获取分类选择菜单
function getCategoryOptions() {
  docCategoryOptions({}).then(res => {
    const datas = res.data;
    categoryOptions.value = proxy.handleTree(datas, "categoryCode", "pcode", "children");
  });
}

/** 取消按钮 */
function cancel() {
  open.value = false;
  reset();
}

/** 表单重置 */
function reset() {
  form.value = {};
  proxy.resetForm("editRef");
}


/** 提交按钮 */
function submitForm() {
  proxy.$refs["editRef"].validate(valid => {
    if (valid) {
      docSave(form.value).then(res => {
        proxy.$modal.msgSuccess(form.value.id === undefined ?"新增成功":"修改成功");
        open.value = false;
        emit("change", true);
      });
    }
  });
}

</script>
