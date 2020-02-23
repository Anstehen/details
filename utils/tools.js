// 判断值是否存在
const existence = (val) => {
  let longitudeNumber = true;
  (val && val != undefined && val != null && val != "undefined" && val != "null") ? (longitudeNumber = true) : (longitudeNumber = false);
  return longitudeNumber
}
// 根据传入的特殊符号（例如：竖线、冒号）来分解为数组
const symbolArr = (val1,val2) =>{
  let strOne = val1;
  let signStr = val2;
  let returnArr = [];
  if(strOne.indexOf(signStr) == -1){
    returnArr = returnArr.concat(strOne);
  }else{
    returnArr = strOne.split(signStr);
  }
  return returnArr
}
// 获取当前时间
const dataStr = (val) =>{
  let date = new Date();
  let strOne = date.getYear(); //获取当前年份(2位)
  console.log("11111111111")
  console.log(strOne)
  date.getFullYear(); //获取完整的年份(4位)
  date.getMonth(); //获取当前月份(0-11,0代表1月)
  date.getDate(); //获取当前日(1-31)
  date.getDay(); //获取当前星期X(0-6,0代表星期天)
  date.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
  date.getHours(); //获取当前小时数(0-23
  date.getMinutes(); //获取当前分钟数(0-59)
  date.getSeconds(); //获取当前秒数(0-59)
  date.getMilliseconds(); //获取当前毫秒数(0-999)
  date.toLocaleDateString(); //获取当前日期
  var mytime = date.toLocaleTimeString(); //获取当前时间
  date.toLocaleString(); //获取日期与时间
  if(val == 1){
    return strOne
  }
}
module.exports = {
  existence: existence,
  symbolArr:symbolArr,
  dataStr: dataStr
}