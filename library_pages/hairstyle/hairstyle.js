const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { pictureUpload } from '../../utils/picture.js';
import { edition, version, platform, smallRoutione, orderUpdate, orderUpdateTitle } from '../../config.js';
let refreshJudge = false;
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
            bearingObject.swiperArr = bearingObject.swiperArr.concat(newObject);
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
            title: '图片上传中...',
          })
          // console.log(pictureUpload(res.tempFilePaths[0]));
          pictureUpload(res.tempFilePath, function (res2) {
            console.log(res2);
            wx.showToast({
              icon: 'none',
              title: '添加成功!',
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
          bearingObject.swiperArr = [];
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
    _this.setData({
      phoneValues:e.detail.value
    })
  },
  // 店铺---删除
  storeDeleteClick:function(e){
    let _this = this;
    if (!existence(_this.data.dataObject.storeObject.shopName)){
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
          bearingObject.storeObject = {
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
    _this.setData({
      readyValues:e.detail.value
    })
  },
  // 到店后需要注意
  carefulInput:function(e){
    let _this = this;
    // console.log(e.detail.value);
    _this.setData({
      carefulValues:e.detail.value
    })
  },
  // 确定点击
  determineClick:function(e){
    let _this = this;
    if (_this.data.dataObject.swiperArr.length == 0){
      wx.showToast({
        icon:'none',
        title: '请上传发型图片或视频!',
      })
      return
    }
    if (!existence(_this.data.dataObject.storeObject.shopName)) {
      wx.showToast({
        icon: 'none',
        title: '请选择店铺!',
      })
      return
    }
    if (!existence(_this.data.dataObject.storeObject.shopBefore)) {
      wx.showToast({
        icon: 'none',
        title: '请输入到店前的准备!',
      })
      return
    }
    if (!existence(_this.data.dataObject.storeObject.shopAfter)) {
      wx.showToast({
        icon: 'none',
        title: '请输入到店后的准备!',
      })
      return
    }
    let para = {
      id: app.globalData.compileObject.id,
    }
    let uploadObject = _this.data.dataObject;
    let allData = app.globalData.compileObject.orderRecommends;
    // console.log(uploadObject);
    if (_this.data.pageDifferent == 0){//修改
      let emptyArr = [];
      for (let i in allData){
        if (_this.data.dataObject.random == allData[i].random){
          allData[i] = _this.data.dataObject;
        }
        emptyArr = emptyArr.concat(allData[i]);
      }
      para['orderRecommends'] = emptyArr;
    }else{//添加
      para['orderRecommends'] = allData.concat(uploadObject);
    }
    console.log(para);
    ask("get", `${orderUpdate}`, para).then(res => {
      // console.log(res);
      if (res.status == 200) {
        wx.showToast({
          icon: "none",
          title: '修改成功！',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1500)
      } else {
        wx.hideLoading();
        askError("", orderUpdateTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError("", orderUpdateTitle, '数据处理出错');
    })
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
    if (existence(app.globalData.hairstyleObject.storeObject.mobilePhone)){
      strOne = app.globalData.hairstyleObject.storeObject.mobilePhone;
    }
    let strTwo = "";
    if (existence(app.globalData.hairstyleObject.storeObject.shopBefore)) {
      strTwo = app.globalData.hairstyleObject.storeObject.shopBefore;
    }
    let strThree = "";
    if (existence(app.globalData.hairstyleObject.storeObject.shopAfter)) {
      strThree = app.globalData.hairstyleObject.storeObject.shopAfter;
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
      bearingObject.storeObject = app.globalData.storeObject;
      let strOne = "";
      if (existence(app.globalData.storeObject.mobilePhone)) {
        strOne = app.globalData.storeObject.mobilePhone;
      }
      let strTwo = "";
      if (existence(app.globalData.storeObject.shopBefore)) {
        strTwo = app.globalData.storeObject.shopBefore;
      }
      let strThree = "";
      if (existence(app.globalData.storeObject.shopAfter)) {
        strThree = app.globalData.storeObject.shopAfter;
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

  }
})