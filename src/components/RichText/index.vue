<template>
  <div>
    <quill-editor
      ref="quillRef"
      theme="snow"
      contentType="html"
      v-bind="$attrs"
      :content="value"
      @update:content="e => $emit('update:value', e)"
      :toolbar="[
        [{ size: ['small', false, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image', 'video'],
      ]"
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
