// pages/selectOrg/index.js
const API = require('../../utils/API.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageSize:30,
    pageIndex:1,
    hasMore:true,
    orgList:[],
    orgId:'',
    orgName:'',
    orgJianName:'',
    brandName:'',
    currentOrgmName:'',
    pageType:'1',
    isOrgBack:false,
    isContactOrgBack:false
  },
  radioChange(e){
    //console.log(e,'机构');
     let viewType = Number(wx.getStorageSync('viewType'));
     this.data.orgList.forEach((item)=>{
       if(item.orgId===e.detail.value){
         item.orgName = item.orgJianName||item.brandName;
        wx.setStorageSync('followOrgInfo', item);
       }
     })
  },
  saveOrgInfo(){
    // 2是添加联系人页面的
    if(this.data.pageType==='2'){
      // wx.redirectTo({
      //   url:`../addContact/index`
      // })
      wx.setStorageSync('isContactOrgBack', true)
      wx.navigateBack()
    }else{
      // wx.setStorageSync('orgPerson', '');
      // wx.redirectTo({
      //   url:`../writeFollow/index`
      // })
      // isOrgBack
      wx.setStorageSync('isOrgBack', true)
      wx.navigateBack()
    }
    
  },
  getOrgName(e){
    this.setData({
      orgName:e.detail.value
    })
  },
  toSearch(){
    this.setData({
      hasMore:true,
      pageIndex:1,
      orgList:[]
    });
    this.getAllOrgList();
  },
  clearOrgName(){
    this.setData({
      orgName:''
    });
    // this.setData({
    //   hasMore:true,
    //   pageIndex:1,
    //   orgList:[]
    // });
    // this.getAllOrgList();
  },
  getAllOrgList(){
    if (!this.data.hasMore) return;
    wx.showLoading({ title: '拼命加载中...' });
    let viewType = Number(wx.getStorageSync('viewType'));
    API.findAllOrgList({
      orgJianName:viewType===2?this.data.orgName:'',
      brandName:viewType===1?this.data.orgName:'',
      pageSize:this.data.pageSize,
      pageIndex:this.data.pageIndex++
    }).then((res)=>{
      var resData = res.data.data?res.data.data:[];
      var result = [];

      //orgType
      if(viewType===1){
        resData.forEach((item)=>{
          if(item.orgType===1){
            result.push(item)
          }
        })
      }else{
        resData.forEach((item)=>{
          if(item.orgType===2){
            result.push(item)
          }
        })
      }
      
      if(result.length===0){
         this.setData({
          hasMore:false
         });
      }
      this.setData({ orgList: this.data.orgList.concat(result),hasMore:result.length>0});
      wx.hideLoading();
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      hasMore:true,
      pageType:options.pageType
     });
    this.getAllOrgList();
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
      this.getAllOrgList();
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})