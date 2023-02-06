// pages/basicsInfor/index.js
import API from '../../utils/API.js'
import { filterData } from '../../utils/filterData.js'
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filterData,
    orgId:null,
    inforData:{},
    setForm:{},
    isEditing:false,    
    isEnough:false,
    orgInfor: {},
    wordNumber:0,
    selectAddress:false
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
    let editPermission = (orgInfor.orgStatus == '2' && this.checkPermission('followUpCustomerPage_orgInfoPage:baseEditButton')) || (orgInfor.orgStatus != '2' && this.checkPermission('stayDownCustomerPage_orgInfoPage:baseEditButton'))

    this.setData({ editPermission })

    this.getOrgInfor()
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
   * 获取机构信息
   */
  getOrgInfor(){
    const orgId = this.data.orgId

    if (!this.data.isEditing) {
      API.getOrgInfor(orgId).then((res) => {
        const data = JSON.parse(JSON.stringify(res.data.data))
        let {
          orgJianName,
          brandName,
          nameUsedBefore,
          fixedTelephone,
          website,
          buildSchoolDate,
          isEstablistPartyOrg,
          orgAddressProvince,
          orgAddressCity,
          orgAddressArea,
          orgAddressDetail,
          remark,
          country          
        } = res.data.data
    
        this.setData({
          inforData: data,
          wordNumber:remark?remark.length:0,
          setForm: {
            nameUsedBefore,
            fixedTelephone,
            website,
            buildSchoolDate,
            orgAddressProvince,
            orgAddressCity,
            orgAddressArea,
            orgAddressDetail,
            remark,
            country,
            orgName: orgJianName || brandName,
            isEstablistPartyOrg: isEstablistPartyOrg - 1
          }
        })
      })
    } 
  },
  /**
   * 编辑信息
   */
  editInfor(){
    this.setData({
      isEditing:true,
      isEnough: this.data.setForm.orgName && this.data.setForm.orgAddressProvince
    })
  },
  /**
   * 取消编辑
   */
  cancle(){
    wx.showModal({
      title: '',
      content: '是否放弃修改？',
      cancelColor:'#999',
      confirmColor:'#017FFF',
      success:(res)=>{
        if(res.confirm){
          let {
            orgJianName,
            brandName,
            nameUsedBefore,
            fixedTelephone,
            website,
            buildSchoolDate,
            isEstablistPartyOrg,
            orgAddressProvince,
            orgAddressCity,
            orgAddressArea,
            orgAddressDetail,
            remark,
            country
          } = this.data.inforData

          this.setData({
            isEditing: false,
            wordNumber:remark?remark.length:0,
            setForm: {
              nameUsedBefore,
              fixedTelephone,
              website,
              buildSchoolDate,              
              orgAddressProvince,
              orgAddressCity,
              orgAddressArea,
              orgAddressDetail,
              remark,
              country,
              isEstablistPartyOrg: isEstablistPartyOrg - 1,
              orgName: orgJianName || brandName,
            }
          })
        }
      }
    })    
  },
  /**
   * 设置机构名称
   */
  setOrgName(e){
    this.setData({
      'setForm.orgName':e.detail.value
    })
    
    if (e.detail.value && this.data.setForm.orgAddressProvince){
      this.setData({
        isEnough:true
      })
    }else{
      this.setData({
        isEnough: false
      })
    }    
  },
  /**
   * 设置曾用名
   */
  setUsedName(e){
    this.setData({
      'setForm.nameUsedBefore': e.detail.value
    })
  },
  /**
   * 设置所属国家
   */
  setCountry(e){
    this.setData({
      'setForm.country': e.detail.value
    })
  },
  /**
   * 设置固定电话
   */
  setFixedTelephone(e){
    this.setData({
      'setForm.fixedTelephone': e.detail.value
    })
  },
  /**
   * 设置网址
   */
  setWbsite(e){
    this.setData({
      'setForm.website': e.detail.value
    })
  },
  /**
   * 设置企业生日
   */
  setDate(e){      
    this.setData({
      'setForm.buildSchoolDate':e.detail.value
    })
  },
  /**
   * 设置党组织
   */
  setParty(e){    
    this.setData({
      'setForm.isEstablistPartyOrg': e.detail.value
    })
  },
  /**
   * 设置备注
   */
  setRemark(e){    
    this.setData({
      'setForm.remark': e.detail.value,
      wordNumber: e.detail.value.length
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
      'setForm.orgAddressProvince': province,
      'setForm.orgAddressCity':city,
      'setForm.orgAddressArea':area,
      selectAddress:false
    })
  },  
  /**
   * 输入详细地址
   */
  setDetailAddress(e){
    this.setData({
      'setForm.orgAddressDetail':e.detail.value
    })
  },
  /**
   * 清除详细地址
   */
  clearAdressDetailInput(){
    this.setData({
      'setForm.orgAddressDetail':''
    })
  },
  /**
   * 地图选择地址
   */
  chooseAddress(){
    wx.setStorageSync('basicsInforFom', this.data.setForm)
    wx.getSetting({
      success:(res)=>{
        if (res.authSetting['scope.userLocation']){
          this.chooseLocation()
        }else{
          wx.showModal({
            title:'获取地理位置授权请求',
            content:'需要获取您的地理位置,去授权?',
            success:(res)=>{
              if (res.confirm){
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
  chooseLocation(){
    wx.chooseLocation({
      success:(res1)=>{
        let detail = `${res1.address}${res1.name}`
        wx.request({
          url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${res1.latitude},${res1.longitude}&key=F2KBZ-4EPCR-NFOWH-WU2W7-GYQWE-Z5F2Z`,
          success: (res2) => {
            let data = res2.data.result.address_component
            let header = data.province + data.city + data.district
            let reg = new RegExp(`^(${header}|${data.province}${data.district})`, 'i')
            let infor = wx.getStorageSync('basicsInforFom')
            
            let {
              nameUsedBefore,
              fixedTelephone,
              website,
              buildSchoolDate,
              isEstablistPartyOrg,
              remark,
              orgName,
              country,
              orgAddressProvince,
              orgAddressCity,
              orgAddressArea
            } = infor
            
            this.setData({
              'setForm.nameUsedBefore': nameUsedBefore,
              'setForm.fixedTelephone': fixedTelephone,
              'setForm.website': website,
              'setForm.buildSchoolDate': buildSchoolDate,
              'setForm.isEstablistPartyOrg': isEstablistPartyOrg,
              'setForm.remark': remark,
              'setForm.orgName': orgName,
              'setForm.country': country,
              'setForm.orgAddressProvince': orgAddressProvince,
              'setForm.orgAddressCity': orgAddressCity,
              'setForm.orgAddressArea': orgAddressArea,
              'setForm.orgAddressDetail': detail.replace(reg, '')
            })

            if (orgName && data.province) {
              this.setData({
                isEnough: true
              })
            } else {
              this.setData({
                isEnough: false
              })
            }

            // wx.setStorageSync('address', {
            //   city: [data.province, data.city, data.district],
            //   detail: res1.address
            // })
          }
        })
      }
    })
  },
  /**
   * 提交表单
   */
  formSubmit(e){
    let {
      orgAddressProvince,
      orgAddressCity,
      orgAddressArea,
      orgAddressDetail,
      buildSchoolDate,
      isEstablistPartyOrg
    } = this.data.setForm
    
    if (e.detail.value.orgName && orgAddressProvince && orgAddressDetail){
      API.saveOrgBasicInfo({
        ...e.detail.value,
        orgJianName: this.data.orgInfor.orgStatus != 2 ? e.detail.value.orgName:null,
        brandName: this.data.orgInfor.orgStatus == 2 ?e.detail.value.orgName: null,  
        isEstablistPartyOrg: e.detail.value.isEstablistPartyOrg != null && e.detail.value.isEstablistPartyOrg !== '' ?e.detail.value.isEstablistPartyOrg * 1 + 1:'',
        province: orgAddressProvince,
        city: orgAddressCity,
        area: orgAddressArea,
        addressDetail: orgAddressDetail,    
        orgId:this.data.orgId,
        companyBirthday:buildSchoolDate,
        isEstablistPartyOrg: isEstablistPartyOrg * 1 + 1
      }).then(res=>{
        this.setData({
          isEditing: false,
          isEnough: false
        })
        this.getOrgInfor()      
      })
    }else{
      wx.showToast({
        title: '必填项不能为空',
        icon:'none'
      })
    }  
  }  
})