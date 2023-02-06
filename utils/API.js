//开发环境
// const baseUrl = "http://sale1.youpenglai.com";
//测试环境
const baseUrl = "https://course.test.youpenglai.com";
//线上环境
//const baseUrl = "https://shuidi.youpenglai.com";

const API_BASE_URL = baseUrl+"/courseWebCenter/api/";
const request = (url, method, data) => {
  let _url = API_BASE_URL + url;
  let token = wx.getStorageSync('token');
  // wx.showLoading({
  //   title:'努力加载中...',
  //   mask:true
  // })
  return new Promise((resolve, reject) => {
    wx.request({
      url: _url,
      method: method||'get',
      data: data,
      header: {
        'Content-Type': 'application/json',
        'tk': token
      },
      success(request) {
        if (request.data.code === '200' || request.data.rel===true){
          resolve(request)
        }else{ 
          //token过期去登录页
          switch (request.data.status){
            case 401:
              wx.setStorageSync('token', null);
              wx.setStorageSync('viewType', null);
              wx.setStorageSync('useInfo', null);
              wx.setStorageSync('userPermission', {})
              wx.clearStorage()
              wx.reLaunch({
                url: '/pages/index/index',
              })
            break;
          }
          //异常信息提示
          wx.showToast({
            title: request.data.msg || request.data.message || " 发生错误，请向管理员报告问题。",
            icon: 'none'
          });
        }
      },
      fail(error) {
        reject(error)
      },
      complete(aaa) {
        // 加载完成
       // wx.hideLoading()
      }
    })
  })
}

module.exports ={
  baseUrl: API_BASE_URL,
 //登录
 login:(data)=>{
   return request('course/scUser/login', 'post', { mobile: data.telephone, password:data.password});
 },
 // 省
 getProvinceLists:()=>{
   return request('course/ScProvince/queryProvinceList.do','post',{})
 },
 //市  
  getCityLists: (code) => {
    return request('course/ScProvince/queryCityList.do', 'post', {code:code})
  },
  //区
  getAreaLists: (code) => {
    return request('course/ScProvince/queryAreaList.do', 'post', { code: code })
  },
  //添加机构信息下游
  addOrgInfo: (data) => {
    return request('crm/v1/org/addOrgInfo', 'post',data)
  },
  //添加机构信息上游 
  addOrgInfoUpper:(data) => {
    return request('crm/v1/org/addUpStreamOrg', 'post', data)
  },
  //上传图片暂时没用着
  uploadInline: (data) =>{
    return request('course/file/uploadInline.do', 'post', data)
  },
  //保存门店照片
  saveOrgShopPic: (data) => {
    return request('crm/v1/orgShopPic', 'post', data)
  },
  //删除门店照片
  deleteOrgShopPic: (ids) => {
    return request('crm/v1/orgShopPic', 'delete', ids)
  },
  //查询门店照片
  findOrgShopPic: (orgId) => {
    return request('crm/v1/orgShopPic/' + orgId, 'get')
  },
  // 获取添加的学校数量排行榜数据
  getAddSchoolRankingData:()=>{
    return request('crm/v1/statistics/addOrgNumStatisticsForApp')
  },
  // 获取添加的学校数量排行榜数据
  getSendSchoolRankingData: () => {
    return request('crm/v1/statistics/sendOrgNumStatisticsForApp')
  },
  getPermission:() =>{
    return request('course/scPermission/getScUserPermission','get')
  },
  loginOut:()=>{
    return request('course/scUser/logOut','post')
  },

  // 机构详情-基础信息
  getOrgInfor: (orgId)=>{
    return request(`crm/v1/org/findOrgInfo/${orgId}`)
  },
  // 机构详情-保存基础信息
  saveOrgBasicInfo:(form)=>{
    return request('crm/v1/org/saveOrgBasicInfo','post',form)
  },
  // 机构详情-注册信息
  orgRegistration: (orgId) => {
    return request(`crm/v1/orgRegistration/${orgId}`)
  },
  // 机构详情-保存注册信息
  saveOrgRegistrationInfo: (form) => {
    return request('crm/v1/org/saveOrgRegistrationInfo', 'post', form)
  },
  // 机构详情-经营项目
  orgManagement: (orgId) => {
    return request(`crm/v1/orgManagement/${orgId}`)
  },
  // 机构详情-保存经营项目
  saveOrgManagementInfo: (form) => {
    return request('crm/v1/org/saveOrgManagementInfo', 'post', form)
  },
  // 机构详情-业绩预测
  performancePrediction: (orgId) => {
    return request('crm/v1/prediction/queryListById','get',{orgId})
  },
  // 机构详情-跟进记录
  findFollowUpLogList: (orgId) => {
    return request(`crm/v1/followUp/findFollowUpLogList/${orgId}`)
  },
  // 机构信息-联系人
  findContactsList: (orgId) => {
    return request(`crm/v1/org/findContactsList/${orgId}`)
  },
  // 更改销售分类
  updateConsultationDepartmentLevel: (orgId,value)=>{
    return request(`crm/v1/org/updateConsultationDepartmentLevel/${orgId}/${value}`, 'put')
  },
  // 更改客户分类
  updateCustomerServiceDepartmentLevel: (orgId, value) => {
    return request(`crm/v1/org/updateCustomerServiceDepartmentLevel/${orgId}/${value}`,'put')
  },
  // 更改商务中心分类
  updateBusinessCentreLevel: (orgId, value, value2)=>{
    return request(`crm/v1/org/updateBusinessCentreLevel/${orgId}/${value}/${value2}`, 'put')
  },
  // 班级分配
  updateOrgClazzInfo: (orgId,className)=>{
    return request(`crm/v1/org/updateOrgClazzInfo/${orgId}?clazzName=${className}`, 'put')
  }, 
  // 获取机构标签
  findLabelListByLabelGroup:(orgId)=>{
    return request(`crm/v1/label/findLabelListByLabelGroup/${orgId}`)
  },
  // 修改机构标签
  insertRelationLabelInfo: (orgId,arr)=>{
    return request(`crm/v1/label/insertRelationLabelInfo/${orgId}`, 'post', arr)
  },
  // 查询当前/历史顾问 type: 1-当前，2-历史 
  findOrgBeforeCounselor:(orgId,type)=>{
    return request(`crm/v1/org/findOrgBeforeCounselor/${orgId}/${type}`)
  },
  // 查询当前协同人
  findOrgCoordinationInfo: (orgId) => {
    return request(`crm/v1/coordination/findOrgCoordinationInfo/${orgId}`)
  },
  // 获取提交客户信息
  findSubmitCustomerInfo: (orgId)=>{
    return request(`crm/v1/org/findSubmitCustomerInfo/${orgId}`)
  },
  // 提交客户 待踢单-》 退还待下发
  submitCustomerToBackStayDown: (data)=>{
    return request('crm/v1/org/submitCustomerToBackStayDown','put',data)
  },
  // 提交客户 待踢单-》 咨询部公海池
  submitCustomerToConsultationDeadPool:(data)=>{
    return request('crm/v1/org/submitCustomerToConsultationDeadPool','put',data)
  },
  // 提交客户 待下发-》市场部死池
  submitCustomerToMarketDeadPool:(data)=>{
    return request('crm/v1/org/submitCustomerToMarketDeadPool','put',data)
  },
  // 提交客户 待踢单-》客服
  submitCustomerToMoveCustomerService:(data)=>{
    return request('crm/v1/org/submitCustomerToMoveCustomerService','put',data)
  },
  // 提交客户 待下发-》 待踢单
  submitCustomerToWaitingList:(data)=>{
    return request('crm/v1/org/submitCustomerToWaitingList','put',data)
  },
  // // 提交客户 市场部死池 -》 待下发
  // distributeFromMarketDeadPoolToStayDown:(data)=>{
  //   return request('crm/v1/org/distributeFromMarketDeadPoolToStayDown','put',data)
  // },// 提交客户 咨询部死池 -》 待踢单
  // distributeFromConsultationDeadPoolToWaitingList:(data)=>{
  //   return request('crm/v1/org/distributeFromConsultationDeadPoolToWaitingList','put',data)
  // },
  // 获取所有用户
  findAllList:()=>{
    return request('course/scUser/findAllList')
  },
  // 机构详情统计数据
  findOrgDataStatistics: (orgId, startDate, endDate)=>{
    return request(`crm/v1/org/findOrgDataStatistics`, 'get', { orgId, startDate, endDate})
  },
  // 上传照片接口
  uploadInline:(data)=>{
    return request(`course/file/uploadInline.do`,'post',{data})
  },
  





  //------------------------------
  // 全部客户列表
  findAllOrgList:(data)=>{
    return request('crm/v1/org/findMyOrgList', 'get',data)
  },
  // 全部客户列表的 total 
  findMyOrgListCount:(data)=>{
    return request('crm/v1/org/findMyOrgListCount', 'get',data)
  },
  // 机构人员列表 
  findOrgUserList:(orgId)=>{
    return request('crm/v1/org/findMyOrgList/'+orgId, 'get')
  },
  // 业绩预测列表 
  predictionByList:(data) =>{
    return request('crm/v1/prediction/predictionByList', 'get', data)
  },
  // 业绩预测 - 修改意向度
  updateIntentType(data){
    return request("crm/v1/prediction/updateIntentType/"+data.yjPredictionId, 'get',data)
  },
  // 业绩预测 - 修改阶段 
  predictionUpdateStatus(data){
    return request("crm/v1/prediction/updateStatus/"+data.yjPredictionId, 'get',data)
  },
  //首页-获取到人员信息
  findUserInfoByPermission:()=>{
    return request('course/scUser/findUserInfoByPermission', 'get')
  },
  //首页-简报看板 
  reportBulletin:(data)=>{
    return request('crm/v1/statistics/reportBulletin', 'get', data)
  },
  //跟进记录条件查询  
  followUpNumStatistics(data){
    return request('crm/v1/statistics/followUpNumStatistics/condition', 'get', data)
  },
  // 首页-遗忘提醒 
  findForgetRemindData:()=>{
    return request('crm/v1/statistics/findForgetRemindData', 'get')
  },
  // 跟进记录列表 
  followUp(data){
    return request('crm/v1/followUp', 'get', data)
  },
  //查询所有顾问 
  findCounselorList:()=>{
    return request('course/scUser/findAllList', 'get')
  },
  //机构标签标签 
  findOrgLabelList:()=>{
    return request('crm/v1/label/findOrgLabelList', 'get')
  },
  // 业绩预测标签
  findPerformanceForecastLabelGroup:()=>{
    return request('crm/v1/label/findPerformanceForecastLabelGroup', 'get')
  },
  //写跟进的机构联系人
  findOrgPerson:(id)=>{
    return request('crm/v1/org/findOrgUserList/'+id, 'get')
  },
  // 新增跟进记录
  addInsertFollowUpLog:(data)=>{
    return request('crm/v1/followUp/insertFollowUpLog', 'post', data)
  },
  //跟进记录 查询@人员
  findFollowUpRemindUser:(orgId)=>{
    return request('crm/v1/followUp/findFollowUpRemindUser/'+orgId, 'get')
  },
  // 跟进记录列表修改内容 
  updateFollowContent:(data)=>{
    return request('crm/v1/followUp/updateFollowContent', 'put', data)
  },

  // 待办 - 客户关怀 
  orgUserBirthdayRemind:(data)=>{
    return request('crm/v1/statistics/orgUserBirthdayRemind', 'get', data)
  },
  // 待办 - 跟进记录提醒
  orgFollowUpRemind:(data)=>{
    return request('crm/v1/statistics/orgFollowUpRemind', 'get', data)
  },
  // 联系人列表 
  contactList:(data)=>{
    return request('crm/v1/orgUser/findUserList', 'get', data)
  },
  // 联系人 total 
  contactListCount:(data)=>{
    return request('crm/v1/orgUser/findUserListCount', 'get', data)
  },
  // 保存机构人员 
  saveOrgUserInfo:(data)=>{
    return request('crm/v1/org/saveOrgUserInfo', 'post', data)
  }, 
  // 根据人员id查询人员信息
  findCurrentOrgUser:(id)=>{
    return request(`crm/v1/orgUser/${id}`, 'get')
  }
}