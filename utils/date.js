const oDate = new Date()
let Y = oDate.getFullYear(),
    M = oDate.getMonth() + 1,
    D = oDate.getDate(),
    timesmap = oDate.getTime()

function addZero(val){
  return val < 10 ? '0' + val:val 
}

function lastDat(y,m){
  
}

// 今天
const today = () => Y + '-' + addZero(M) + '-' + addZero(D) 
// 昨天
const yesterday = () =>{
  let yest = timesmap - 24*60*60*1000
  let date = new Date(yest)
  let y = date.getFullYear(),
      m = date.getMonth() + 1,
      d = date.getDate()
  return y + '-' + addZero(m) + '-' + addZero(d)
}
// 本周第一天
const weekFirstDay = () =>{
  let yest = timesmap - (oDate.getDay() - 1) * 24 * 60 * 60 * 1000
  let date = new Date(yest)
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate()
  return y + '-' + addZero(m) + '-' + addZero(d)
}
// 7天前
const sevenDaysAgo = () => {
  let yest = timesmap - 7 * 24 * 60 * 60 * 1000
  let date = new Date(yest)
  let y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate()
  return y + '-' + addZero(m) + '-' + addZero(d)
}
// 本月第一天
const monthFirstDay = () => Y + '-' + addZero(M) + '-' + '01'

module.exports = {
  today,
  yesterday,
  weekFirstDay,
  monthFirstDay,
  sevenDaysAgo
}

