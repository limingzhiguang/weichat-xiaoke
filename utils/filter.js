export const Filter = {
  /**
   * 来源分类
   */
  customerSource: [
    {
      value: 1,
      label: "网络搜索"
    },
    {
      value: 2,
      label: "网络主推"
    },
    {
      value: 3,
      label: "地推"
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
  /**
         * 合作紧密度
         * 1同修，2春风，3同路，4屏蔽客户
         **/
  cooperationIntensity: [
    {
      value: '同修',
      label: '同修'
    },
    {
      value: '春风',
      label: '春风'
    },
    {
      value: '同路',
      label: '同路'
    },
    {
      value: '屏蔽客户',
      label: '屏蔽客户'
    }
  ],
  /**
   * 咨询部合同登记
   */
  contractLevel: [
    {
      value: '1',
      label: 'A'
    },
    {
      value: '2',
      label: 'B'
    },
    {
      value: '3',
      label: 'C'
    },
    {
      value: '4',
      label: 'D'
    },
    {
      value: '5',
      label: 'E'
    },
    {
      value: '6',
      label: '无意向'
    }
  ],
  /**
   * 商务中心分类
   */
  businessCenter: [
    {
      value: '1',
      label: 'A'
    },
    {
      value: '2',
      label: 'B'
    },
    {
      value: '3',
      label: 'C'
    },
    {
      value: '4',
      label: 'D'
    },
    {
        value:"7",
        label:'无效',
    },
    {
        value:"8",
        label:'待定',
    }
  ],

  /**
   * 机构状态
   */
  orgStatus: [
    {
      value: "1",
      label: "待下发"
    },
    {
      value: "2",
      label: "跟进中"
    },
    {
      value: "3",
      label: "待踢单"
    },
    {
      value: "4",
      label: "退还待下发"
    },
    {
      value: "5",
      label: "移交客服"
    },
    {
      value: "6",
      label: "市场部死池"
    },
    {
      value: "7",
      label: "咨询部死池"
    }
  ],
  /**2019-3-25
         * 客户等级 1：A级客户，2：B级客户，3：C级客户，4：D级客户，5：一般客户
         */
  customerLevel: [
    {
      value: 1,
      label: "A级客户"
    },
    {
      value: 2,
      label: "B级客户"
    },
    {
      value: 3,
      label: "C级客户"
    },
    {
      value: 4,
      label: "D级客户"
    },
    {
      value: 5,
      label: "一般客户"
    }
  ],
}
