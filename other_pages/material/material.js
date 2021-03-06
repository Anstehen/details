const app = getApp();
import { existence } from '../../utils/tools.js';
import { pictureUpload } from '../../utils/picture.js';
import { ask, askError } from '../../utils/demand.js';
import { edition, version, platform } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    cameraIcon: `${app.globalData.pictureUrl}/icon/202001072209camera.png`,
    hairLengthIcon: `${app.globalData.pictureUrl}/submission/202002211824hairLength.jpg`,
    positiveIcon: `${app.globalData.pictureUrl}/submission/202002211824positive.jpg`,
    sideViewIcon: `${app.globalData.pictureUrl}/submission/202002211824sideView.jpg`,
    wholeBodyIcon: `${app.globalData.pictureUrl}/submission/202002211825wholeBody.jpg`,
    pictureOne:"",
    pictureTwo:"",
    pictureThree:"",
    pictureFour:"",
    acceptOrderId:"",
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 正面照模板预览
  positivePreview:function(e){
    let _this = this;
    wx.previewImage({
      current: _this.data.positiveIcon, // 当前显示图片的http链接
      urls: [_this.data.positiveIcon] // 需要预览的图片http链接列表
    })
  },
  // 侧面照模板预览
  sidePreview: function (e) {
    let _this = this;
    wx.previewImage({
      current: _this.data.sideViewIcon, // 当前显示图片的http链接
      urls: [_this.data.sideViewIcon] // 需要预览的图片http链接列表
    })
  },
  // 发长照模板预览
  hairLengthPreview: function (e) {
    let _this = this;
    wx.previewImage({
      current: _this.data.hairLengthIcon, // 当前显示图片的http链接
      urls: [_this.data.hairLengthIcon] // 需要预览的图片http链接列表
    })
  },
  // 全身照模板预览
  whokePreview: function (e) {
    let _this = this;
    wx.previewImage({
      current: _this.data.wholeBodyIcon, // 当前显示图片的http链接
      urls: [_this.data.wholeBodyIcon] // 需要预览的图片http链接列表
    })
  },
  // 正面照图片
  choicePicture:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.different);
    let differentNumber = e.currentTarget.dataset.different;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      success(res) {
        // console.log(res.tapIndex)
        if (!res.cancel) {
          if (res.tapIndex == 0) {//从相册中选择
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['album'],
              success: function (res) {
                // console.log(res.tempFilePaths[0]);
                wx.showLoading({
                  mask:true,
                  title: '图片上传中...',
                })
                // console.log(pictureUpload(res.tempFilePaths[0]));
                pictureUpload(res.tempFilePaths[0],function(res2){
                  // console.log(res2);
                  if(differentNumber == 1 || differentNumber == '1'){
                    _this.setData({
                      pictureOne:res2
                  }) 
                  }else if(differentNumber == 2 || differentNumber == '2'){
                    _this.setData({
                      pictureTwo:res2
                  }) 
                  }else if(differentNumber == 3 || differentNumber == '3'){
                    _this.setData({
                      pictureThree:res2
                  }) 
                  }else if(differentNumber == 4 || differentNumber == '4'){
                    _this.setData({
                      pictureFour:res2
                  }) 
                  }
                });
              }
            })
          } else {
            // console.log('拍照');
            wx.chooseImage({
              count: 1,
              sizeType: ['original', 'compressed'],
              sourceType: ['camera'],
              success: function (res) {
                // console.log(res);

              }
            })
          }
        }
      },
      fail(res) {
        // console.log(res.errMsg)
      }
    })
  },
  // 下一步点击
  nextStep:function(){
    let _this = this;
    if(_this.data.pictureOne == ""){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '请上传正面照',
      })
      return
    }else if(_this.data.pictureTwo == ""){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '请上传侧面照',
      })
      return
    }else if(_this.data.pictureThree == ""){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '请上传发长照',
      })
      return
    }else if(_this.data.pictureFour == ""){
      wx.showToast({
        icon:'none',
        mask:true,
        title: '请上传全身照',
      })
      return
    }
    app.globalData.pictureObj = {
      imageOne:_this.data.pictureOne,
      imageTwo:_this.data.pictureTwo,
      imageThree:_this.data.pictureThree,
      imageFour:_this.data.pictureFour,
    }
    wx.navigateTo({
      url: `../material_news/material_news?transorderid=${_this.data.acceptOrderId}`,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    app.globalData.pictureObj = null;
    _this.setData({
      acceptOrderId: options.transorderid
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: "您的专属发型师为您提供方案",
      path: "/pages/transition/transition",
      imageUrl: "https://hzweirui.oss-cn-hangzhou.aliyuncs.com/smallProgram/homePage/202002191115picture.jpg",
      success: (res) => {
      }
    }
  }
})