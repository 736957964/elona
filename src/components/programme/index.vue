<template>
  <loot-one :selectPrefabs="selectPrefabs" :currentPrefabsData="currentPrefabsData" @selectPrefabsData="selectPrefabsData"></loot-one>
</template>

<script>

import lootOne from '@/components/programme/lootdropper/loot-one'
import programme from "@/mixins/programme";
export default {
  name: "index",
  mixins:[programme],
  components:{
    lootOne
  },
  setup(){

  }
}
</script>

<style scoped>

</style>