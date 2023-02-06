// pages/dealWith/index.js
const API = require('../../utils/API.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchIndex:'1',
    followList:[],
    iconType: [
      'iconluyin', 'iconshipin', 'iconzhaopian', 'iconzhaopian', 'iconzhaopian', 'iconzhaopian', 'iconzhaopian', 'iconzhaopian', 'iconzhaopian'
    ],
    customerCareList:[],
    pageIndex:1,
    pageSize:30,
    hasMore:false
  },
  switchTab(e){
    this.setData({
      pageIndex:1,
      pageSize:30,
      switchIndex:e.currentTarget.dataset.switchIndex
    })
    if(e.currentTarget.dataset.switchIndex==='2'){
      this.orgUserBirthdayRemind()
    }else{
      this.orgFollowUpRemind()
    }
  },

  // 跟进记录提醒
  async orgFollowUpRemind(){
    try{
      wx.showLoading({ title: '拼命加载中...' });
      const res = await API.orgFollowUpRemind({
        pageIndex:this.data.pageIndex++,
        pageSize:this.data.pageSize
      });
      let resData;
      resData = res.data.data||[];
      if(resData.length===0){
        this.setData({
          hasMore:false
        })
      }
    
      this.setData({
        followList:resData
      }) 
     wx.hideLoading();
    }catch(e){
      wx.hideLoading();
    }
  },
  updateList(e){
    this.setData({
      pageIndex:1,
      hasMore:true
    })
     this.orgFollowUpRemind()
  },
  //客户关怀  
  orgUserBirthdayRemind(){
    try{
      wx.showLoading({ title: '拼命加载中...' });
      API.orgUserBirthdayRemind({
        pageIndex:this.data.pageIndex++,
        pageSize:this.data.pageSize
      }).then((res)=>{
        let resData = res.data.data||[];
        let currentDay = new Date().getDate();
        if(resData.length===0){
          this.setData({
            hasMore:false
          })
        }
        resData.forEach((item)=>{
          item.distanceDay = new Date(item.birthdayDate).getDate()-currentDay;
        })
         this.setData({
          customerCareList:resData
         })
         wx.hideLoading();
        
      })
    }catch(e){
      wx.hideLoading();
      console.log(e);
    }
   
  },

  //去详情页
  toDetailPage(e){
    wx.navigateTo({
      url:`../detail/detail?orgId=${e.currentTarget.dataset.orgId}&orgType=${e.currentTarget.dataset.orgType}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初次渲染跟进提醒 
    this.orgFollowUpRemind()
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
    wx.hideHomeButton();
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
        if(this.data.switchIndex==='1'){
          this.orgFollowUpRemind()
        }else{
          this.orgUserBirthdayRemind()
        }
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})