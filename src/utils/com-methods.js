import { sortBy } from 'lodash'
export function timeFormat (value, linker) { // 2019-04-03 10:10:10
  if (!value) return ''
  var time = parseInt(value)
  time = time + ''
  if (time.length > 11) {
    time = parseInt(value)
  } else {
    time = parseInt(value) * 1000
  }
  var date = new Date(time)
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + currentDate + (linker || " ") + hh + ":" + mm + ":" + ss
}

export function timeFormatNow () { // 2019-04-03 10:10:10
  var date = new Date()
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return date.getFullYear() + '-' + month + '-' + currentDate + " " + hh + ":" + mm + ":" + ss
}

export function timeFormatYMDhm (value) { // 2019-04-03 10:10
  if (!value) return ''
  var time = parseInt(value)
  time = time + ''
  if (time.length > 11) {
    time = parseInt(value)
  } else {
    time = parseInt(value) * 1000
  }
  var date = new Date(time)
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  return date.getFullYear() + '-' + month + '-' + currentDate + " " + hh + ":" + mm
}

export function timeFormatYMD (value) { // 2019-04-03
  if (!value) return ''
  if (Number(value)) {
    var time = parseInt(value)
    time = time + ''
    if (time.length > 11) {
      time = parseInt(value)
    } else {
      time = parseInt(value) * 1000
    }
    var date = new Date(time)
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + currentDate
  } else {
    return value.split('T')[0]
  }
}

export function timeStrFormatYMD (value) { // 2019-04-03
  if (!value) return ''
  var time = parseInt(value)
  time = time + ''
  var date = new Date(time.substr(0, time.length-4).replace(/T/g, ' ').replace(/-/g, '/') + '+0800')
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return date.getFullYear() + '-' + month + '-' + currentDate
}

/*
* 今年就是04-03
* 不是今年就是2019-04-03
* */
export function timeFormatYMD_MD(timeValue) {
  var timeNew = Date.parse(new Date()) //当前时间
  var timeDiffer = timeNew - timeValue //与当前时间误差
  var returnTime = ''
  if (isYear (timeValue) === true){	//今年
    var returnTime = formatDateTime(timeValue).substr(5,11)
  } else if (timeDiffer > 86400000 && isYear (timeValue) === false) { //不属于今年
    var returnTime = formatDateTime(timeValue).substr(0,10)
  }
  return returnTime
}
/*
* 是今天就是09:01
* 不是今天就是 2019年02月05日 09:01
* */
export function timeFormatYMDHM_HM(value) {
  if (!value) return ''
  let time = parseInt(value)
  time = time + ''
  if (time.length > 11) {
    time = parseInt(value)
  } else {
    time = parseInt(value) * 1000
  }
  let date = new Date(time)
  let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  if (date.toDateString() === new Date().toDateString()) {
    return hh + ":" + mm
  } else {
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '年' + month + '月' + currentDate + "日 " + hh + ":" + mm
  }
}
/*
* 是今天就是09:01
* 不是今天就是 2019/02/05
* */
export function timeFormatYMDOrHM(value) {
  if (!value) return ''
  let time = parseInt(value)
  time = time + ''
  if (time.length > 11) {
    time = parseInt(value)
  } else {
    time = parseInt(value) * 1000
  }
  let date = new Date(time)
  let hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  let mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  if (date.toDateString() === new Date().toDateString()) {
    return hh + ":" + mm
  } else {
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '/' + month + '/' + currentDate
  }
}

// 月日（07-01）
export function timeFormatMD(value) {
  if (!value) return ''
  var time = parseInt(value)
  time = time + ''
  if (time.length > 11) {
    time = parseInt(value)
  } else {
    time = parseInt(value) * 1000
  }
  var date = new Date(time)
  var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  var currentDate = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  return month + '-' + currentDate
}

// 将面转成06:01
export function handleTime (val) {
  if (!val) {
    return null
  }
  var time = ''
  var branch = Math.floor(val / 60) // 计算已播放的音频分钟
  var second = Math.floor(val % 60) // 计算已播放的音频秒
  if (branch < 10 && second < 10) { // 四种情况判断显示音频以播放时间
    time = '0' + branch + ':0' + second
  } else if (branch < 10) {
    time = '0' + branch + ':' + second
  } else if (second < 10) {
    time = branch + ':0' + second
  } else {
    time = branch + ':' + second
  }
  return time
}

export function isYear (timeValue) {
  var takeNewYear = formatDateTime(new Date()).substr(0,4) //当前时间的年份
  var takeTimeValue = formatDateTime(timeValue).substr(0,4) //传入时间的年份
  return takeTimeValue == takeNewYear
}

export function formatDateTime(timeValue) {
  var date = new Date(timeValue)
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

export function GetQueryString (name, url) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
  var r = ''
  if (url) {
    let index = url.indexOf('?')
    if (index !== -1) {
      r = url.substr(index + 1).match(reg)
    } else {
      r = url.match(reg)
    }
  } else {
    r = window.location.search.substr(1).match(reg)
  }
  if (r != null) return decodeURI(r[2])
  return null
}

export function delUrlParam (ref, pendingUrl) {
  var url = pendingUrl || window.location.href
  // 如果不包括此参数
  if (url.indexOf(ref) == -1)
    return url;
  var arr_url = url.split('?');
  var base = arr_url[0];
  var arr_param = arr_url[1].split('&');
  var index = -1;
  for (let i = 0; i < arr_param.length; i++) {
    var paired = arr_param[i].split('=');
    if (paired[0] == ref) {
      index = i;
      break;
    }
  }
  if (index == -1) {
    return url;
  } else {
    arr_param.splice(index, 1);
    return base + "?" + arr_param.join('&');
  }
}

export function parseToday () {
  const MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const MONTH_ZH = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
  const WEEK_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const WEEK_ZH = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const now = new Date()
  const month = now.getMonth()
  const week = now.getDay()
  const day = now.getDate()
  return {
    monthZH: MONTH_ZH[month],
    monthEN: MONTH_EN[month],
    weekZH: WEEK_ZH[week],
    weekEN: WEEK_EN[week],
    day
  }
}
/*
* 跳转到错误页面
* statusCode 错误状态码，必须是标准状态码
* title 页面中的文本，默认是请求失败
* message 弹窗提示语
* */
export function toError ({error, res, msg, title = '请求失败', pageTitle}) {
  let message = ''
  if (msg) {
    message = msg || '请求失败'
  } else if (res) {
    console.log(res)
    message = `{${res.code || res.errorCode || '0'}}${res.msg || title || '请求失败'}`
  } else {
    message = title || '请求失败'
  }
  error(
    {
      statusCode: 403,
      title: title,
      message: message,
      pageTitle
    }
  )
}

/*
* 前端处理小数位
* num: 保留几位小数
* */
export function toFixed({val, num = 4}) {
  if(!val) return ''
  return new Number(val).toFixed(num)
}

/*
* 判断是否是iphonex、xs、xs max、xr
* */
export function isPhoneX () {
  const xSeriesConfig = [
    {
      devicePixelRatio: 3,
      width: 375,
      height: 812,
    },
    {
      devicePixelRatio: 3,
      width: 414,
      height: 896,
    },
    {
      devicePixelRatio: 2,
      width: 414,
      height: 896,
    },
  ]
  if (typeof window !== 'undefined' && window) {
    const isIOS = /iphone/gi.test(window.navigator.userAgent);
    if (!isIOS) return false
    const {devicePixelRatio, screen} = window
    const {width, height} = screen
    return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height)
  }
  return false
}

/*
* 过滤表情
* */

export function removeEmojis (string) {
  const regex = /\uD83C\uDFF4(?:\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74)\uDB40\uDC7F|\u200D\u2620\uFE0F)|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC68(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3]))|\uD83D\uDC69\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\uD83D\uDC68(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|(?:(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)\uFE0F|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:(?:\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\u200D[\u2640\u2642])|\uD83D\uDC69\u200D[\u2695\u2696\u2708])\uFE0F|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC68(?:\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])\u200D(?:\uD83C[\uDF3E\uDF73\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDB0-\uDDB3])|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC69(?:\uD83C[\uDFFB-\uDFFF])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|[#\*0-9]\uFE0F\u20E3|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270A-\u270D]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC70\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDCAA\uDD74\uDD7A\uDD90\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD36\uDDB5\uDDB6\uDDD1-\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDEEB\uDEEC\uDEF4-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])|(?:[#*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEF9]|\uD83E[\uDD10-\uDD3A\uDD3C-\uDD3E\uDD40-\uDD45\uDD47-\uDD70\uDD73-\uDD76\uDD7A\uDD7C-\uDDA2\uDDB0-\uDDB9\uDDC0-\uDDC2\uDDD0-\uDDFF])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC69\uDC6E\uDC70-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD18-\uDD1C\uDD1E\uDD1F\uDD26\uDD30-\uDD39\uDD3D\uDD3E\uDDB5\uDDB6\uDDB8\uDDB9\uDDD1-\uDDDD])/g
  return !!string ? string.replace(regex, '') : string
}

export function encryptedMobile (mobile) {
  if (mobile.length === 11) {
    const prefix = mobile.slice(0, 3)
    const subfix = mobile.slice(7, 11)
    return `${prefix}****${subfix}`
  }
}

/*
* 处理数据
* 将大于99的转换成...
* */

export function handleNum(val) {
  let num = 0
  if (val) {
    num = Number(val) > 99 ? '...' : val
  }
  return num
}

/*
* 处理数据
* 将大于99的转换成99+
* */

export function handleNumTwo (val) {
  let num = 0
  if (val) {
    num = Number(val) > 99 ? '99+' : val
  }
  return num
}

/*
* 按照字节长度限制长度
* */
export function limitTextLen (text, defaultLen) {
  if (!text) return
  let length = 0
  for (let i = 0; i < text.length; i++) {
    if (text.charCodeAt(i) > 255) {
      length += 2
    } else {
      length++
    }

    if (length > defaultLen) {
      return text.substring(0, i)
    }
    if (length === defaultLen) {
      return text.substring(0, (i + 1))
    }
  }
  return text;
}
/*
* 将手机号18515199205 转成185-1519-9205
* */
export function handleMobile (val, symbol = '-') {
  if (!val) return false
  return val.slice(0, 3) + symbol +  val.slice(3, 7) + symbol + val.slice(7, 12)
}
/*
* 将一维数组转成多维数组
* */
export function arrTrans (arr, num) { // 一维数组转换为二维数组
  const iconsArr = [] // 声明数组
  arr.forEach((item, index) => {
    const page = Math.floor(index / num) // 计算该元素为第几个素组内
    if (!iconsArr[page]) { // 判断是否存在
      iconsArr[page] = []
    }
    iconsArr[page].push(item)
  });
  return iconsArr;
}

/*
* 调用微信方法
* */
export function userWxMehthods (callback) {
  function onBridgeReady() {
    callback()
  }

  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}


/*
* 判断是否是微信环境
* */
export function isWeiXin () {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
/*
* 新判断是否需要去测评的方法
* */
export function judgeAatisfyRisk (detailRisk, myRisk) {
  // detailRisk 1低风险 2较低风险 3中等风险 4较高风险 5高风险
  // myRisk 1保守型  2稳健型 4平衡型 8进取型 16激进型
  if (Number(myRisk) === 16) {
    return true
  } else if (Number(myRisk) === 8 && Number(detailRisk) < 5) {
    return true
  } else if (Number(myRisk) === 4 && Number(detailRisk) < 4) {
    return true
  } else if (Number(myRisk) === 2 && Number(detailRisk) < 3) {
    return true
  } else if (Number(myRisk) === 1 && Number(detailRisk) === 1) {
    return true
  } else {
    return false
  }
}


export function hideWxShare () {
  function onBridgeReady() {
    WeixinJSBridge.call('hideOptionMenu')
  }

  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
    }
  } else {
    onBridgeReady()
  }
}
/*
* 距离某天还有几天
* */
export function restTime (time) {
  let setTime = new Date(time)
  let nowTime = new Date()
  let restSec = setTime.getTime() - nowTime.getTime()

  let day = parseFloat(restSec / (60*60*24*1000))
  day = Math.ceil(day)
  return day
}

/**
 * 元、万元格式化处理
 * 超万显示万元，保留4位小数
 * 不过万显示元，保留2位小数
 * 金额加逗号
 */
export function currency (val) {
  return val >= 10000
    ? round(val / 10000, 4) + '万元'
    : round(val, 2) + '元'
}

/**
* 四舍五入
*/
export function round (val, digit = 1) {
  let offset = Math.pow(10, digit)
  return Math.round(val * offset) / offset
}

/*
* 根据特定字段排序
* */

export function sort(arr, field) {
  if (arr && arr.length) {
    return sortBy(arr, (item) => {
      return item[field]
    })
  } else {
    return arr
  }
}
/*
* 微信版本大于等于7.0.12
* */
export function judgeWechatEdition () {
  const wechatInfo = navigator.userAgent.match(/MicroMessenger\/([\d\.]+)/i)
  if (!wechatInfo) {
    return false
  } else {
    const arr = wechatInfo[1].split('.')
    if (Number(arr[0]) >= 7) {
      return Number(arr[2]) >= 12;
    } else {
      return false
    }
  }
}
/* 
* //20190530083838 2019-05-03 08:38:38 => hh:mm
* */
export function handleTimeFormat (str, format = 'hh:mm') {
  console.log(str)
  if (!str) return ''
  let date = str.substr(0, 8)
  let time = str.substr(8, str.length - 1)
  date = date.substr(4, 2) + '-' + date.substr(6, 2)
  if (time && time.length > 0) {
    if (format === 'hh:mm:ss') {
      time = time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2)
    } else if (format === 'hh:mm') {
      time = time.substr(0, 2) + ':' + time.substr(2, 2)
    } else {
      time = time.substr(0, 2) + ':' + time.substr(2, 2) + ':' + time.substr(4, 2)
    }
    return date + " " + time
  } else {
    return date
  }
}