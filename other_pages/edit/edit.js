const app = getApp();
import { currentTime, existence, pagesPath, request, requestError } from '../../utils/util.js';
import { edition, version, platform, smallRoutione } from '../../config.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    orderInfo:{//订单数据
      id:1,

    },

    faceTypeArr:['圆形脸','国字脸','瓜子脸','鞋拔子脸'],//脸型arr
    browTypeArr: ['偏短','正常','偏长'],//上庭arr
    form:{
      faceType: 0,
      browType:1,
      faceText:`1.方形脸，脸型宽且角多，整体上看脸型较宽 
2.颞骨和颧骨还有腮骨宽度差不多，下巴较短且扁平，.脸部整体轮廓呈直线型且质感硬朗 
3.耳朵下方的腮部比较方且轮廓分明 
4。下巴不突出和腮骨融为一体。
`,
      disposition:`方形脸的女生：果断、刚毅、正直，拥有很高的智慧及敏锐的观察力，甚至具有超乎常人的第六感。意志非常的坚强，做事不管遇到什么困难不会退缩，都会坚持不懈，不达目的誓不甘休。`,
      browText:`上庭长度适中 ，适合有刘海的造型 ；`,
      


    }
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderId: options.id
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
  //input 数据绑定
  bindinput(e){
    let field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    })
  },
  //picker 数据绑定
  bindPickerChange(e){
    let field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    })
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

  }
})