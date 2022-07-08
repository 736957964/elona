module.exports = {
  // 整个项目使用全局的scss变量
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/index.scss";`,
      },
    },
  },
}