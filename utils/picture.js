import { existence } from '../utils/tools.js';
import { ask, askError } from '../utils/demand.js';
import { edition, version, platform, smallRoutione, uploadFile,uploadFileTitle } from '../config.js';
const pictureUpload = (val1) =>{
  let imageUrl = val1;
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: uploadFile,
      name: 'file',
      filePath: imageUrl,
      header: {
        "Content-Type": "multipart/form-data"
      },
      success: function (res) {
        // console.log(res);
        let data = res.data;
        // console.log(JSON.parse(data).data.src);
        let returnData = JSON.parse(data).data.src;
        resolve(returnData);
        wx.hideLoading();
      },
      fail: function (res) {
        // console.log(res);
        reject('出错了');
        wx.hideLoading();
        wx.showToast({
          icon: 'none',
          title: '文件上传失败，请稍后再试', // 内容
          success: (res) => {

          }
        });
      }
    })
  })
}
module.exports = {
  pictureUpload: pictureUpload
}