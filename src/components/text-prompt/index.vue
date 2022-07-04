<template>
  <div ref="telescopicAssembly" class="telescopicAssembly">
    <el-tooltip :disabled="!isShow" :content="textData" :placement="placement" :open-delay="openDelay">
      <div ref="assemblyText" class="assemblyText" @mouseover="mouseover" @mouseout="mouseout">{{ textData }}</div>
    </el-tooltip>
  </div>
</template>

<script>
// 文本提示框,目前默认只有显示省略号的才显示
export default {
  name: '',
  filters: {
    ellipsis(value) {
      return false
    }
  },
  props: {
    // 显示的数据
    textData: { type: String, default: '' },
    // 设置最小宽度
    minWidth: { type: Number, default: 30 },
    // 设置最大宽度,超出部分显示省略号 0不生效
    maxWidth: { type: Number, default: 0 },
    // 设置lin的高度 0不生效
    lineHeight: { type: Number, default: 0 },
    // 判定没有溢出的文字是否显示,默认不显示
    noOverflowShow: { type: Boolean, default: false },
    // 默认为 top 顶部显示 具体方位看 el-tooltip 组件
    placement: { type: String, default: 'top' },
    openDelay: { type: Number, default: 0 }
  },
  data() {
    return {
      isShow: false // 用来判定是否显示提示框
    }
  },
  watch: {
  },
  created() {
    this.initialization()
  },
  methods: {
    async initialization() {
      await this.$nextTick
      if (this.$props.minWidth) { this.$refs.assemblyText.style.minWidth = `${this.$props.minWidth}px` }
      if (this.$props.maxWidth) { this.$refs.assemblyText.style.maxWidth = `${this.$props.maxWidth}px` }
      if (this.$props.lineHeight) { this.$refs.assemblyText.style.lineHeight = `${this.$props.lineHeight}px` }
    },
    // 鼠标移入的时候
    mouseover(evt) {
      if (this.$props.noOverflowShow || this.$refs.assemblyText.scrollWidth > this.$refs.assemblyText.clientWidth) {
        this.isShow = true
      }
    },
    // 鼠标移出的时候
    mouseout() {
      this.isShow = false
    }
  }
}
</script>

<style scoped lang="scss">
.telescopicAssembly{
  position: relative;
  .suspension{
    white-space: nowrap;
    background-color: #303133;
    position: absolute;
    color: white;
    top:-25px;
    left: -2px;
    z-index: 10;
    padding: 4px;
    border-radius: 5px;
    font-size: 12px;
  }
  .assemblyText{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space:nowrap
  }
}
</style>
