const app = getApp();
import { ask, askError } from '../../utils/demand.js';
import { existence } from '../../utils/tools.js';
import { random } from '../../utils/random.js';
import { edition, version, platform, smallRoutione, selectOrder, selectOrderTitle, selectOrderDetailByOrderId, selectOrderDetailByOrderIdTitle, orderUpdate, orderUpdateTitle, editDeleteHairstyle, editDeleteHairstyleTitle, updateOrder, updateOrderTitle, updateOrderByOrderId, updateOrderByOrderIdTitle } from '../../config.js';
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
    serviceIcon: `${app.globalData.pictureUrl}/icon/201911212308service.png`,
    editIcon: `${app.globalData.pictureUrl}/icon/edit.png`,
    flowerIcon: `${app.globalData.pictureUrl}/icon/201911212337flower.png`,
    addressIcon: `${app.globalData.pictureUrl}/icon/address.png`,
    deleteIcon: `${app.globalData.pictureUrl}/icon/delete.png`,
    sendIcon: `${app.globalData.pictureUrl}/icon/201911202250send.png`,
    problemIcon: `${app.globalData.pictureUrl}/icon/201911230100problem.png`,
    addIcon: `${app.globalData.pictureUrl}/icon/202002241817add.png`,
    shapeArr:['1.椭圆形脸的人给人温和，亲近的感觉，在气质上更具有清瘦感。','2.发际线顶端倒下巴底部的长度适中。','3.腮部的棱角不明显呈圆弧形。','4.下巴线条较为柔和，弧度适中。','5.椭圆形脸的女性给人浪漫，优雅，优柔寡断的感觉，不足之处在于由于脸型而略有增龄感。'],
    dots:true,
    autoplay:true,
    interval:5000,
    materialShow:false,
    acceptOrderId:"",
    userDataObject:null,
    editObject:null,
    colorArr:[]
  },
  // 顶部返回按钮点击
  goBackClick: function (e) {
    let _this = this;
    wx.navigateBack({
      delta: 1
    })
  },
  // 提交的资料---点击
  materialClick:function(e){
    let _this = this;
    _this.setData({
      materialShow:true
    })
  },
  // 提交的资料---关闭
  shoutDownClick:function(e){
    let _this = this;
    if(e.detail == "弹框关闭"){
      _this.setData({
        materialShow:false
      })
    }
  },
  // 脸型分析---脸型、性格、脸型总结
  faceShapgeClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    wx.navigateTo({
      url: `../../library_pages/shape/shape?transsex=${_this.data.userDataObject.sex}`,
    })
  },
  // 脸型分析---上中下庭
  courtClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    wx.navigateTo({
      url: '../../library_pages/court/courts',
    })
  },
  // 发型推荐---图片预览
  recommednPreviewPicure:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset);
    let bearingStr = e.currentTarget.dataset.one;
    let bearingArr = e.currentTarget.dataset.two;
    let emptyArr = [];
    for (let i in bearingArr){
      if (bearingArr[i].type == 1){
        emptyArr = emptyArr.concat(bearingArr[i].picture);
      }
    }
    wx.previewImage({
      current: bearingStr, // 当前显示图片的http链接
      urls: emptyArr // 需要预览的图片http链接列表
    })

  },
  // 发行推荐---删除
  hairstyleClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.showModal({
      title: '提示',
      content: '您确定要删除该款发型么?',
      success (res) {
        if (res.confirm) {
          // console.log('用户点击确定');
          let para = {
            id: e.currentTarget.dataset.info.id
          }
          ask("get", `${editDeleteHairstyle}`, para).then(res => {
            // console.log(res);
            _this.initialData();//页面初始数据
            // if (res.code == 0) {

            // } else {
            //   wx.hideLoading();
            //   askError("", editDeleteHairstyleTitle, '数据请求出错');
            // }
          }).catch(error => {
            wx.hideLoading();
            askError("", editDeleteHairstyleTitle, '数据处理出错');
          })
        } else if (res.cancel) {
          // console.log('用户点击取消');
        }
      }
    })
  },
  // 发行推荐---修改编辑
  hairstyleEidtClick:function(e){
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    app.globalData.userMaterialObject = _this.data.userDataObject;
    app.globalData.hairstyleObject = e.currentTarget.dataset.info;
    wx.navigateTo({
      url: `../../library_pages/hairstyle/hairstyle?disitinguish=1`,
    })
  },
  // 发行推荐---添加
  addRecommedClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    app.globalData.userMaterialObject = _this.data.userDataObject;
    app.globalData.hairstyleObject = {
      random: random(),
      recommend:[],
      shop:{
        creatTime:null,
        haircutPrice:null,
        ironingPrice:null,
        mobilePhone: null,
        shopAddress:null,
        shopAddressphoto:null,
        shopAfter:null,
        shopBefore:null,
        shopCity:null,
        shopId:null,
        shopImgs:null,
        shopName:null,
        shopPhoto:null,
        shopTitle:null,
      },
    }
    wx.navigateTo({
      url: `../../library_pages/hairstyle/hairstyle?disitinguish=0`,
    })
  },
  // 发色推荐---修改编辑
  colorClick:function(e){
    let _this = this;
    refreshJudge = true;
    app.globalData.compileObject = _this.data.editObject;
    wx.navigateTo({
      url: `../../library_pages/color/color?transsex=${_this.data.userDataObject.sex}`,
    })
  },
  // 发色---预览
  colorPreviewClick: function (e) {
    let _this = this;
    // console.log(e.currentTarget.dataset.info);
    wx.previewImage({
      current: e.currentTarget.dataset.info, // 当前显示图片的http链接
      urls: _this.data.colorArr // 需要预览的图片http链接列表
    })
  },
  // 发色---删除
  colorDeleteClick:function(e){
    let _this = this;
    // console.log(e);
    // console.log(e.currentTarget.dataset.info);
    wx.showModal({
      title: '提示',
      content: '您确定要删除此款发色么？',
      success(res) {
        if (res.confirm) {
          // console.log('用户点击确定')
          let strOne = "";
          if (_this.data.colorArr.length == 1){
            strOne = null;
          }else{
            for (let i in _this.data.colorArr){
              if (_this.data.colorArr[i] != e.currentTarget.dataset.info){
                strOne = strOne + "," + _this.data.colorArr[i];
              }
            }
          }
          strOne = strOne.substr(1);
          let para = {
            id: _this.data.editObject.id,
            hairColor: strOne
          }
          //发送code，encryptedData，iv到后台解码，获取用户信息
          ask("get", `${orderUpdate}`, para).then(res => {
            // console.log(res);
            if (res.status == 200) {
              _this.initialData();//页面初始数据
              wx.showToast({
                icon: "none",
                title: '已删除！',
              })
            } else {
              wx.hideLoading();
              askError("", orderUpdateTitle, '数据请求出错');
            }
          }).catch(error => {
            wx.hideLoading();
            askError("", orderUpdateTitle, '数据处理出错');
          })
        } else if (res.cancel) {
          // console.log('用户点击取消')
        }
      }
    })
  },
  // 发送
  sendClick:function(e){
    let _this = this;
    if (!existence(_this.data.editObject.faceShapeDetail)){
      wx.showToast({
        icon:'none',
        title: '请编辑脸型',
      })
      return
    }
    if (!existence(_this.data.editObject.faceShapeCharacter)) {
      wx.showToast({
        icon: 'none',
        title: '请编辑性格描述',
      })
      return
    }
    if (!existence(_this.data.editObject.faceSummary)) {
      wx.showToast({
        icon: 'none',
        title: '请编辑脸型总结',
      })
      return
    }
    if (!existence(_this.data.editObject.uppercourtDetail)) {
      wx.showToast({
        icon: 'none',
        title: '请编辑上庭',
      })
      return
    }
    if (!existence(_this.data.editObject.stallsDetail)) {
      wx.showToast({
        icon: 'none',
        title: '请编辑中庭',
      })
      return
    }
    if (!existence(_this.data.editObject.lowerCourtDetail)) {
      wx.showToast({
        icon: 'none',
        title: '请编辑下庭',
      })
      return
    }
    if (!existence(_this.data.editObject.orderRecommends) || _this.data.editObject.orderRecommends.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请推荐发型',
      })
      return
    }
    if (!existence(_this.data.editObject.orderRecommends) || _this.data.editObject.orderRecommends.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请推荐发色',
      })
      return
    }
    let para = {
      orderId: _this.data.acceptOrderId,
      orderStatus: 3
    }
    //发送code，encryptedData，iv到后台解码，获取用户信息
    ask("get", `${updateOrderByOrderId}`, para).then(res => {
      // console.log(res);
      if (res.status == 200) {
        wx.showToast({
          icon: "none",
          title: '发送成功！',
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          })
        }, 1500)
      } else {
        askError(wx.getStorageSync('userInformation').userId, updateOrderByOrderIdTitle, '数据请求出错');
      }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, updateOrderByOrderIdTitle, '数据处理出错');
    })
  },
  // 页面初始数据
  initialData: function (e) {
    let _this = this;
    // 获取订单信息、用户信息
    let para = {
      orderId: _this.data.acceptOrderId
    }
    ask("get", `${selectOrder}`, para).then(res => {
      // console.log(res);
      _this.setData({
        userDataObject: res,
      })
      // if (res.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, selectOrderTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, selectOrderTitle, '数据处理出错');
    })
    // 查询订单
    ask("get", `${selectOrderDetailByOrderId}`, para).then(res1 => {
      // console.log(res1);
      let beatingObject = res1[0];
      let emptyArr = [];
      if (existence(beatingObject.hairColor)){
        if (beatingObject.hairColor.indexOf(",") == -1){
          emptyArr = [beatingObject.hairColor];
        }else{
          emptyArr = beatingObject.hairColor.split(",");
        }
      }
      let arrOne = [];
      if (existence(beatingObject.orderRecommends) && beatingObject.orderRecommends.length != 0){
        for (let i in beatingObject.orderRecommends){
          beatingObject.orderRecommends[i].recommend = JSON.parse(beatingObject.orderRecommends[i].recommend);
          beatingObject.orderRecommends[i].shop = JSON.parse(beatingObject.orderRecommends[i].shop);
          arrOne = arrOne.concat(beatingObject.orderRecommends[i]);
        }
      }
      beatingObject.orderRecommends = arrOne;
      _this.setData({
        editObject: beatingObject,
        colorArr: emptyArr,
      })
      // if (res1.code == 0) {

      // } else {
      //   wx.hideLoading();
      //   askError(wx.getStorageSync('userInformation').userId, selectOrderDetailByOrderIdTitle, '数据请求出错');
      // }
    }).catch(error => {
      wx.hideLoading();
      askError(wx.getStorageSync('userInformation').userId, selectOrderDetailByOrderIdTitle, '数据处理出错');
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // console.log(options);
    _this.setData({
      acceptOrderId: options.orderid
    })
    _this.initialData();//页面初始数据
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
      _this.initialData();//页面初始数据
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