// pages/register/index.js
import API from '../../utils/API.js'
import { filterData } from '../../utils/filterData.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterData,
    orgId: null,
    inforData: {},
    setForm: {},
    isEditing: false,
    orgInfor:{},
    wordNumber:0,
    selectAddress:false
  },
  lookBigImage(e){
    wx.previewImage({
      current: e.currentTarget.dataset.src,
      urls: [e.currentTarget.dataset.src]
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orgId: options.orgId,
      orgInfor: app.globalData.orgInfor,
      isIphoneX: app.globalData.isIphoneX
    })
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
    let orgInfor = app.globalData.orgInfor
    let editPermission = (orgInfor.orgStatus == '2' && this.checkPermission('followUpCustomerPage_orgInfoPage:registrInfoEditButton')) || (orgInfor.orgStatus != '2' && this.checkPermission('stayDownCustomerPage_orgInfoPage:registrInfoEditButton'))

    this.setData({ editPermission })

    this.getOrgRegisterInfor()
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
  /**
   * 
   * 权限检查
   */
  checkPermission(per){
    const permissionList = wx.getStorageSync('permissionList') 
    let btnPermission = permissionList?permissionList:[]

    return btnPermission.includes(per) 
  },
  /**
   * 获取机构注册信息
   */
  getOrgRegisterInfor(){
    if (!this.data.isEditing){
      API.orgRegistration(this.data.orgId).then((res)=>{
        const data = JSON.parse(JSON.stringify(res.data.data))
        
        let {
          orgQuanName,
          tyxyCode,
          companyType,
          annualOutput,
          registeredCapital,
          province,
          city,
          area,
          addressDetail,
          isFinancing,
          yearTurnover,
          financingLog,
          yyzzPic,
          bxxkzPic,
          otherPic,
          remark
        } = res.data.data
        
        this.setData({
          inforData: data,
          wordNumber:remark?remark.length:0,
          setForm:{
            orgQuanName,
            tyxyCode,            
            registeredCapital,
            province,
            city,
            area,
            addressDetail,
            isFinancing,
            yearTurnover,
            financingLog,
            yyzzPic,
            bxxkzPic,
            otherPic,
            remark,
            companyType: companyType - 1,
            annualOutput: annualOutput - 1,
          }
        })
      })
    } 
  },
  /**
   * 编辑
   */
  editInfor(){
    this.setData({
      isEditing:true
    })
  },
  /**
   * 设置工商注册名
   */
  setOrgName(e){
    this.setData({
      'setForm.orgQuanName':e.detail.value
    })
  },
  /**
   * 设置统一社会信用代码
   */
  setCreditCode(e) {
    this.setData({
      'setForm.tyxyCode': e.detail.value
    })
  },
  /**
   * 设置商业性质
   */
  setCompanyType(e){
    this.setData({
      'setForm.companyType': e.detail.value
    })
  },
  /**
   * 设置年产值
   */
  setAnnualOutput(e){
    this.setData({
      'setForm.annualOutput': e.detail.value
    })
  },
  /**
   * 设置注册资金
   */
  setRegisterCapital(e){    
    this.setData({
      'setForm.registeredCapital': e.detail.value      
    })
  }, 
  /**
   * 选择地址
   */
  selectAddress(){
    this.setData({
      selectAddress:true
    })
  },
  hideAddress(){
    this.setData({
      selectAddress:false
    })
  },
  /**
   * 确定选中地址
   */
  selectedAddress(e){
    let { province ,city ,area } = e.detail
    
    this.setData({
      'setForm.province': province,
      'setForm.city':city,
      'setForm.area':area,
      selectAddress:false
    })
  },   
  /**
   * 地图选择地址
   */
  chooseAddress() {
    wx.setStorageSync('registerInforFom', this.data.setForm)
    
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation']) {
          this.chooseLocation()
        } else {
          wx.showModal({
            title: '获取地理位置授权请求',
            content: '需要获取您的地理位置,去授权?',
            success: (res) => {
              if (res.confirm) {
                wx.openSetting({
                  success: (resx) => {
                    if (resx.authSetting["scope.userLocation"] == true) {
                      this.chooseLocation()
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
   * 打开定位地图
   */
  chooseLocation() {
    wx.chooseLocation({
      success: (res1) => {
        let detail = `${res1.address}${res1.name}`
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res1.latitude},${res1.longitude}&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z`,
          success: (res2) => {
            let data = res2.data.result.address_component
            let header = data.province + data.city + data.district
            let reg = new RegExp(`^(${header}|${data.province}${data.district})`, 'i')
            let infor = wx.getStorageSync('registerInforFom')

            let {
              orgQuanName,
              tyxyCode,
              companyType,
              annualOutput,
              registeredCapital,
              province,
              city,
              area,              
              isFinancing,
              yearTurnover,
              financingLog,
              yyzzPic,
              bxxkzPic,
              otherPic,
              remark,
            } = infor
            
            this.setData({
              'setForm.orgQuanName': orgQuanName,
              'setForm.tyxyCode': tyxyCode,
              'setForm.companyType': companyType,
              'setForm.annualOutput': annualOutput,
              'setForm.registeredCapital': registeredCapital,           
              'setForm.province': province,
              'setForm.city': city,
              'setForm.area': area,
              'setForm.addressDetail': detail.replace(reg, ''),            
              'setForm.isFinancing': isFinancing,
              'setForm.yearTurnover': yearTurnover,
              'setForm.financingLog': financingLog,
              'setForm.yyzzPic': yyzzPic,
              'setForm.bxxkzPic': bxxkzPic,
              'setForm.otherPic': otherPic,
              'setForm.remark': remark
            })                        
          }
        })
      }
    })
  },
   /**
   * 输入详细地址
   */
  setDetailAddress(e){
    this.setData({
      'setForm.addressDetail':e.detail.value
    })
  },
  /**
   * 清除详细地址
   */
  clearAdressDetailInput(){
    this.setData({
      'setForm.addressDetail':''
    })
  },
  /**
   * 是否融资
   */
  setFinancing(){
    wx.showActionSheet({
      itemList:['否','是'],
      success:(res)=>{
        this.setData({
          'setForm.isFinancing': res.tapIndex* 1 + 1 
        })
      }
    })
  },
  /**
   * 设置年营业额
   */
  setYearTurnover(e){
    this.setData({
      'setForm.yearTurnover':e.detail.value
    })
  },
  /**
   * 设置股票
   */
  setFinancingLog(e){
    this.setData({
      'setForm.financingLog': e.detail.value
    })
  },  
  /**
   * 上传营业执照
   */
  uploadYyzz(){
    if(this.data.isEditing){
      wx.chooseImage({
        success: (res) => {
          let that = this
          let tempFiles = res.tempFiles
          wx.showLoading({
            title: '上传图片中...',
            mask:true
          })
          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[0].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);
              if (data.code === '200') {
                wx.showToast({
                  title: '营业执照上传成功'
                })
                that.setData({
                  'setForm.yyzzPic': data.url
                })                
              } else {
                //token过期去登录页
                switch (data.code) {
                  case 401:
                    wx.setStorageSync('token', '');
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                    break;
                }
                //异常提示
                wx.showToast({
                  title: "网络异常或服务暂时开小差",
                  icon: 'none'
                });
              }
            }
          })
        }
      })
    } 
  },
  /**
   * 移除营业执照
   */
  removeYyzz(){
    this.setData({
      'setForm.yyzzPic': ''
    })
  },
  /**
   * 上传办学许可
   */
  uploadBxxk() {
    if (this.data.isEditing) {
      wx.chooseImage({
        success: (res) => {
          let that = this
          let tempFiles = res.tempFiles

          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[0].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);
              if (data.code === '200') {
                that.setData({
                  'setForm.bxxkzPic': data.url
                })
              } else {
                //token过期去登录页
                switch (data.code) {
                  case 401:
                    wx.setStorageSync('token', '');
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                    break;
                }
                //异常提示
                wx.showToast({
                  title: "网络异常或服务暂时开小差",
                  icon: 'none'
                });
              }
            }
          })
        }
      })    
    } 
  },
  /**
   * 移除办学许可
   */
  removeBxxk(){
    this.setData({
      'setForm.bxxkzPic': ''
    })
  },
  /**
   * 上传其他图片
   */
  uploadOther() {
    if (this.data.isEditing) {
      wx.chooseImage({
        success: (res) => {
          let that = this
          let tempFiles = res.tempFiles

          wx.uploadFile({
            url: `${API.baseUrl}course/file/uploadInline.do`,
            filePath: tempFiles[0].path,
            name: 'file',
            header: {
              "Content-Type": "multipart/form-data",
              'Tk': wx.getStorageSync('token')
            },
            formData: {},
            success(res2) {
              const data = JSON.parse(res2.data);
              if (data.code === '200') {
                that.setData({
                  'setForm.otherPic': data.url
                })
              } else {
                //token过期去登录页
                switch (data.code) {
                  case 401:
                    wx.setStorageSync('token', '');
                    wx.reLaunch({
                      url: '/pages/index/index',
                    })
                    break;
                }
                //异常提示
                wx.showToast({
                  title: "网络异常或服务暂时开小差",
                  icon: 'none'
                });
              }
            }
          })
        }
      })     
    }  
  },
  /**
   * 移除其他图片
   */
  removeOther(){
    this.setData({
      'setForm.otherPic': ''
    })
  },
  /**
   * 设置备注
   */
  setRemark(e){    
    this.setData({
      'setForm.remark':e.detail.value,
      wordNumber: e.detail.value.length
    })
  },
  /**
   * 取消编辑
   */
  cancle() {
    wx.showModal({
      title: '',
      content: '是否放弃修改？',
      cancelColor: '#999',
      confirmColor: '#017FFF',
      success: (res) => {
        if (res.confirm) {
          let {
            orgQuanName,
            tyxyCode,
            companyType,
            annualOutput,
            registeredCapital,
            province,
            city,
            area,
            addressDetail,
            isFinancing,
            yearTurnover,
            financingLog,
            yyzzPic,
            bxxkzPic,
            otherPic,
            remark
          } = this.data.inforData

          this.setData({
            isEditing: false,
            wordNumber:remark?remark.length:0,
            setForm: {
              orgQuanName,
              tyxyCode,              
              registeredCapital,
              province,
              city,
              area,
              addressDetail,
              isFinancing,
              yearTurnover,
              financingLog,
              yyzzPic,
              bxxkzPic,
              otherPic,
              remark,
              companyType: companyType - 1,
              annualOutput: annualOutput - 1
            }
          })
        }
      }
    })
  },
  formSubmit(e){
    let {
      province,
      city,
      area,
      addressDetail,      
      yyzzPic,
      bxxkzPic,
      otherPic,
      isFinancing
    } = this.data.setForm

    API.saveOrgRegistrationInfo({
      ...e.detail.value,
      province,
      city,
      area,
      addressDetail,
      yyzzPic,
      bxxkzPic,
      otherPic,
      isFinancing,
      companyType: e.detail.value.companyType != null && e.detail.value.companyType !== ''?e.detail.value.companyType * 1 + 1:'',
      annualOutput: e.detail.value.annualOutput != null && e.detail.value.annualOutput !== '' ?e.detail.value.annualOutput * 1 + 1:'',
      orgId: this.data.orgId
    }).then((res)=>{
      this.setData({
        isEditing: false
      })
      this.getOrgRegisterInfor()  
    })
  }
})