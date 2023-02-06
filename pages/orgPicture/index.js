// pages/orgPicture/index.js
import API from '../../utils/API.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgInfor:{},
    imgSrc:'',
    imgList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId: options.orgId,
      orgInfor: app.globalData.orgInfor
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
    let orgInfor = app.globalData.orgInfor
    let addPicPermission = (orgInfor.orgStatus == '2' && this.checkPermission('followUpCustomerPage_shopPhotoPage:addButton')) || (orgInfor.orgStatus != '2' && this.checkPermission('stayDownCustomerPage_shopPhotoPage:addButton'))
    
    this.setData({ 
      orgInfor,
      addPicPermission
     })
    this.getOrgPic()
    this.setBgImg(orgInfor.orgStatus)    
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
  /**
   * 设置背景图
   */
  setBgImg(status) {
    let pixelRatio = this.getPixelRatio()
    let imgSrc
    // imgSrc
    if (pixelRatio == 2) {
      imgSrc = status == 2 ? '../../images/small_orange_bg_2x.png' : '../../images/small_blue_bg_2x.png'
    } else {
      imgSrc = status == 2 ? '../../images/small_orange_bg.png' : '../../images/small_blue_bg.png'
    }
    this.setData({
      imgSrc
    })
  },
  // 获取设备像素比
  getPixelRatio() {
    let pixelRatio = 0
    wx.getSystemInfo({
      success: function (res) {
        pixelRatio = res.pixelRatio
      },
      fail: function () {
        pixelRatio = 0
      }
    })
    return pixelRatio
  },
  /**
   * 获取机构照片
   */
  getOrgPic(){
    API.findOrgShopPic(this.data.orgInfor.orgId).then((res)=>{      
      this.setData({
        imgList:res.data.data || []
      })
    })
  },
  /**
   * 新增照片
   */
  addPicture(){
    if (this.data.imgList.length >= 10){
      wx.showToast({
        title: '只能添加10张门店照片，目前已上传10张',
        icon:'none'
      })
      return false
    }

    let that = this
    let orgId = this.data.orgInfor.orgId

    wx.chooseImage({
      count: 10 - that.data.imgList.length,
      success: function(res) {        
        let tempFiles = res.tempFiles
        let newPictures = []
        let n = 0

        wx.showLoading({
          title: '开始上传图片',
          mask: true
        })
        
        for (let i = 0, len = tempFiles.length;i<len;i++){
          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[i].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);              
              if (data.code === '200') {
                newPictures.push(data.url)
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
            },
            complete(){
              ++n
              if (newPictures.length > 0 && n === tempFiles.length) {
                API.saveOrgShopPic({
                  orgId: orgId,
                  picAddressList: newPictures
                }).then((res) => {
                  wx.showToast({
                    title: '图片上传成功'
                  })
                  that.getOrgPic()
                })
              } else if (newPictures.length === 0 && n === tempFiles.length){
                wx.showToast({
                  title: '图片上传失败',
                  icon:'none'
                })
              }
            }
          })          
        }        
      }
    })
  },
  /**
   * 删除图
   */
  removePicture(e){
    let that = this
    wx.showModal({
      title: '删除提示',
      content: '确定删除该门店照片？',
    }).then((res)=>{
      if(res.confirm){
        API.deleteOrgShopPic([e.currentTarget.dataset.id]).then(()=>{
          that.getOrgPic()
          wx.showToast({
            title: '移除成功'
          })
        })
      }
    })
  },
  /**
   * 查看图片
   */
  checkImg(e){
    let src = e.currentTarget.dataset.src
    let urls = []

    this.data.imgList.forEach((item)=>{
      urls.push(item.picAddress)
    })

    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  /**
   * 
   * 权限检查
   */
  checkPermission(per){
    const permissionList = wx.getStorageSync('permissionList') 
    let btnPermission = permissionList?permissionList:[]

    return btnPermission.includes(per) 
  }
})