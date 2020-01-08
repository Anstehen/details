const geo = () =>{
  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res);
      let latitude = res.latitude;
      let longitude = res.longitude;
      // qqmapsdk.reverseGeocoder({  //逆地址解析
      //   location: {
      //     latitude: latitude,
      //     longitude: longitude
      //   },
      //   coord_type: 1,
      //   get_poi: 1,
      //   success: (res1) => {
      //     // console.log(res1);
      //     let transfer = res1.result;
      //     app.globalData.locationObject = transfer;
      //   },
      //   fail: function (error) {
      //     // console.error(error);
      //   },
      //   complete: function (res) {
      //     // console.log(res);
      //   }
      // })
    }
  })
}
module.exports = {
  geo: geo
}