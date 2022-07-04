<template>
  <div>
    <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        multiple
        :limit="3"
        :file-list="fileList"
    >
      <el-button size="small" type="primary">上传json文件</el-button>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "prefab-json",
  data(){
    return {
      fileList: []
    }
  },
  methods: {
    handlePreview(file) {
      console.log(file)
    }
  }
}
</script>

<style scoped>

</style>