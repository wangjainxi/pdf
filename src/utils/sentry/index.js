/**
 * Sentry Config
 *
 * Origin: https://01ba7bbfa1214e9481eb2c6f2a2f4181@sentry.newbanker.cn/8
 * Nginx: https://$HOST/sentry/api/ => https://sentry.newbanker.cn/api/
 * $HOST为租户域名
 */

export default (Vue, secret = `01ba7bbfa1214e9481eb2c6f2a2f4181`, projectId = 8) => {
  if (process.env.NODE_ENV === 'production') {
    const Raven = require('raven-js')
    const RavenVue = require('raven-js/plugins/vue')
    const {host} = window.location
    let dsn = `https://${secret}@sentry.newbanker.cn/${projectId}`

    Raven
      .config(dsn)
      .addPlugin(RavenVue, Vue)
      .install()
  }
}
