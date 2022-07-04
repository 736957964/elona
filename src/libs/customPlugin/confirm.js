const myConfirm = (text, vm) => {
  return new Promise((resolve, reject) => {
    vm.$confirm(text + '?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        resolve()
      })
      .catch(() =>
        vm.$message({
          message: '已取消',
          type: 'info'
        })
      )
  })
}

export function confirm(text, vm) {
  return myConfirm(text, vm)
}