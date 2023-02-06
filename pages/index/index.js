// pages/home/home.js
const API = require('../../utils/API.js');
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		currentDepartment: null,
		departmentList: [
      {
        label: '销售中心',
        value:2
      },
      {
      label:'商务中心',
      value:1 
    }],
		isMobileFocus: false,
		isPasswordFocus: false,
		mobile: '',
		password: ''
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {		
		
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
    //token存在直接登录，失效统一处理

    const token = wx.getStorageSync('token');
    if (token) {
      wx.reLaunch({
        url: '/pages/dashboard/index',
      })
    } else {
      wx.setStorageSync('token', null);
      wx.setStorageSync('viewType', null);
			wx.setStorageSync('useInfo', null);
			wx.setStorageSync('userPermission', {})
    }
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {

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
	onPullDownRefresh: function() {

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
	selectDepartment(e) {
		this.setData({
			currentDepartment: e.detail.value
		})
	},
	/**
	 * 登录
	 */
	formSubmit: function(e) {
		const {
			telephone,
			password
		} = e.detail.value;
		if (!this.data.currentDepartment) {
			wx.showToast({
				title: '请选择部门',
				icon: 'none'
			})
			return false;
		}
		if (!/1[3456789]\d{9}/.test(telephone)) {
			wx.showToast({
				title: '手机号码输入有误',
				icon: 'none'
			})
			return false;
		}
		API.login({
			telephone: telephone,
			password: password
		}).then((res) => {
			//console.log(res)
			let tk = res.header.tk||res.header.Tk;
			wx.setStorageSync('token',tk);
      wx.setStorageSync('viewType', this.data.departmentList[this.data.currentDepartment].value);
			wx.setStorageSync('useInfo', res.data.data)
      API.getPermission().then((res)=>{
				wx.setStorageSync('userPermission', res.data.data)        
				wx.setStorageSync('permissionList',res.data.data.permissionList)
        wx.setStorageSync('menuList', res.data.data.menuList)
      })
			// wx.reLaunch({
			// 	url: '../home/home',
			// })
			wx.redirectTo({
				url: '/pages/dashboard/index',
			})
		});

	},
	focusMobile() {
		this.setData({
			isMobileFocus: true
		})
	},
	blurMobile(e) {
		if (e.detail.value == '') {
			this.setData({
				isMobileFocus: false
			})
		}
	},
	changeMobild(e) {
		this.setData({
			mobile: e.detail.value,
		})
	},
	clearMobile() {
		this.setData({
			mobile: '',
		})
	},
	focusPassword() {
		this.setData({
			isPasswordFocus: true
		})
	},
	blurPassword(e) {
		if (e.detail.value == '') {
			this.setData({
				isPasswordFocus: false
			})
		}
	},
	changePassword(e){
		this.setData({
			password: e.detail.value
		})
	},
	clearPassword(){
		this.setData({
			password: ''
		})
	}
})
