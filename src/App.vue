<template>
  <router-view />
</template>

<script>

export default {
  name: 'App',
  data() {
    return{
      map: null,
    }
  },
  components: {

  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss">
#container{
  padding:0px;
  margin: 0px;
  width: 100%;
  height: 800px;
}
@import "~@/assets/index.scss";
</style>