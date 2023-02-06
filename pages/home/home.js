// pages/home/home.js
const API = require('../../utils/API.js');

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		useInfo: '',
		isRankType: 1,
		addSchoolNum: 0, // 添加学校数量
		rank: '', // 排名
		dateType:'today',
		numberType:'add_school',	
		rankData: []
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
		// let useInfo = wx.getStorageSync('useInfo');	 
    
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
    this.changeDate({ target: '' });
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {   
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        tab: 0
      })
    }    
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {
		
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	async onPullDownRefresh() {
    wx.showLoading({
      title: '刷新中。。。',
    });
    await this.changeDate({ target: { id: this.data.dateType} });
    await wx.stopPullDownRefresh();
    wx.hideLoading();
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	},
	changeDate(e) {
    // 切换数据
    let fn;
    if (this.data.numberType == 'transfer_school'){
      fn = API.getSendSchoolRankingData();      
    }else{
      fn = API.getAddSchoolRankingData();
    }    

    fn.then((res) => {
      const data = res.data.data;
      this.setData({
        addSchoolNum: data.userTodayNum 
      });
      
      let name;
      if (e.target){
        name = e.target.id;
      }      
      switch (name) {
        case 'today':
          this.setData({
            rankData: data.rankingTodayList
          })          
          break;
        case 'month':
          this.setData({
            rankData: data.rankingMoneyList
          });
          break;
        case 'history':
          this.setData({
            rankData: data.rankingHistoryList
          });
          break;
        default:
          this.setData({
            rankData: data.rankingTodayList
          })  
      }
    });
    
		this.setData({
			dateType:e.target.id
		})
	},
	changeNumberType(e){
		this.setData({
			numberType:e.target.id
		});
    this.changeDate({ target: { id: this.data.dateType} });
	},  
})
