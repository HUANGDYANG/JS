/**
 * @description: 安装vscode中插件搜索框输入any-rule
安装完毕后按F1(或者ctrl+shift+p).
输入zz可以看到正则列表.
或者输入关键词, 比如"手机".
 * @param {*}
 * @return {*}
 */
/* 合法uri */
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母 */
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 邮箱后缀 */
export function validateEmailSuffix(str) {
  const reg = /^@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return reg.test(str)
}

/* 手机号码 */
export function validateTelphone(str) {
  const reg = /^1[3|4|5|7|8]\d{9}$/
  return reg.test(str) && str.length === 11
}

/* 国内固话 */
export function validatPhone(str) {
  const reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/
  return reg.test(str) && str.length === 12
}