/**
* 正式 appid: wx4a25690f0fabfe53
*/

//app.js
App({
  onLaunch: function () {
    let _self = this;
     //token存在直接登录，失效统一处理
     const token = wx.getStorageSync('token');
     if (token) {
       wx.redirectTo({
         url: '/pages/dashboard/index',
       })
     }
    // 展示本地存储能力
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.onNetworkStatusChange((res) => {      
      if (!res.isConnected){
        wx.showToast({
          title: '当前网络已断开连接',
          icon:'none'
        })
      }
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }

        if (!res.authSetting['scope.userLocation']){
          wx.authorize({
            scope: 'scope.userLocation',
            success (){
              
            }
          })
        }
      },
    })
    
    // 获取设备型号
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') > -1) {
          _self.globalData.isIphoneX = true
        }else if(modelmes.search('iPhone 11') > -1){
          _self.globalData.isIphoneX = true
        }else{
          _self.globalData.isIphoneX = false
        }
       // wx.setStorageSync('modelmes', modelmes)
      }
    })

    //版本更新
    if ( wx.canIUse('getUpdateManager')) {
      //判断当前微信版本是否支持版本更新
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          // 请求完新版本信息的回调
          updateManager.onUpdateReady(function () {
            wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，是否重启应用？',
            success: function (res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
              }
            }
            })
          });
          updateManager.onUpdateFailed(function () {
            wx.showModal({
            // 新的版本下载失败
            title: '已经有新版本了哟~',
            content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
            })
          })
        }
      })
    } else {
      wx.showModal({
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      title: '提示',
      content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  globalData: {
    userInfo: null,
    isIphoneX:false,
    /**
     * orgInfor.type 1-基本信息 2-注册信息 3-营销项目 4-业绩预测 5-跟进记录 6-联系人
     */
    orgInfor:{
      orgId:null,
      orgJianName: null,
      brandName: null,
      orgStatus: null,
      address: null,
      type: null
    },
    permission:{}
  }
})