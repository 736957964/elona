<template>
  <div ref='container' class='container-component'>
    <div ref='component' class="d2-container-full-bs">
      <div v-if="$slots.header" ref="header" class="d2-container-full__header">
        <slot name="header" />
      </div>
      <div ref="wrapper" class="d2-container-full-bs__body">
        <div class="d2-container-full-bs__body-wrapper-inner">
          <slot />
        </div>
      </div>
      <div v-if="$slots.footer" ref="footer" class="d2-container-full__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: 'd2-container',
  methods: {
    async install(){
      await this.$nextTick()
    }
  }
}
</script>

<style scoped lang="scss">
  @import "~@/assets/index.scss";
  .container-component{
    width: 100%;
    height: 100%;
    position: relative;
    .d2-container-full-bs{
      padding: 10px;
      height: 100%;
      .d2-container-full__footer{
        width: 100%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: end;
        height: 50px;
        right: 0;
        bottom: 0;
        border-top: 1px solid $color-border-1;
      }
    }
  }
</style>