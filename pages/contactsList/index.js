// pages/contactsList/index.js
const API = require('../../utils/API.js');
const permission = require('../../utils/permission.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactsList:[],
    username:'',
    hasMore:true,
    pageIndex:1,
    viewType:'',
    // 权限控制按钮
    pUpBtn:false,
    pDownBtn:false
  },
  inputWord(e){
    this.setData({
      username:e.detail.value
    })
  },
  clear(){
    this.setData({
      username:'',
      pageIndex:1,
      hasMore:true,
      contactsList:[]
    })
    this.contactList()
  },
  search(){
    this.setData({
      pageIndex:1,
      hasMore:true,
      contactsList:[]
    }) 
    this.contactList()
  },
  add(){
    wx.removeStorageSync('addContact')
    wx.removeStorageSync('followOrgInfo')
    wx.navigateTo({
      url: '../addContact/index',
    })
  },
  async contactList(){
    if(!this.data.hasMore) return;
    wx.showLoading({ title: '拼命加载中...' });
    this.setData({
      pageIndex:this.data.pageIndex++
    })
    const resTotal = await API.contactListCount({
      orgUser:this.data.username,
      pageIndex:this.data.pageIndex,
      pageSize:30
    });
    const res = await API.contactList({
      orgUser:this.data.username,
      pageIndex:this.data.pageIndex,
      pageSize:30
    });
    if(resTotal.data.data===this.data.contactsList.length){
       this.setData({
        hasMore:false
       }) 
       wx.hideLoading(); 
       return;   
    }
    let resData = res.data.data||[]
    this.setData({
      contactsList:this.data.contactsList.concat(resData)
    }) 
    wx.hideLoading();  
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewType = wx.getStorageSync('viewType');
    var pUpBtn = permission.btnControl('followUpCustomerPage_personnelInfoPage:addButton');
    var pDownBtn = permission.btnControl('stayDownCustomerPage_personnelInfoPage:addButton');
    // permission.btnControl
    this.setData({
      pageIndex:1,
      hasMore:true,
      contactsList:[],
      viewType:viewType,
      pUpBtn:pUpBtn,
      pDownBtn:pDownBtn
    }) 
     this.contactList()
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
      this.contactList()
     }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})