// pages/newclient.js
const API = require('../../utils/API.js');
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		address: '',
		detailAddress: '',
		province: '',
		city: '',
		district: '',
		street: '',
		street_number: '',
		message: '',
		toptipsType: 'success',
		samewithphone: false,
		gender: '',
		phone_number: '',
		wechat_number: '',
		hideSource: true,
		source: 0,
    hasJurisdiction:false,
    source_classify: [
      {
        value: 3,
        label: "地推"
      },
      {
        value: 1,
        label: "网络搜索"
      },
      {
        value: 2,
        label: "网络主推"
      },      
      {
        value: 4,
        label: "微信"
      },
      {
        value: 5,
        label: "转介绍"
      },
      {
        value: 6,
        label: "自荐"
      },
      {
        value: 7,
        label: "公司数据库"
      },
      {
        value: 8,
        label: "展会交流"
      },
      {
        value: 9,
        label: "其它"
      }
    ],
		viewType: null
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {
    
	},
	bindPickerChange: function(e) {
		//console.log('picker发送选择改变，携带值为', e.detail.value)
		this.setData({
			index: e.detail.value
		})
	},
	/**
	 * 跳转到地址选择页面
	 */
	linkAddressSelector() {
		wx.navigateTo({
			url: '../address/address'
		})
	},
	/**
	 * 获取定位地址
	 */
	getAddress() {
		wx.getSetting({
			success: res => {
				if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置,确认授权?',
            success:(res)=>{
              if(res.confirm){
                wx.openSetting({
                  success: (resx)=>{
                    if (resx.authSetting["scope.userLocation"] == true){
                      this.getLocation();
                    }
                  }
                })
              }
            }
          })          
				}
			}
		})
	},	

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {
		
		//console.log(viewType,typeof viewType)
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		wx.hideHomeButton();
    let viewType = wx.getStorageSync('viewType');
    const menuList = wx.getStorageSync('menuList');
    viewType = Number(viewType);
    // this.setData({
    //   viewType: viewType,
    //   hasJurisdiction: viewType === 1 ? menuList.includes('addCustomerUpstreamPage'):menuList.includes('addCustomerDownstreamPage'),
    // });

		let address = wx.getStorageSync("address");
		if (address) {
			this.setData({
				viewType: viewType,
      	hasJurisdiction: viewType === 1 ? menuList.includes('addCustomerUpstreamPage'):menuList.includes('addCustomerDownstreamPage'),
				address: address.city?address.city.join("/"):'',
				isIphoneX: app.globalData.isIphoneX			
			})
		} else {
			this.setData({
				viewType: viewType,
      	hasJurisdiction: viewType === 1 ? menuList.includes('addCustomerUpstreamPage'):menuList.includes('addCustomerDownstreamPage'),
				address: '',
				isIphoneX: app.globalData.isIphoneX
			})
		}

    // if (typeof this.getTabBar === 'function' &&
    //   this.getTabBar()) {
    //   this.getTabBar().setData({
    //     tab: 1
    //   })
    // }    
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
		wx.removeStorageSync("address");
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
	/**
	 * 提交表单
	 */
	formSubmit(e) {
		let form = e.detail.value;
		let source = this.data.source;
		//console.log(form);
		if (this.data.viewType === 2) {
			this.saveViewTypeOne(form, source);
		} else {
			this.saveViewTypeTwo(form, source)
		}
	},
	saveViewTypeOne(form, source) {
		for (let item in form) {
			if (!this.trim(form[item])) {
				let message = '';
				switch (item) {
					case 'org_name':
						message = '请输入企业名称';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'address_city':
						message = '请输入省市区地址';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'address_detail':
						message = '请输入详细地址';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'legal_person':
						message = '请输入联系人姓名';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'telephone_number':
						message = '请输入联系人电话号码';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
				}
			}

			if (item == 'telephone_number' && !/^1[3,4,5,6,7,8,9]\d{9}/.test(form[item])) {
				this.setData({
					message: '请输入正确的电话号码',
					toptipsType: 'error'
				})
				return false;
			}

			// if (source == 0) {
			// 	this.setData({
			// 		message: '请选择机构信息获取方式',
			// 		toptipsType: 'error'
			// 	})
			// 	return false;
			// }
		}

		let reqData = {
			orgJianName: form.org_name,
			province: form.address_city.split('/')[0],
			city: form.address_city.split('/')[1],
			area: form.address_city.split('/')[2],
			addressDetail: form.address_detail,
      customerSource: this.data.source_classify[this.data.source].value,
			orgRemark: form.org_remark,
			orgUserName: form.legal_person,
			sex: form.gender,
			phone: form.telephone_number,
			weixin: form.wechat_number,
			secondPhone: '',
			secondWeixin: '',
			jobName: form.duty,
			userRemark: form.person_remark
		};
		//console.log(reqData);
		API.addOrgInfo(reqData).then((res) => {
			//保存成功
			wx.setStorageSync('orgId', res.data.data.orgId);
			wx.removeStorageSync("address");
			wx.reLaunch({
				url: '../photos/photos'
			});
		});
	},
	saveViewTypeTwo(form) {
		for (let item in form) {
			if (!this.trim(form[item])) {
				let message = '';
				switch (item) {
					case 'org_name':
						message = '请输入品牌名称';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'address_city':
						message = '请输入省市区地址';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'address_detail':
						message = '请输入详细地址';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'legal_person':
						message = '请输入联系人姓名';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'duty':
						message = '请输入职务';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
					case 'telephone_number':
						message = '请输入联系人电话号码';
						this.setData({
							message,
							toptipsType: 'error'
						})
						return false;
						break;
				}
			}

			if (item == 'telephone_number' && !/^1[3,4,5,6,7,8,9]\d{9}/.test(form[item])) {
				this.setData({
					message: '请输入正确的电话号码',
					toptipsType: 'error'
				})
				return false;
			}
		}
		let reqDatas = {
			brandName: form.org_name,
			province: form.address_city.split('/')[0],
			city: form.address_city.split('/')[1],
			area: form.address_city.split('/')[2],
			addressDetail: form.address_detail,
			orgUserName: form.legal_person,
			sex: form.gender,
			phone: form.telephone_number,
			weixin: form.wechat_number,
			secondPhone: '',
			secondWeixin: '',
			jobName: form.duty
		};
		//console.log(reqDatas, 'viewtype为1');
		API.addOrgInfoUpper(reqDatas).then((res) => {
			//保存成功
			wx.setStorageSync('orgId', res.data.data.orgId);
			wx.removeStorageSync("address");
			wx.reLaunch({
				url: '../photos/photos'
			});
		});
	},
	/**
	 * 去前后空格
	 */
	trim(val) {
		const reg = /^\s+|\s+$/ig;
		return val.replace(reg, '')
	},
	/**
	 * 重置表单
	 */
	formReset() {
		this.setData({
			samewithphone: false,
			gender: '',
			source: 0
		})
	},
	/**
	 * 电话输入
	 */
	writePhone(e) {
		let number = e.detail.value;
		this.setData({
			phone_number: number
		});
		if (this.data.samewithphone) {
			this.setData({
				wechat_number: number
			});
		}
	},
	/**
	 * 与手机号一致
	 */
	getPhone() {
		if (!this.data.samewithphone) {
			this.setData({
				wechat_number: this.data.phone_number
			});
		}

		this.setData({
			samewithphone: !this.data.samewithphone
		});
	},
	changeGender(e) {
		this.setData({
			gender: e.detail.value
		})
	},
	selectSource(e) {
		this.setData({
			source: e.detail.value
		})
	},
	getLocation() {
		wx.chooseLocation({
			success: (res1) => {
				let detail = `${res1.address}${res1.name}`;
				wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res1.latitude},${res1.longitude}&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z`,
					success: (res2) => {
						let data = res2.data.result.address_component;
						let reg = new RegExp(`^${data.city}${data.district}`, 'i');
						this.setData({
						//	address: `${data.province}/${data.city}/${data.district}`,
							detailAddress: detail.replace(reg, '')
						})
						wx.setStorageSync('address', {
						//	city: [data.province, data.city, data.district],
							detail: res1.address
						})
					}
				})
			},
			fail:(err)=>{
				this.getAddress();
			}
		})
	},

})
