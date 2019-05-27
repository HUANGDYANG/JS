import config from '../config/index.js'

let debugLog = (function () {
  return config.IS_DEBUG ? console.log : function () {}
})()
/**
 * 格式化时间
 * @param {*} time
 * @param {*} cFormat
 */
function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const TIME_STR = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return TIME_STR
}

/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
  // 格式化传入时间
  let date = new Date(parseInt(time)),
    year = date.getUTCFullYear(),
    month = date.getUTCMonth(),
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getUTCMinutes()
  // 获取当前时间
  let currentDate = new Date(),
    currentYear = date.getUTCFullYear(),
    currentMonth = date.getUTCMonth(),
    currentDay = currentDate.getDate()
  // 计算是否是同一天
  if (currentYear == year && currentMonth == month && currentDay == day) { //同一天直接返回
    if (hour > 12) {
      // return `下午 ${hour}:${minute < 10 ? '0' + minute : minute}`
      return `${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
      // return `上午 ${hour}:${minute < 10 ? '0' + minute : minute}`
      return `${hour}:${minute < 10 ? '0' + minute : minute}`
    }
  }
  // 计算是否是昨天
  let yesterday = new Date(currentDate - 24 * 3600 * 1000)
  if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth && day == yesterday.getDate()) { //昨天
    return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
  } else {
    return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
  }
}

function cmpObjArr(arr, prop) {
  function compare(property) {
    return (a, b) => {
      return a[property] - b[property]
    }
  }
  return arr.sort(compare(prop))
}

/**
 *  去掉所有的html标签和&nbsp;之类的特殊符合
 * @param {*} str
 */
function deleteHtmlTag(str) {
  str = str.replace(/<[^>]+>|&[^>]+;/g, '').trim()
  return str
}

/**
 * 定时器
 * @param {*} s 秒数
 */
function sleep(s) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('promise resolved')
    }, s * 1000)
  })
}

function formatDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' + [hour, minute, second].map(formatNumber).join(':')
  )
}

function formatTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export {
  deleteHtmlTag,
  sleep,
  formatDate,
  formatTime,
  parseTime,
  cmpObjArr,
  debugLog
}