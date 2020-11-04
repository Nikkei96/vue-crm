export default {
  install(Vue, options) {
    Vue.prototype.$message = text => {
      M.toast({ html: text })
    }

    Vue.prototype.$error = text => {
      M.toast({ html: `[Ошибка] ${text}` })
    }
  }
}

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1)
}