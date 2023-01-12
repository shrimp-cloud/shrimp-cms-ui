<template>
  <div>
    <quill-editor
      ref="quillRef"
      theme="snow"
      contentType="html"
      v-bind="$attrs"
      :content="value"
      @update:content="e => $emit('update:value', e)"
    />
  </div>
</template>


<script setup>
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import request from '@/utils/request';

const { value } = defineProps({
  value: {
    type: String,
    default: undefined,
  },
});
const emit = defineEmits(['update:value']);
const { proxy } = getCurrentInstance();


onMounted(() => {
});
</script>
<style>
.ql-toolbar {
  line-height: 1.5em;
}
.ql-container {
  min-height: 150px;
}
</style>
