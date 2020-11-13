const methods = {
  copy ({value, isRaiseInf}) {
    if (navigator.userAgent.match(/iPad|iPhone/i) && !isRaiseInf) {
      this.$toast('长按选择复制')
    } else {
      let oInput = document.getElementById("copyInfo")
      if (!oInput) {
        oInput = document.createElement('input')
        oInput.setAttribute('style', 'opacity: 0;position: fixed;top:0')
        oInput.setAttribute('id', 'copyInfo')
        document.body.appendChild(oInput)
      }
      oInput.value = value
      oInput.select() // 选择对象
      let copyType = document.execCommand("Copy") // 执行浏览器复制命令
      if (copyType) {
        this.$toast.success('复制成功')
      } else {
        if (isRaiseInf) {
          prompt('请选中弹框的值，手动复制', value)
        } else {
          this.$toast('长按选择复制')
        }
      }
      document.body.removeChild(oInput)
    }
  }
}
export default {
  methods
}
