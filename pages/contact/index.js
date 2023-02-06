// pages/contact/index.js
const API = require('../../utils/API.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactsList:[],
    orgInfor:{}
  },
  // 联系人 
  findContactsList(orgId){
    wx.showLoading({ title: '拼命加载中...' });
    let orgName = app.globalData.orgInfor.orgJianName || app.globalData.orgInfor.brandName
     API.findContactsList(orgId).then((res)=>{
         let resData = res.data.data||[];
         resData.forEach((item)=>{
           item.orgId = orgId
           item.orgName = orgName
           item.username = item.userName,
           item.isOrgDetail = 1
         })
         this.setData({
          contactsList:resData,
         }) 
         wx.hideLoading(); 
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.findContactsList(options.orgId)    
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
    this.setData({
      orgInfor: app.globalData.orgInfor
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

  }
})