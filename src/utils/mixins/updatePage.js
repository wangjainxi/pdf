export const updatePage = {
  data () {
    return {
      isPageHide: false
    }
  },
  methods: {
    updatePage () {
      window.removeEventListener('pageshow', this.pageShowFun)
      window.removeEventListener('pagehide', this.pageHideFun)
      this.isPageHide = false
      window.addEventListener('pageshow', this.pageShowFun)
      window.addEventListener('pagehide', this.pageHideFun)
    },
    pageShowFun () {
      if (this.isPageHide) {
        window.location.reload()
      }
    },
    pageHideFun () {
      this.isPageHide = true
    }
  }
}
