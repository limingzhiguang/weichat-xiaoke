// pages/selectOrgPerson/index.js
const API = require('../../utils/API.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgPersonList:[],
    hasMore:true,
    orgPerson:'',
    orgPersonId:'',
    isPersonBack:false
  },
  getOrgPerson(){

  },
  getPerson(id){
    if(!this.data.hasMore){
       return;
    }
    API.findOrgPerson(id).then((res)=>{
       var resData = res.data.data.incumbency||[];
       if(resData.length===0){
         this.setData({
          hasMore:false
         })
       }
       this.setData({
        orgPersonList:res.data.data.incumbency
       })
    }) 
  },
  radioChange(e){
    wx.setStorageSync('orgPerson', e.detail.value);
  },
  saveOrgInfo(){
    if(this.data.isOrgDetail){
      // wx.redirectTo({
      //   url:`../writeFollow/index?isOrgDetail=1&orgId=${this.data.orgId}`
      // })
      wx.setStorageSync('isPersonBack', true);
      wx.navigateBack()
    }else{
      // wx.redirectTo({
      //   url:`../writeFollow/index?orgId=${this.data.orgId}`
      // })
      wx.setStorageSync('isPersonBack', true);
      wx.navigateBack()
    } 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //上个页面参数
    let {orgId} = options;

    this.setData({
      orgId,
      isOrgDetail: options.isOrgDetail
    })

    this.getPerson(orgId)  
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
     if(this.data.hasMore){
        this.getPerson();  
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})