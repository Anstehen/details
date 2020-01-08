const existence = (val) => {
  let longitudeNumber = true;
  (val && val != undefined && val != null && val != "undefined" && val != "null") ? (longitudeNumber = true) : (longitudeNumber = false);
  return longitudeNumber
}
module.exports = {
  existence: existence
}