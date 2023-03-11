<template>
  <div class="app-container">

    <el-divider content-position="left">图片选择和替换</el-divider>

    <el-form ref="edit1Ref" :model="form" label-width="80px">
      <sh-image v-model="form.imageUrl"/>
    </el-form>

    <el-divider content-position="left">图片批量选择-【完不成】</el-divider>


  </div>
</template>
<script setup name="MockImageChose">
import ShImage from '@/views/components/ShImage';

const { proxy } = getCurrentInstance();
const form = ref({});
function init() {
  form.value.imageUrl = 'https://static.wkclz.com/images/avatar.jpg';
  form.value.imageUrls = 'https://static.wkclz.com/images/avatar.jpg';
}

init();
</script>
