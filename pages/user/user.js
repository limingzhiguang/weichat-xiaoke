// pages/user/user.js
const API = require('../../utils/API.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfor:{},
    addSchoolNum:0,
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
    const userInfor = wx.getStorageSync('useInfo');
    let viewType = wx.getStorageSync('viewType');
    viewType = Number(viewType);
   // this.getAddSchoolNum(viewType);
    userInfor.roleNames = userInfor.roleNames?userInfor.roleNames.split(','):'';
    this.setData({
      userInfor,
      viewType
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     tab: 2
    //   })
    // }    
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getAddSchoolNum(viewType){
    if (viewType == 1){
      API.getSendSchoolRankingData().then((res) => {
        const data = res.data.data;
        this.setData({
          addSchoolNum: data.userTodayNum
        });
      })
    }else{
      API.getAddSchoolRankingData().then((res)=>{
        const data = res.data.data;
        this.setData({
          addSchoolNum: data.userTodayNum
        });
      })
    } 
  },
  changeDepartment(){
    let viewType = this.data.viewType;
    wx.showModal({
      title: '部门切换提示',
      content: `是否将部门切换到${viewType == 1?'销售中心':'商务中心'}`,
      success:(res)=>{
        if(res.confirm){
          viewType = viewType == 1?2:1
          this.setData({
            viewType
          });
          wx.setStorageSync('viewType', viewType);
         // this.getAddSchoolNum(viewType);
          wx.showToast({
            title: '切换成功',
            icon:'none',
            mask:true
          })
        }
      }
    })
  },
  loginOut() {
    wx.showModal({
      title: '提示',
      content: '是否确定更换账号？',
      success:(res)=>{
        if (res.confirm){
          API.loginOut();
          wx.clearStorage()
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      }
    })    
  }
})