const random = () =>{
  let num = '';
  for (var i = 0; i < 3; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num
}
module.exports = {
  random: random
}