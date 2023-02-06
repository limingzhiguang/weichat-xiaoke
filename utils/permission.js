// utils/permission.js
//权限控制

/**
 * params{type} type 1页面权限，2按钮权限
 * 
*/
const getPermissionList = function(type){
  const userPermission = wx.getStorageSync('userPermission');
   if(type===1){
      return userPermission.menuList||[];
   }else{
    return userPermission.permissionList||[];
   }
}
const menuControl = function(mark) {
  let menuList = getPermissionList(1);
  let isOk = menuList.includes(mark);
  if(!isOk){
    wx.showModal({
      title: '提示',
      showCancel:false,
      content: '您无权限查看该页面，如需要请联系管理员',
      success (res) {
       
      }
    })
  }
  return isOk;
}

const btnControl = function(mark){
  let btnList = getPermissionList(2);
  let isOk = btnList.includes(mark);
  return isOk;
}

module.exports = {
  menuControl:menuControl,
  btnControl:btnControl
}