const app = getApp();
const QQMapWX = require('../lib/qqmap-wx-jssdk.js');
// 实例化API核心类
const qqmapsdk = new QQMapWX({
  key: 'YIJBZ-M2VWF-X54J5-NITUC-YM6BQ-6EBYA' // 必填
});
const geo = (callback) =>{
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      // console.log(res);
      let latitude = res.latitude;
      let longitude = res.longitude;
      qqmapsdk.reverseGeocoder({  //逆地址解析
        location: {
          latitude: latitude,
          longitude: longitude
        },
        coord_type: 1,
        get_poi: 1,
        success: (res1) => {
          // console.log(res1);
          let transfer = res1.result;
          callback(transfer);
        },
        fail: function (error) {
          // console.error(error);
        },
        complete: function (res) {
          // console.log(res);
        }
      })
    }
  })
}
module.exports = {
  geo: geo
}