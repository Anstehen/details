//app.js
App({
  onLaunch: function () {
    let _this = this;
    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // console.log('onCheckForUpdate====', res)
        // 请求完新版本信息的回调
        if (res.hasUpdate) {
          // console.log('res.hasUpdate====')
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                // console.log('success====', res)
                // res: {errMsg: "showModal: ok", cancel: false, confirm: true}
                if (res.confirm) {
                  // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
    // 获取当前设备信息
    wx.getSystemInfo({
      success(res) {
        // console.log(res);
        _this.globalData.systemInfo = res;
      }
    })
    // 清除缓存
    wx.clearStorageSync('userInformation');
    wx.clearStorageSync('orderInfo');
  },
  onError(Error) {
    let title = "系统通知";
    let notice = "出错啦";
    wx.navigateTo({
      url: 'other_pages/error/error?title=' + title + "&notice=" + notice,
    })
  },
  globalData: {
    pictureUrl:"https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/icon",
    systemInfo: null,//客户端设备信息
    pictureObj:null,//用户资料上传的上传照片
  }
})