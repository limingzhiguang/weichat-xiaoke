// pages/photos/photos.js
const API = require('../../utils/API.js');
let uploadImagesList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.findOrgShopPic();
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

  },
  findOrgShopPic(){
    let orgId = wx.getStorageSync('orgId');
    API.findOrgShopPic(orgId).then((res)=>{
      this.setData({
        photos: res.data.data
      })
    });
  },
  /**
   * 上传照片
   */
  upload(){
    uploadImagesList = [];
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      success: res=>{  
       // console.log(res, res.tempFiles[0]);
        let that = this;
        let tempFiles = res.tempFiles;
        let numberList =[];
        for (let n = 0; n < res.tempFiles.length;n++){
          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[n].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);
              if (data.code === '200') {
                uploadImagesList.push(data.url);
                numberList.push(n);
                if (tempFiles.length === numberList.length){
                  that.saveImage();
                  that.findOrgShopPic();
                }
              } else {
                //token过期去登录页
                switch (data.code) {
                  case 401:
                    wx.setStorageSync('token', '');
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                    break;
                }
                //异常提示
                wx.showToast({
                  title: "网络异常或服务暂时开小差",
                  icon: 'none'
                });
              }
            }
          }) 
        }             
      },
    })
  },
  saveImage(){
    let orgId = wx.getStorageSync('orgId');
    API.saveOrgShopPic({ orgId: orgId, picAddressList: uploadImagesList }).then((response) => {
      if (response.data.code === '200') {
        this.findOrgShopPic();
      }
    })
  },
  /**
   * 删除照片
   */
  cancel(e){
     let index = e.currentTarget.dataset.index;
    let arr = this.data.photos;
    let currentId = arr[index].id;
    arr.splice(index, 1);
    this.setData({
      photos: arr
    });
    uploadImagesList.splice(index,1);
    API.deleteOrgShopPic([currentId]).then((res)=>{
      wx.showToast({
        title: "删除成功",
        icon: 'none'
      });
    });
  },
  /**
   * 返回
   */
  saveAndBack(){
    wx.reLaunch({
      url: '../newclient/newclient',
    })
  },
  /**
   * 大图
   */
  showBigPhoto(e){
    let src = e.currentTarget.dataset.src;
    let arr = [];    
    for (let i = 0, len = this.data.photos.length;i<len;i++){
      arr.push(this.data.photos[i].picAddress)
    }

    wx.previewImage({
      current: src,
      urls: arr
    })
  }
})