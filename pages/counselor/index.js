// pages/counselor/index.js
import API from '../../utils/API.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgId:null,
    activeName:'current',
    dataList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.setData({
      orgId: options.orgId
    })
    this.getDataList(options.orgId,'1')
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
  getDataList(orgId,type){
    API.findOrgBeforeCounselor(orgId, type).then((res)=>{
      this.setData({
        dataList:res.data.data
      })
    })
  },
  switch(e){
    let type,title
    let id = e.target.id
    
    if (this.data.activeName === id || !id) return false

    switch (id){
      case 'current':
        type = '1'
        title = '查看顾问'
        break
      case 'history':
        type =  '2'
        title = '历史顾问'
        break
      case 'synergy':
        type = '3'
        title = '当前协同人'
        break   
    }

    this.getDataList(this.data.orgId,type)

    wx.setNavigationBarTitle({
      title
    })

    this.setData({
      activeName: e.target.id
    })
  }
})