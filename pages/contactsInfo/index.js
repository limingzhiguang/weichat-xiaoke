// pages/contactsInfo/index.js
const API = require('../../utils/API.js');
const app = getApp()
const lunarCompute = require('../../utils/lunarCompute.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore:false,
    tabIndex:'1',
    followList:[],
    orgInfo:{},
    orgName:'',
    orgId:'',
    policyRelationList: ['关键决策','意见影响','普通'],
    viewType:null,
    isEditing:false
  },
  switchTab(e){
    let index = e.currentTarget.dataset.tabIndex;

    if(index === '2'  && !this.data.memorandumButton){
      this.showModal({
        title:'提示',
        content:'对不起，您无权查看跟进记录',
        confirmColor:'#017FFF'
      })
      return false
    }
    
    this.setData({
      tabIndex:index
    })
    if(index==='1'){
        
    }else{     
      this.findFollowUpLogList()      
    }
  },
  showMask(){
    this.setData({
      isEditing:true
    })
  },
  hideMask(){
    this.setData({
      isEditing:false
    })
  },
  callPhone(e){
    wx.showActionSheet({
      itemList: ['拨打电话', '复制电话'],
      success (res) {
        if(res.tapIndex===0){
          wx.makePhoneCall({
            phoneNumber: e.currentTarget.dataset.mobile
          })
        }else{
          // 设置剪贴板
          wx.setClipboardData({
            data: e.currentTarget.dataset.mobile,
            success (res2) {
              
            }
          })
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })
  },
  writeFollow(){
    let followOrgInfo = wx.getStorageSync('followOrgInfo')||{};
    followOrgInfo.orgName = this.data.orgName;
    followOrgInfo.orgId = this.data.orgId;
    followOrgInfo.isOrgDetail = '1';
    wx.setStorageSync('followOrgInfo',followOrgInfo);
    wx.setStorageSync('orgPerson', '')
    wx.navigateTo({
      url:`../writeFollow/index?orgName=${this.data.orgName}&orgId=${this.data.orgId}&isOrgDetail=1&isConInfo=1`
    })
  },
  editOrgInfo(){
    wx.setStorageSync('addContact', {
      ...this.data.orgInfo,
      orgId:this.data.orgId,
      orgName:this.data.orgName
    });
    
    wx.setStorageSync('followOrgInfo', {
      orgJianName:this.data.orgName,
      brandName:this.data.orgName,
      orgId:this.data.orgId      
    })
    
    if(this.data.isOrgDetail){
      wx.navigateTo({
        url:'../addContact/index?isOrgDetail=1&orgId=' + this.data.orgId + '&hasOrg=' + this.data.isOrgDetail + '&orgType=' + this.data.orgInfo.orgType
      })
    }else{
      wx.navigateTo({
        url:'../addContact/index?hasOrg=1&orgId=' + this.data.orgId +'&isOrgDetail=1&conInfo=1&orgType=' + this.data.orgInfo.orgType
      })
    }    
  },
  lookImage(){
    wx.previewImage({
      current: this.data.orgInfo.certificatesPic,
      urls: [this.data.orgInfo.certificatesPic]
    })
  },
  //更新数据
  updateList(){
    this.findFollowUpLogList()
  },
  findFollowUpLogList(){
    wx.showLoading({ title: '拼命加载中...' });
    try{
      API.findFollowUpLogList(this.data.orgId).then((res)=>{
        let resData = res.data.data||[];
        resData.forEach((item)=>{
          item.orgName = this.data.orgName;
        })
        this.setData({
          followList:resData
        })
        wx.hideLoading();
      })
    }catch(e){
      wx.hideLoading();
    }
  },
  // 获取人员信息
  async findCurrentOrgUser(id){
    const res = await API.findCurrentOrgUser(id);
    let resData = {};
    resData = res.data.data||{};
    // 历法转换
    if(resData&&resData.birthdayDate){
      let year = new Date(resData.birthdayDate).getFullYear();
      let month = new Date(resData.birthdayDate).getMonth() + 1;
      let today = new Date(resData.birthdayDate).getDate();
      resData.lunarDate = lunarCompute.sloarToLunar(year,month.toString().padStart(2, '0'),today); 
    }
    for(let key in resData){
      if(resData[key]===null){
        resData[key] = ''
      } 
    }
    this.setData({
      orgInfo:resData,
      viewType:resData.orgType
    })
  },
  toDetail(){
    if(!this.data.isOrgDetail){
      wx.redirectTo({
        url: '/pages/detail/detail?orgId=' + this.data.orgId 
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let viewType = wx.getStorageSync('viewType');
    
    this.setData({
      orgName:options.orgName,
      orgId:options.orgId,
      isOrgDetail: options.isOrgDetail      
    })
    this.findCurrentOrgUser(options.id)
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let orgInfor = app.globalData.orgInfor
    let editPermission = (orgInfor.orgStatus == '2' && this.checkPermission('followUpCustomerPage_personnelInfoPage:updateButton')) || (orgInfor.orgStatus != '2' && this.checkPermission('stayDownCustomerPage_personnelInfoPage:updateButton'))

    let memorandumButton = (orgInfor.orgStatus == '2' && this.checkPermission('upStreamPage:memorandumButton')) || ( orgInfor.orgStatus != '2' && this.checkPermission('downStreamPage:memorandumButton') )
  
    this.setData({ editPermission, memorandumButton })
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

  }
})