// pages/followUp/index.js
import API from '../../utils/API.js';
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    followList:[],
    orgId:'',
    orgName:'',
    orgInfor:{},
    isEditing:false
  },
  showMask(){
    this.setData({
      isEditing:true
    })
  },
  hideMask(){
    this.setData({
      isEditing:false
    })
  },
  updateList(){
    this.findFollowUpLogList(this.data.orgId) 
  },
  async findFollowUpLogList(orgId){
    const res = await API.findFollowUpLogList(orgId);
    let resData = res.data.data||[];
    resData.forEach((item)=>{
      item.orgName = this.data.orgInfor.orgJianName || this.data.orgInfor.branName
    })
    this.setData({
      followList:resData
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({      
      orgName:options.orgName,
      orgId:options.orgId
    })
    this.findFollowUpLogList(options.orgId) 
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