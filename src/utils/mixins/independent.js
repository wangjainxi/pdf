export const independent = {
  data () {
    return {
      independent: -1,
      advisorStatus: -1,
      companyInfo: {}
    }
  },
  methods: {
    async updateAccountants ({accountants, hasAccount}) {
      if (hasAccount) {
        console.log(accountants)
        window.sessionStorage.setItem('faOutId', accountants.faOutId)
        // 有理财师
        this.aboutAccountants =  accountants || {}
        this.independent = accountants.independent
        this.advisorStatus = accountants.status
        this.$store.commit('WBS_SET_INDEPENDENT', accountants.independent)
        this.$store.commit('WBS_SET_ADVISORSTATUS', accountants.status)
        // 允许分享
        if (this.isShare) {
          if ((accountants.independent === 1 && accountants.status !== 1) || (accountants.independent === 0 && accountants.status === 4)) {
            this.$store.commit('MARKETING_ISHIDECARD', false)
            let companyInfo = await this.$getCardCompany() || {}
            this.$store.commit('WBS_SET_FAOUTID', accountants.faOutId)
            // this.$store.commit('WBS_SET_INDEPENDENT', accountants.independent)
            // this.$store.commit('WBS_SET_ADVISORSTATUS', accountants.status)
            this.setShare({
              type: 1,
              faOutId: accountants.faOutId,
              aboutAccountants: companyInfo
            })
          } else if (accountants.independent === 0 && accountants.status !== 4) {
            this.setShare({
              type: 0,
              faOutId: accountants.faOutId,
              aboutAccountants: accountants
            })
          } else if (accountants.independent === 1 && accountants.status === 1) {
            this.setShare({
              type: 1,
              faOutId: accountants.faOutId,
              aboutAccountants: accountants
            })
          }
        }
      } else {
        // 没有理财师
        this.companyInfo = await this.$getCardCompany() || {}
        console.log('companyInfo:')
        console.log(this.companyInfo)
        this.independent = -1
        this.advisorStatus = -1
        this.$store.commit('MARKETING_ISHIDECARD', false)
        window.sessionStorage.setItem('faOutId', -1)
        this.$store.commit('WBS_SET_FAOUTID', -1)
        this.$store.commit('WBS_SET_INDEPENDENT', -1)
        this.$store.commit('WBS_SET_ADVISORSTATUS', -1)
        if (this.isShare) {
          // 允许分享
          this.setShare({
            type: 1,
            faOutId: accountants.faOutId,
            aboutAccountants: this.companyInfo
          })
        }
      }
    }
  }
}
