// pages/position/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:'', 
    markers:[],
    imgSrc:'',
    scale:20,
    isLoaded:false,
    mapInfor:'',
    distance:'', 
    duration:'',
    points:[],
    isShowBottom:false
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let orgInfor = app.globalData.orgInfor
        
    this.setData({ orgInfor })
    this.setBgImg(orgInfor.orgStatus)
    // 地址解析（地址转坐标）
    wx.request({
      url: 'https://apis.map.qq.com/ws/geocoder/v1/?address=' + orgInfor.address +'&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z',
      success:(res)=>{        
        let result = res.data.result
        let longitude = result.location.lng
        let latitude = result.location.lat
        
        this.setData({
          longitude,
          latitude,
          isLoaded:true,
          mapInfor: `${result.address_components.province}${result.address_components.city}${result.address_components.district}${result.title}`,
          markers: [{
            latitude,
            longitude,
            iconPath: '../../images/marker.png',            
            id: 0,
            width: 24,
            height: 30
          }],          
          points: [{ latitude, longitude }]
        })

      }
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
   * 点击气泡
   */
  tapMarker(e){
    let that = this
    wx.getLocation({
      success: function (res) {     
        // 距离计算   
        wx.request({
          url: `https://apis.map.qq.com/ws/distance/v1/?mode=driving&from=${res.latitude},${res.longitude}&to=${that.data.latitude},${that.data.longitude}&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z`,
          success:(ress)=>{
            let resu = ress.data.result.elements[0]
            
            that.setData({
              isShowBottom:true,
              distance: resu.distance,
              duration: resu.duration
            })
          }
        })
      }
    })
  },
  regionChange(){
    this.setData({
      isShowBottom:false
    })
  },
  /**
   * 放大地图
   */
  blowUp(){
    let scale = this.data.scale
    if (scale < 20) {
      ++scale
    }
    this.setData({ scale })
  },
  /**
   * 缩小地图
   */
  shrink(){
    let scale = this.data.scale
    if (scale > 3) {
      --scale
    }
    this.setData({ scale })
  }
})