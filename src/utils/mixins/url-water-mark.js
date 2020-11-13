export const waterMark = {
  methods: {
   async getHandleUrls (data) {
      let params = {
        data: data,
        name: 'fs.pdf.noSignWatermark'
      }
      let res = await this.$store.dispatch('NEW_WBS_FS', params)
      return res
    }
  }
}
