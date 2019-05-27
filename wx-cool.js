// 小程序常用的js
/**
 * 获取data属性上的值,原生微信只能小写
 * @param {event obj} e 
 * @param {*} name 
 */
function getDataset(e, name) {
  let tempName = name.toLowerCase()
  return e.currentTarget.dataset[tempName]
}