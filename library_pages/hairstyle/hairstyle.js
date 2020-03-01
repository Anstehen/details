const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { pictureUpload } from '../../utils/picture.js';
import { edition, version, platform, smallRoutione, editInsertHairstyle, editInsertHairstyleTitle, editUpdateHairstyle, editUpdateHairstyleTitle } from '../../config.js';
let refreshJudge = false;
// 数组、对象转换为JSON字符串:JSON.stringify(object或arr).toString()
// JSON字符串转换为数组、对象:JSON.parse(object或arr)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: app.globalData.systemInfo.statusBarHeight,//状态栏高度
    screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    addressIcon: `${app.globalData.pictureUrl}/icon/address.png`,
    deleteIcon: `${app.globalData.pictureUrl}/icon/delete.png`,
    editIcon: `${app.globalData.pictureUrl}/icon/edit.png`,
    addIcon: `${app.globalData.pictureUrl}/icon/202002241817add.png`,
    phoneValues:"",
    readyValues:"",
    carefulValues:"",
    dots:true,
    circular:true,
    autoplay:true,
    interval:3500,
    pageDifferent:0,//0是添加，1是修改
    dataObject:null,
    typeArr:['照片','视频','取消']
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 本地库选择
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value);
    let _this = this;
    let bearingObject = _this.data.dataObject;
    _this.setData({
      index: e.detail.value
    })
    if (e.detail.value == 0){//图片
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: function (res) {
          // console.log(res.tempFilePaths[0]);
          wx.showLoading({
            mask: true,
            title: '图片上传中...',
          })
          // console.log(pictureUpload(res.tempFilePaths[0]));
          pictureUpload(res.tempFilePaths[0], function (res2) {
            // console.log(res2);
            wx.showToast({
              icon: 'none',
              title: '添加成功!',
            })
            let newObject = {
              type:1,
              picture: res2
            }
            bearingObject.recommend = bearingObject.recommend.concat(newObject);
            _this.setData({
              dataObject: bearingObject
            })
          });
        }
      })
    } else if (e.detail.value == 1){//视频
      wx.chooseVideo({
        sourceType: ['album', 'camera'],
        maxDuration: 60,
        camera: 'back',
        success(res) {
          // console.log(res.tempFilePath);
          wx.showLoading({
            mask: true,
            title: '视频上传中...',
          })
          // console.log(pictureUpload(res.tempFilePaths[0]));
          pictureUpload(res.tempFilePath, function (res3) {
            console.log(res3);
            wx.showToast({
              icon: 'none',
              title: '添加成功!',
            })
            let newObject = {
              type: 2,
              picture: res3
            }
            bearingObject.recommend = bearingObject.recommend.concat(newObject);
            _this.setData({
              dataObject: bearingObject
            })
          });
        }
      })
    }
  },
  // 清空
  cleanClick:function(e){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您确定要清空发型图片么？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          let bearingObject = _this.data.dataObject;
          bearingObject.recommend = [];
          _this.setData({
            dataObject: bearingObject
          })
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 设计师联系方式
  phoneInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingObject = _this.data.dataObject;
    bearingObject.shop.mobilePhone = e.detail.value;
    bearingObject.shopNumber = e.detail.value;
    _this.setData({
      phoneValues:e.detail.value,
      dataObject: bearingObject
    })
  },
  // 店铺---删除
  storeDeleteClick:function(e){
    let _this = this;
    if (!existence(_this.data.dataObject.shop.shopName)){
      wx.showToast({
        icon:'none',
        title: '您还没有选择店铺，请先选择!',
      })
      return
    }
    wx.showModal({
      title: '提示',
      content: '您确定要删除该推荐的商店么?',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          let bearingObject = _this.data.dataObject;
          bearingObject.shop = {
            creatTime: null,
            haircutPrice: null,
            ironingPrice: null,
            mobilePhone: null,
            shopAddress: null,
            shopAddressphoto: null,
            shopAfter: null,
            shopBefore: null,
            shopCity: null,
            shopId: null,
            shopImgs: null,
            shopName: null,
            shopPhoto: null,
            shopTitle: null,
          }
          _this.setData({
            dataObject: bearingObject
          })
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 店铺---选择
  storeChoiceClick:function(e){
    let _this = this;
    refreshJudge = true;
    wx.navigateTo({
      url: '../../library_pages/store/store',
    })
  },
  // 去店铺前的准备
  readyInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingObject = _this.data.dataObject;
    bearingObject.shop.shopBefore = e.detail.value;
    bearingObject.shopBefore = e.detail.value;
    _this.setData({
      readyValues:e.detail.value,
      dataObject: bearingObject
    })
  },
  // 到店后需要注意
  carefulInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    let bearingObject = _this.data.dataObject;
    bearingObject.shop.shopAfter = e.detail.value;
    bearingObject.shopAfter = e.detail.value;
    _this.setData({
      carefulValues:e.detail.value,
      dataObject: bearingObject
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    if (_this.data.dataObject.recommend.length == 0){
      wx.showToast({
        icon:'none',
        title: '请上传发型图片或视频!',
      })
      return
    }
    if (!existence(_this.data.dataObject.shop.shopName)) {
      wx.showToast({
        icon: 'none',
        title: '请选择店铺!',
      })
      return
    }
    if (!existence(_this.data.dataObject.shop.shopBefore)) {
      wx.showToast({
        icon: 'none',
        title: '请输入到店前的准备!',
      })
      return
    }
    if (!existence(_this.data.dataObject.shop.shopAfter)) {
      wx.showToast({
        icon: 'none',
        title: '请输入到店后的准备!',
      })
      return
    }
    if (_this.data.pageDifferent == 0) {
      let para = {
        orderDetailId: app.globalData.compileObject.id,
        recommend: JSON.stringify(_this.data.dataObject.recommend).toString(),
        shop: JSON.stringify(_this.data.dataObject.shop).toString(),
        shopNumber: _this.data.dataObject.shop.mobilePhone,
        shopPrice: _this.data.dataObject.shop.ironingPrice,
        shopBefore: _this.data.dataObject.shop.shopBefore,
        shopAfter: _this.data.dataObject.shop.shopAfter,
      }
      let uploadObject = _this.data.dataObject;
      let allData = app.globalData.compileObject.orderRecommends;
      ask("post", `${editInsertHairstyle}`, para).then(res => {
        // console.log(res);
        if (res.status == 200) {
          wx.showToast({
            icon: "none",
            title: '添加成功！',
          })
          setTimeout(function () {
            wx.navigateBack({
              delta: 1
            })
          }, 1500)
        } else {
          wx.hideLoading();
          askError(wx.getStorageSync('userInformation').userId, editInsertHairstyleTitle, '数据请求出错');
        }
      }).catch(error => {
        wx.hideLoading();
        askError(wx.getStorageSync('userInformation').userId, editInsertHairstyleTitle, '数据处理出错');
      })
    } else {
      let para = {
        id: _this.data.dataObject.id,
        orderDetailId: app.globalData.compileObject.id,
        recommend: JSON.stringify(_this.data.dataObject.recommend).toString(),
        shop: JSON.stringify(_this.data.dataObject.shop).toString(),
        shopNumber: _this.data.dataObject.shop.mobilePhone,
        shopPrice: _this.data.dataObject.shop.ironingPrice,
        shopBefore: _this.data.dataObject.shop.shopBefore,
        shopAfter: _this.data.dataObject.shop.shopAfter,
      }
      ask("get", `${editUpdateHairstyle}`, para).then(res => {
        // console.log(res);
        wx.showToast({
          icon: "none",
          title: '修改成功！',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
        // if (res.status == 200) {
        //   wx.showToast({
        //     icon: "none",
        //     title: '修改成功！',
        //   })
        //   setTimeout(function () {
        //     wx.navigateBack({
        //       delta: 1
        //     })
        //   }, 1500)
        // } else {
        //   wx.hideLoading();
        //   askError(wx.getStorageSync('userInformation').userId, editUpdateHairstyleTitle, '数据请求出错');
        // }
      }).catch(error => {
        wx.hideLoading();
        askError(wx.getStorageSync('userInformation').userId, editUpdateHairstyleTitle, '数据处理出错');
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(app.globalData.hairstyleObject);
    let numberOne = 0;
    if (options.disitinguish == 0 || options.disitinguish == '0'){
      numberOne = 0;
    }else{
      numberOne = 1;
    }
    let strOne = "";
    if (existence(app.globalData.hairstyleObject.shop.mobilePhone)){
      strOne = app.globalData.hairstyleObject.shop.mobilePhone;
    }
    let strTwo = "";
    if (existence(app.globalData.hairstyleObject.shop.shopBefore)) {
      strTwo = app.globalData.hairstyleObject.shop.shopBefore;
    }
    let strThree = "";
    if (existence(app.globalData.hairstyleObject.shop.shopAfter)) {
      strThree = app.globalData.hairstyleObject.shop.shopAfter;
    }
    _this.setData({
      pageDifferent: numberOne,
      dataObject: app.globalData.hairstyleObject,
      phoneValues: strOne,
      readyValues: strTwo,
      carefulValues: strThree
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
    let _this = this;
    if (refreshJudge){
      refreshJudge = false;
      let bearingObject = _this.data.dataObject;
      bearingObject.shop = app.globalData.shop;
      let strOne = "";
      if (existence(app.globalData.shop.mobilePhone)) {
        strOne = app.globalData.shop.mobilePhone;
      }
      let strTwo = "";
      if (existence(app.globalData.shop.shopBefore)) {
        strTwo = app.globalData.shop.shopBefore;
      }
      let strThree = "";
      if (existence(app.globalData.shop.shopAfter)) {
        strThree = app.globalData.shop.shopAfter;
      }
      _this.setData({
        dataObject: bearingObject,
        phoneValues: strOne,
        readyValues: strTwo,
        carefulValues: strThree
      })
    }
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