const app = getApp();
import { existence, getYears } from "../../utils/tools.js";
Component({
    properties:{
        // 这里定义了 heaText 属性，属性值可以在组件使用时指定
        information:{
            type:Object,
            value:{},
        }
    },
    data:{
        //组件内部数 
        screenHeight: app.globalData.systemInfo.screenHeight,//屏幕高度
    },
    methods:{
        // 更多信息点击
        shoutDownClick: function(e) {
            let _this = this;
            this.triggerEvent("close", "弹框关闭")
        }
    },
    
    
    created:function(){
        // 组件生命周期函数，在组件实例化进入页面节点树时执行，注意此时不能调用 setData
        // console.log(app.globalData.phoneInfo)
    },
    attached:function(){
        // 组件生命周期函数，在组件实例进入页面节点树时执行
        let _this = this;
      
    },
    ready:function(){
        // 组件生命周期函数，在组件布局完成后执行
    },
    moved:function(){
        // 组件生命周期函数 ，在组件实例被移动到节点树另一个位置时执行
    },
    detached:function(){
        // 组件生命周期函数，在组件实例被从页面节点树移除时执行
    },

})