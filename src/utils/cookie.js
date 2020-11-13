import { GetQueryString } from './com-methods'
export function setCookie (name,value,Days = 1) {
  let exp = new Date()
  exp.setTime(exp.getTime() + Days*24*60*60*1000);
  document.cookie = GetQueryString('entId') + name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/"
}

export function getCookie (name) {
  let arr,reg = new RegExp("(^| )"+ GetQueryString('entId') + name+"=([^;]*)(;|$)")
  if(arr = document.cookie.match(reg))
    return unescape(arr[2])
  else
    return null
}

export function delCookie($name){
  var myDate=new Date()
  myDate.setTime(-1000)//设置时间
  document.cookie=GetQueryString('entId') + $name+"=''; expires="+myDate.toGMTString()+";path=/"
}
