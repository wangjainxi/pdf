import md5 from 'md5'
import Base64 from './base64'
import Vue from 'vue'
// ish5-dev.newbanker.cn
// 验签
export const SignData = {
  signFun (data, key) {
    var o = data
    if (o !== null) {
      for (let k in o) {
        if (o[k] && Object.prototype.toString.call(o[k]) === '[object String]' && o[k].match(/\n/)) {
          o[k] = o[k].replace(/\n/g, '&abc&')
        }
      }
    }
    let appkey = key
    appkey = Base64.decode(appkey)
    let str = `${JSON.stringify(o)},${appkey}`
    return md5(str)
  },
  signNew (o) {
    let appkey = '123456'
    let paramNames = []
    for (let key in o) {
      paramNames.push(key)
    }
    paramNames.sort()
    let paramNameValue = []
    for (let i = 0, len = paramNames.length; i < len; i++) {
      let paramName = paramNames[i]
      paramNameValue.push(paramName)
      paramNameValue.push(o[paramName])
    }
    let source = appkey + paramNameValue.join('') + appkey
    return md5(source).toUpperCase()
  },
  objToString (obj) {
    let flag = false
    let str = '{'
    for (let i in obj) {
      flag = true
      str += '"' + i + '":'
      if (obj[i] instanceof Array) {
        str += '['
        let arrs = obj[i]
        for (let j = 0; j < arrs.length; j++) {
          if (arrs[j]) {
            str += '"' + arrs[j] + '"'
          } else {
            str += arrs[j]
          }
          if (j < arrs.length - 1) {
            str += ','
          }
        }
        str += ']'
      } else if (typeof obj[i] === 'object') {
        str += SignData.objToString(obj[i])
      } else if (typeof obj[i] === 'number') {
        str += obj[i]
      } else {
        str += '"' + obj[i] + '"'
      }
      str += ','
    }
    if (flag === true) {
      str = str.substring(0, str.length - 1)
    }
    str += '}'
    return str
  }
}
