// pages/stafflist/index.js
import API from '../../utils/API.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:null,
    orgId:null,
    orgStatus:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lists
    wx.setNavigationBarTitle({
      title: options.title
    })
    // 获取本地账户数据，没有则请求处理
    let allUsers = wx.getStorageSync('all_users')
    
    if (!allUsers){
      API.findAllList().then(res=>{
        let data = res.data.data
        let fls = []
        // 按首字母升序
        data.sort((a, b)=>{
          let af = a.userNameEn.substr(0,1).toLowerCase()
          let bf = b.userNameEn.substr(0, 1).toLowerCase()

          if(af >= bf){
            return 1
          }else{
            return -1
          }
        })
        // 按首字母分组
        data.forEach((item)=>{
          if (item.userNameEn){            
            let fl = item.userNameEn.substr(0, 1).toUpperCase()
            let index = fls.indexOf(fl)
            
            if (index > -1){
              lists[index].children.push(item)
            }else{
              fls.push(fl)
              lists.push({
                id: fl,
                children:[item]
              })
            }
          }else{            
            if (lists){
              lists[0].children.push(item)
            }else{
              lists = []
              fls.push('_')
              lists.push({
                id:'_',
                children:[item]
              })
            }
          }
        })
        // 将无首字母的组放最后
        lists.push(lists.shift())
        // 所有账户存储本地
        wx.setStorageSync('all_users', lists)
        this.setData({
          lists,
          orgId: options.orgId,
          orgStatus: options.orgStatus
        })
      })
    }else{  
      this.setData({
        lists: allUsers,
        orgId: options.orgId,
        orgStatus: options.orgStatus
      })
    }
    
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

  },
  choose(e){
    let user = e.detail.user
    wx.setStorageSync('submitUser', user)
    
    wx.navigateBack({
      url: '/pages/dataFlow/index?orgId=' + this.data.orgId + '&orgStatus=' + this.data.orgStatus      
    })
  }
})