<template>
  <div class="dictionary">
<!--    <footer-page class="pos-right"></footer-page>-->
  </div>
</template>

<script>

import { ref } from 'vue'
import tableMixin from '@/mixins/tableMixin'
export default {
  name: "index",
  mixins:[tableMixin],
  setup(){

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