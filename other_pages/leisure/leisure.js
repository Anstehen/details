// const app = getApp();
// import { currentTime, existence, pagesPath, request, requestError } from '../../utils/util.js';
// import { edition, version, platform, smallRoutione } from '../../config.js';
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     cardArr: [{ words: '中国文化必须课' }, { words: '住进布达拉宫' }, { words: '我是雪域最大的王' }, { words: '流浪在拉萨街头' }, { words: '我是世间最美的情郎' }, { words: '自恐多情损梵行' }, { words: '入山又怕误倾城' }, { words: '世间安得两全法' }, { words: '不负如来不负卿' }],
//     animationArr: [],
//     slideStartNumber: 0,
//     animationData: {},
//     currentCardIndex: 0,
//     currentObj: {},
//   },
//   // 触摸开始
//   touchstart: function (e) {
//     let _this = this;
//     // console.log(e.currentTarget.dataset.number);
//     // console.log(e.currentTarget.dataset.info);
//     // console.log(e.changedTouches[0].clientX);
//     let startNumber = e.changedTouches[0].clientX;
//     _this.setData({
//       slideStartNumber: startNumber,
//       currentCardIndex: e.currentTarget.dataset.number
//     })
//   },
//   // 触摸结束
//   touchend: function (e) {
//     let _this = this;
//     // console.log(e.changedTouches[0].clientX);
//     let endNumber = e.changedTouches[0].clientX;
//     let differenceNUmber = _this.data.slideStartNumber - endNumber;
//     let prositiveNumber = Math.abs(differenceNUmber);
//     // console.log(differenceNUmber);
//     // console.log(Math.abs(differenceNUmber));
//     let arrLength = _this.data.cardArr;
//     if (prositiveNumber >= 36) {//当滑动的距离大于 30 时触发
//       // 滑动到最后一张
//       if (arrLength == 1) {

//         return;
//       }
//       // 滑块滑动
//       if (differenceNUmber >= 0) {//左滑
//         // 1.0 下一页：当滑动的位置不是最后一张的时候
//         // 1.1 创建动画 一段时间内将当前卡片滑动到页面之外
//         let animationOne = wx.createAnimation({
//           duration: 600,
//           timingFunction: 'linear',
//           delay: 0,
//           transformOrigin: '50% 50% 0',
//           success: function (e) {
//             // console.log(e);
//           }
//         })
//         animationOne.translateX('-150%');
//         animationOne.translateX('-150%');
//         animationOne.translateY('-150%');
//         animationOne.rotate(60).step();
//         _this.setData({
//           animationData: animationOne.export()
//         })
//       } else if (differenceNUmber <= 0) {//右滑
//         return
//         // 2.0 下一页：当滑动的位置不是最后一张的时候
//         // 2.1 创建动画 一段时间内将当前卡片滑动到页面之外
//         let animationOne = wx.createAnimation({
//           duration: 600,
//           timingFunction: 'linear',
//           delay: 0,
//           transformOrigin: '50% 50% 0',
//           success: function (e) {
//             // console.log(e);
//           }
//         })
//         animationOne.translateX('166%');
//         animationOne.translateX('166%');
//         animationOne.translateY('166%');
//         animationOne.rotate(60).step();
//         _this.setData({
//           animationData: animationOne.export()
//         })
//       }
//       // 3.0 移动完成之后一段时间触发
//       setTimeout(function () {
//         let emptyArr = _this.data.animationArr;//收集滑动过去的卡片
//         let currentItem = arrLength.shift();//删除并返回数组的第一个元素
//         emptyArr = emptyArr.concat(currentItem);
//         _this.setData({
//           animationArr: emptyArr,
//           cardArr: arrLength,
//           animationData: {},
//           currentObj: currentItem
//         })
//       }, 600)
//     } else {
//       // 滑动小于 30 不作处理
//     }
//   },
//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {

//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })
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
  },
  // 首页点击
  indexClick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../ordinary/ordinary',
    })
  },
  // 我的点击
  minelick: function (e) {
    let _this = this;
    wx.reLaunch({
      url: '../desigener/desigener',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;

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

  }
})