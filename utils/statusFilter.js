/**
 * 状态统一注册过滤器
 * 
*/
const filterObject = {
  orgStatusList:[
    {
      value: 1,
      label: "待下发"
  },
  {
      value: 2,
      label: "跟进中"
  },
  {
      value: 3,
      label: "待踢单"
  },
  {
      value: 4,
      label: "退还待下发"
  },
  {
      value: 5,
      label: "移交客服"
  },
  {
      value: 6,
      label: "市场部死池"
  },
  {
      value: 7,
      label: "咨询部死池"
  }
  ]
}

module.exports = {
  filterObject:filterObject
}