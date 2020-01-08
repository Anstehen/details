const gender = () =>{
  let genderArr = ['女', '男'];
  return genderArr
}
const stature = () =>{
  let statureArr = [];
  for(var i = 100; i <= 236; i++){
    statureArr = statureArr.concat(i);
  }
  return statureArr
}
const heavy = () => {
  let heavyArr = [];
  for (var i = 40; i <= 120; i++) {
    heavyArr = heavyArr.concat(i);
  }
  return heavyArr
}
module.exports = {
  gender: gender,
  stature: stature,
  heavy: heavy
}