<template>
  <div class="dictionary">
    <div @click="preserveFn">保存</div>
    <div class="content-vh">
      <div>{{dictionary}}</div>
    </div>
    <footer-page class="pos-right"></footer-page>
  </div>
</template>

<script>
import dictionaryJson from '@/json/dictionaryJson/indes.json'
import { ref } from 'vue'
import { saveAs } from 'file-saver'
import tableMixin from '@/mixins/tableMixin'
export default {
  name: "index",
  mixins:[tableMixin],
  setup(){
    let dictionary = ref([])
    dictionary.value = dictionaryJson
    function preserveFn(){
      console.log(dictionary.value)
      let content = JSON.stringify(dictionary.value);
      let blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      saveAs(blob, "dictionaryJson.json");
    }
    return {
      dictionary,
      preserveFn
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/index.scss";
.dictionary{
  .dictionary-content{
    height: $vh2;
  }
}
</style>