<template>
  <div class="mode">
    <configuration-mods></configuration-mods>
  </div>
</template>

<script>
import configurationMods from '@/components/configuration-mods'
export default {
  name: "index",
  components:{
    configurationMods
  },
  setup(){

  }
}
</script>

<style scoped>
  .mode{
    height: 100%;
  }
</style>