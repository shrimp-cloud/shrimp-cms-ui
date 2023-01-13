<template>
  <el-dialog :title="title" v-model="open" width="960px" append-to-body draggable :close-on-click-modal="false">
     <el-form ref="editRef" :model="form" :rules="rules" label-width="120px">
       <el-row :gutter="20">
         <el-col :span="12">
           <el-form-item label="名称" prop="name">
             <el-input v-model="form.name" placeholder="请输入名称" />
           </el-form-item>
           <el-form-item label="位置" prop="position">
             <el-select v-model="form.position" placeholder="位置" clearable style='width: 600px'>
               <el-option v-for="dict in BANNER_POSITION" :key="dict.value" :label="dict.label" :value="dict.value"/>
             </el-select>
           </el-form-item>
           <el-form-item label="跳转地址" prop="url">
             <el-input v-model="form.url" placeholder="请输入 跳转地址" />
           </el-form-item>
           <el-form-item label="排序" prop="sort">
             <el-input v-model="form.sort" placeholder="排序" type="number"/>
           </el-form-item>
           <el-form-item label="描述" prop="summary">
             <el-input v-model="form.summary" placeholder="请输入描述" />
           </el-form-item>
         </el-col>
         <el-col :span="12">
           <el-form-item label="状态" prop="enableStatus">
             <el-radio-group v-model="form.enableStatus">
               <el-radio v-for="dict in ENABLE_STATUS" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
             </el-radio-group>
           </el-form-item>
           <el-form-item label="图片" prop="pic">
             <image-upload :fileSize="1" :limit="1" busnessType="banner" v-model:modelValue="form.pic"/>
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

<script setup name="BannerEdit">
import {bannerInfo, bannerSave} from "@/api/banner";

const { proxy } = getCurrentInstance();
const { BANNER_POSITION, ENABLE_STATUS } = proxy.useDict("BANNER_POSITION", "ENABLE_STATUS");

defineExpose({handleEdit})
const emit = defineEmits(['change']);

const open = ref(false);
const loading = ref(false);
const title = ref("");
const form = ref({});
const rules = ref({
  name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
  position: [{ required: true, message: "位置不能为空", trigger: "blur" }],
  pic: [{ required: true, message: "图片不能为空", trigger: "blur" }],
  enableStatus: [{ required: true, message: "状态不能为空", trigger: "blur" }],
  sort: [{ required: true, message: "排序不能为空", trigger: "blur" }]
});

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

// 新增/修改按钮操作
function handleEdit(row) {
  reset();
  if (!row || !row.id) {
    open.value = true;
    form.value.sort = 0;
    form.value.enableStatus = 1;
    title.value = "新增";
  } else {
    bannerInfo({id:row.id}).then(res => {
      form.value = res.data;
      open.value = true;
      title.value = "修改";
    });
  }
}


/** 提交按钮 */
function submitForm() {
  proxy.$refs["editRef"].validate(valid => {
    if (valid) {
      bannerSave(form.value).then(res => {
        proxy.$modal.msgSuccess(form.value.id === undefined ?"新增成功":"修改成功");
        open.value = false;
        emit("change", true);
      });
    }
  });
}

</script>
