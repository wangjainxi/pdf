import { getCookie } from '@/utils/cookie'
import { SignData } from '@/utils/sign/sign'
import qs from 'qs'
import {
  timeFormatNow
} from '@/utils/com-methods'
import {
  merge
} from 'lodash'

/* 保险接口 */
export function insApi ({config, host, app}) {
  // let open = config.headers.open
  // let token = ''
  // if (process.server) {
  //   token = app.req.cookies.token || ''
  // } else {
  //   token = getCookie('token') || ''
  // }

  let handleCfg = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  // if (token && !open) {
  //   handleCfg.headers['Authorization'] = `bearer ${token}`
  // } else {
  //   handleCfg.headers['clientHost'] = host
  // }
  handleCfg.headers['clientHost'] = host
  // let handleCfg = {
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8',
  //     'clientHost': host
  //   }
  // }
  return handleCfg
}

/* 展业接口 */
export function marketingApi () {
  let handleCfg = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'serviceChannel': 'WBS'
    }
  }
  return handleCfg
}

/* 展业Form接口 */
export function marketingApiForm ({config}) {
  let handleCfg = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      'serviceChannel': 'WBS'
    }
  }
  handleCfg.data = qs.stringify(config.data)
  return handleCfg
}

/* wbs老接口 */
export function wbsApiCom ({config, app}) {
  let handleCfg = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  if (config.method = 'POST') {
    let appkey = decodeURIComponent(app.query.appkey)
    let _data = {}
    if (process.server) {
      _data.token = app.req.cookies[app.query.entId + 'token'] || ''
    } else {
      _data.token = getCookie('token') || ''
    }
    _data = merge(_data, config.data)
    _data.sign = SignData.signFun(_data.param, appkey)
    _data = `data=${JSON.stringify(_data)}`
    handleCfg.data = _data
  }
  return handleCfg
}

/* wbs新接口 */
export function wbsApiNew ({config, app}) {
  let handleCfg = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  if (process.server) {
    handleCfg.headers.token = app.req.cookies[app.query.entId + 'token'] || ''
  } else {
    handleCfg.headers.token = getCookie('token') || ''
  }
  let _data = {}
  _data.timestamp = timeFormatNow()
  _data.app_key = 'test'
  _data.format = 'json'
  _data.version = ''
  if (process.server) {
    _data.access_token = app.req.cookies[app.query.entId + 'token'] || ''
  } else {
    _data.access_token = getCookie('token') || ''
  }
  _data = merge(_data, config.data)
  _data.data = encodeURIComponent(JSON.stringify(_data.data))
  _data.sign = SignData.signNew(_data)
  handleCfg.data = _data
  return handleCfg
}
/* wbs上传图片接口 */
export function wbsApiNewFS ({config, app}) {
  let handleCfg = {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }
  if (process.server) {
    handleCfg.headers.token = app.req.cookies[app.query.entId + 'token'] || ''
  } else {
    handleCfg.headers.token = getCookie('token') || ''
  }
  handleCfg.headers.auth = 123456
  let _data = {}
  _data.timestamp = timeFormatNow()
  _data.app_key = 'test'
  _data.format = 'json'
  _data.version = ''
  _data = merge(_data, config.data.params)
  _data.data = encodeURIComponent(JSON.stringify(_data.data))
  _data.sign = SignData.signNew(_data)
  let data = config.data.data
  data.append('isPubRead', 1)
  data.append('body_data', JSON.stringify(_data))
  handleCfg.data = data
  return handleCfg
}
