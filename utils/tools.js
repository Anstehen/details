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
module.exports = {
  existence: existence,
  symbolArr:symbolArr
}