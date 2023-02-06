// pages/detail/detail.js
import API from '../../utils/API.js'
import * as dateCount from '../../utils/date.js'
import { filterData } from '../../utils/filterData.js'

const app = getApp()
const { contractLevel, cooperationIntensity, businessCenter } = filterData
const dateTypeArr = [
  { value: 'today', label: '今日' },
  { value: 'yestoday', label: '昨日' },
  { value: 'week', label: '本周' },
  { value: 'month', label: '本月' }
]

Page({

  /**
   * 页面的初始数据
   */
  data: {    
    filterData,
    contractLevel,
    cooperationIntensity,
    businessCenter,
    dateTypeArr,
    pixelRatio:2,
    imgSrc:'',
    dateType:'today',
    inforData:'',
    orgId: null,
    orgName:'',
    currentContract: null,
    currentCooperation:null,
    currentBusinessCenter:null,
    clazzName:'',
    isShowClass:false,
    isShowTags:false,
    followupNum:0,
    saleChangeNum:0,
    saleChangeMoney:0,
    upperPermission:{},
    downPermission:{},
    t:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.setData({
      orgId: options.orgId,
      t:options.t
    })   
    // wx.showLoading()
    // this.getData(options.orgId)    
    // this.getStatisticsData(options.orgId, dateCount.today(), dateCount.today())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.prompt = this.selectComponent("#prompt")
    this.tags = this.selectComponent("#tags")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {   
    let orgId = this.data.orgId || app.globalData.orgInfor.orgId    
    this.setData({
      // 上/下游 - 添加标签
      'upperPermission.addLabelButton': this.checkPermission('button','followUpCustomerPage:addLabelButton'),      
      'downPermission.addLabelButton': this.checkPermission('button','stayDownCustomerPage:addLabelButton'),
      // 上/下游 - 查看机构信息
      'upperPermission.orgInfoPage': this.checkPermission('menu','followUpCustomerPage_orgInfoPage'),
      'downPermission.orgInfoPage': this.checkPermission('menu','stayDownCustomerPage_orgInfoPage'),
      // 上/下游 - 业绩预测
      'upperPermission.preIncomeInfoPage': this.checkPermission('menu','followUpCustomerPage_preIncomeInfoPage'),
      'downPermission.preIncomeInfoPage': this.checkPermission('menu','stayDownCustomerPage_preIncomeInfoPage'),
      // 上/下游 - 跟进记录
      'upperPermission.memorandumButton': this.checkPermission('button','upStreamPage:memorandumButton'),
      'downPermission.memorandumButton': this.checkPermission('button','downStreamPage:memorandumButton'),
      // 上/下游 - 人员信息
      'upperPermission.personnelInfoPage': this.checkPermission('menu','followUpCustomerPage_personnelInfoPage'),
      'downPermission.personnelInfoPage': this.checkPermission('menu','stayDownCustomerPage_personnelInfoPage'),
      // 下游 - 销售分类
      'downPermission.consultDepButton': this.checkPermission('button','stayDownCustomerPage:consultDepButton'),
      // 下游 - 客户分类
      'downPermission.custServDepButton': this.checkPermission('button','stayDownCustomerPage:custServDepButton'),
      // 下游 - 班级
      'downPermission.unallocatedUpdateButton': this.checkPermission('button','stayDownCustomerPage:unallocatedUpdateButton'),
      // 上/下游 - 工作人员
      'upperPermission.personnelElasticFrame': this.checkPermission('button','followUpCustomerPage:personnelElasticFrame'),
      'downPermission.personnelElasticFrame': this.checkPermission('button','stayDownCustomerPage:personnelElasticFrame'),
      // 下游 - 提交客户
      'downPermission.submitCustomerElasticFrame': this.checkPermission('button','stayDownCustomerPage:submitCustomerElasticFrame'),   
      // 上游 - 商务分类
      'upperPermission.businessCentreUpdateButton': this.checkPermission('button','followUpCustomerPage:businessCentreUpdateButton')
    })
    
    this.getData(orgId)
    this.getStatisticsData(orgId, dateCount.today(), dateCount.today())

    // switch(this.data.t){
    //   case '1':
    //      this.toPerformance();
    //   break;
    //   case '2':
    //     this.toFollowUp();
    //  break;
    // } 
    // this.setBgImg(app.globalData.orgInfor.orgStatus)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // 清除提交客户的storage
    wx.removeStorageSync('statusLink')
    wx.removeStorageSync('submitUser') 
    this.setData({
      t:''
    })
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
  // 检查权限
  checkPermission(type,per){
    const permissionList = wx.getStorageSync('permissionList')
    const menuList = wx.getStorageSync('menuList')
    let btnPermission = permissionList?permissionList:[]
    let menuPermission = menuList?menuList:[]
    
    if(type === 'menu'){
      return menuPermission.includes(per)
    }else{
      return btnPermission.includes(per)
    }    
  },
  // 图片
  setBgImg(status){    
    let pixelRatio = this.getPixelRatio()
    let imgSrc
    // imgSrc
    if (pixelRatio == 2){
      imgSrc = status == 2 ? '../../images/orange_bg_2x.png' :'../../images/blue_bg_2x.png'
    }else{
      imgSrc = status == 2 ? '../../images/orange_bg.png' : '../../images/blue_bg.png'
    }
    this.setData({
      imgSrc
    })
  },
  // 获取设备像素比
  getPixelRatio(){
    let pixelRatio = 0
    wx.getSystemInfo({
      success: function (res) {
        pixelRatio = res.pixelRatio
      },
      fail: function () {
        pixelRatio = 0
      }
    })
    return pixelRatio
  },
  // 获取数据
  getData(orgId){
    API.getOrgInfor(orgId).then((res) => {
      const data = res.data.data
      this.setData({
        orgId,
        inforData: data,
        currentContract: data.consultationDepartmentLevel - 1,
        currentCooperation: data.cooperateLevel,
        currentBusinessCenter: data.businessCentreSecondLevel - 1,
        clazzName: data.clazzName
      })
      this.setBgImg(data.orgStatus)
      let {
        orgJianName,
        orgId,
        orgStatus,
        brandName,
        orgAddressProvince,
        orgAddressCity,
        orgAddressArea,
        orgAddressDetail
      } = data
     
      app.globalData.orgInfor = {
        orgId,
        orgJianName,
        brandName,
        orgStatus,
        address: orgAddressProvince + orgAddressCity + orgAddressArea + orgAddressDetail        
      }

      wx.hideLoading()
    })
  },
  getStatisticsData(orgId,startDate,endDate){
    wx.showLoading({
      title: '努力加载中...'
    })
    API.findOrgDataStatistics(orgId, startDate, endDate).then((res)=>{
      let { followupNum, saleChangeNum, saleChangeMoney } = res.data.data

      this.setData({
        followupNum,
        saleChangeNum,
        saleChangeMoney
      })

      wx.hideLoading()
    },(err)=>{
      wx.showToast({
        title:'数据获取失败',
        icon:'none'
      })
    })
  },
  // 标签修改
  changeTag(){
    this.setData({
      isShowTags:true
    })
    this.tags.showThis(this.data.inforData.orgId)
  },
  // 操作：更改分类
  changeContract(e) {
    API.updateConsultationDepartmentLevel(this.data.inforData.orgId, e.detail.value*1 + 1).then((res)=>{      
      this.setData({
        currentContract: e.detail.value
      })
    })
  },
  changeCooperation(e) {
    let label = this.data.cooperationIntensity[e.detail.value].label

    API.updateCustomerServiceDepartmentLevel(this.data.inforData.orgId, label).then((res)=>{
      this.setData({
        currentCooperation: label
      })
    })
  },
  changeBusinessCenter(e) {     
    let val1,val2
    val2 = this.data.businessCenter[e.detail.value].value
    val1 = val2 == '7' ? '2' : (val2 == '8'?'3':'1')
    API.updateBusinessCentreLevel(this.data.inforData.orgId, val1, val2).then((res) => {
      this.setData({
        currentBusinessCenter: e.detail.value
      })     
    })
  },

  // 切换数据统计日期
  switchDate(e){
    let id = e.target.id
    let startDate, endDate = dateCount.today()  
    
    if (id === this.data.dateType || !id) return false
    
    switch(id){
      case 'today':
        startDate = dateCount.today()
        break
      case 'yestoday':
        startDate = dateCount.yesterday()
        endDate = startDate
        break
      case 'week':
        startDate = dateCount.weekFirstDay()
        break
      case 'month':
        startDate = dateCount.monthFirstDay()
        break      
    }
    this.getStatisticsData(this.data.inforData.orgId, startDate, endDate)
    this.setData({
      dateType: id
    })
  },
  // 班级分配
  allotClass() {
    this.setData({
      isShowClass:true
    })
    this.prompt.showPrompt(this.data.clazzName)
  },
  // prompt
  getVal(e) {
    API.updateOrgClazzInfo(this.data.inforData.orgId, e.detail.value).then((res)=>{      
      this.setData({
        clazzName: e.detail.value        
      })
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
    })
  },
  // 标签设置
  setTags(){
    this.getData(this.data.inforData.orgId)
  },
  // 查看顾问
  lookCounselor(){
    wx.navigateTo({
      url: '/pages/counselor/index?orgId=' + this.data.inforData.orgId
    })
  },
  // 提交客户
  submitCustom(){
    wx.navigateTo({
      url: '/pages/dataFlow/index?orgId=' + this.data.inforData.orgId + '&orgStatus=' + this.data.inforData.orgStatus
    })
  },
  /**
   * 基本信息
   */
  toBasics(){
    app.globalData.orgInfor.type = 1
    wx.navigateTo({
      url: '/pages/basicsInfor/index?orgId=' + this.data.inforData.orgId
    })
  },
  /**
   * 注册信息
   */
  toRegister() {
    app.globalData.orgInfor.type = 2
    wx.navigateTo({
      url: '/pages/register/index?orgId=' + this.data.inforData.orgId
    })
  },
  /**
   * 营销项目
   */
  toProject() {
    app.globalData.orgInfor.type = 3
    if(this.data.inforData.orgStatus != '2'){
      wx.navigateTo({
        url: '/pages/project/index?orgId=' + this.data.inforData.orgId
      })
    }else{
      wx.navigateTo({
        url: '/pages/upperProject/index?orgId=' + this.data.inforData.orgId
      })
    }  
  },
  /**
   * 业绩预测
   */
  toPerformance() {
    let {orgId,orgJianName,brandName,} = app.globalData.orgInfor;
    let orgName = orgJianName||brandName;
    app.globalData.orgInfor.type = 4;

    wx.navigateTo({
      url: `/pages/performance/index?orgId=${orgId}&orgName=${orgName}`
    })
  },
  /**
   * 跟进记录
   */
  toFollowUp() {
    let {orgId,orgJianName,brandName,} = app.globalData.orgInfor;
    let orgName = orgJianName||brandName;
    app.globalData.orgInfor.type = 5
    wx.navigateTo({
      url: `/pages/followUp/index?orgId=${orgId}&orgName=${orgName}`
    })
  },
  /**
   * 联系人
   */
  toContact() {
    let {orgId,orgJianName,brandName,} = app.globalData.orgInfor;
    app.globalData.orgInfor.type = 6;
    wx.navigateTo({
      url: '/pages/contact/index?orgId=' + orgId
    })
  }
})