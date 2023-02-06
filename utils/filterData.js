export const filterData = {
  /**
   * 付款方式 0:网银，1：支付宝，2：微信，3：银行，4：POS机 ，5，朋来
   */
  payType: [{
      value: "0",
      label: "网银"
    },
    {
      value: "1",
      label: "支付宝"
    },
    {
      value: "2",
      label: "微信"
    },
    {
      value: "3",
      label: "银行"
    },
    {
      value: "4",
      label: "POS机"
    },
    {
      value: "5",
      label: "朋来"
    }
  ],
  /**
   * 回款类型 0:正常回款，1：逾期回款，2：其他
   */
  paybackType: [{
      value: "0",
      label: "正常回款"
    },
    {
      value: "1",
      label: "逾期回款"
    },
    {
      value: "2",
      label: "其他"
    }
  ],
  /**
   * 逾期状态 0:正常，1：逾期
   */
  overdueStatus: [{
      value: "0",
      label: "正常"
    },
    {
      value: "1",
      label: "逾期"
    }
  ],
  /**
   * 票据类型 0：普票，1：增票
   */
  billType: [{
      value: "0",
      label: "普票"
    },
    {
      value: "1",
      label: "增票"
    },
    {
      value: "2",
      label: "收据"
    }
  ],
  /**
   * 申报状态 0：未申报，1：已申报
   */
  declareStatus: [{
      value: "0",
      label: "未申报"
    },
    {
      value: "1",
      label: "已申报"
    }
  ],
  /**
   * 项目形式 0:新增，1：复训，2：现场报名
   */
  courseParticipation: [{
      value: "0",
      label: "新增"
    },
    {
      value: "1",
      label: "复训"
    },
    {
      value: "2",
      label: "现场报名"
    }
  ],
  /**
   * 开票状态 0：待审核，1：审核通过，2：审核拒绝
   */
  openTicketStatus: [{
      value: "0",
      label: "待审核"
    },
    {
      value: "1",
      label: "审核通过"
    },
    {
      value: "1",
      label: "审核拒绝"
    }
  ],
  /**
   * 是否开票 0：未开票，1：已开票
   */
  isOpenTicket: [{
      value: 0,
      label: "未开票"
    },
    {
      value: 1,
      label: "已开票"
    }
  ],
  /**
   * 开课状态 1：未开始，2：开课中，3：已停止，4：结束
   */
  giveCourseStatus: [{
      value: "1",
      label: "未开始"
    },
    {
      value: "2",
      label: "开课中"
    },
    {
      value: "3",
      label: "已停止"
    },
    {
      value: "4",
      label: "已结束"
    }
  ],
  /**
   * 消课情况
   * 1未消课、2未消完、3已消完
   */
  classBreaks: [{
      value: 1,
      label: "未消课"
    },
    {
      value: 2,
      label: "未消完"
    },
    {
      value: 3,
      label: "已消完"
    }
  ],
  /**
   * 归档状态 1-未归档 2-已归档
   */
  archiveStatus: [{
      value: "1",
      label: "未归档"
    },
    {
      value: "2",
      label: "已归档"
    }
  ],
  /**
   * 归档审核状态 1：提交审核，2：审核中，3：重新提交，4：审核通过
   */
  auditorStatus: [{
      value: "1",
      label: "提交审核"
    },
    {
      value: "2",
      label: "审核中"
    },
    {
      value: "3",
      label: "重新提交"
    },
    {
      value: "4",
      label: "审核通过"
    }
  ],
  /**
   * 交付方式 1-集中交付 2-专场
   */
  deliverType: [{
      value: "1",
      label: "集中交付"
    },
    {
      value: "2",
      label: "专场"
    }
  ],
  /**
   * 参课形式 1消课,2-补课,3复训,4新增,5现场报名
   */
  courseParticipation2: [{
      value: "1",
      label: "消课"
    },
    {
      value: "2",
      label: "补课"
    },
    {
      value: "3",
      label: "复训"
    },
    {
      value: "4",
      label: "新增"
    },
    {
      value: "5",
      label: "现场报名"
    }
  ],
  /**
   * 签到状态 0：未签到，1：已签到
   */
  signStatus: [{
      value: "0",
      label: "未签到"
    },
    {
      value: "1",
      label: "已签到"
    }
  ],
  /**
   * 消课方式1-课次,2-人次
   */
  eliminateCourseType: [{
      value: "1",
      label: "课次"
    },
    {
      value: "2",
      label: "人次"
    }
  ],
  /**
   * 审核状态（早期） 1-待审核,2-审核中,3-审核成功,4-审核失败
   */
  auditStatus: [{
      value: "1",
      label: "待审核"
    },
    {
      value: "2",
      label: "审核中"
    },
    {
      value: "3",
      label: "审核成功"
    },
    {
      value: "4",
      label: "审核失败"
    }
  ],
  /**
   * 通知状态     1-未通知    2-已通知    3-已确认    4-取消确认
   */
  notificationStatus: [{
      value: "1",
      label: "未通知"
    },
    {
      value: "2",
      label: "已通知"
    },
    {
      value: "3",
      label: "已确认"
    },
    {
      value: "4",
      label: "取消确认"
    }
  ],
  /**
   * 审核状态 1-待审 2-审核成功 3-审核失败
   */
  contractAuditStatus: [{
      value: "1",
      label: "审核中"
    },
    {
      value: "2",
      label: "审核成功"
    },
    {
      value: "3",
      label: "审核失败"
    },
    {
      value: "4",
      label: "撤销"
    }
  ],
  /**2019-3-25
   * 客户等级 1：A级客户，2：B级客户，3：C级客户，4：D级客户，5：一般客户
   */
  customerLevel: [{
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
  /**
   * 客户性质 1：机构，2：个人
   */
  customerNature: [{
      value: "1",
      label: "机构"
    },
    {
      value: "2",
      label: "个人"
    }
  ],
  /**
   *	delete--客户来源 1：学君转介绍，2：网站，3：地推，4：微信群，5：其它
   *  new--来源分类 1：网络搜索，2：网络主推，3：地推，4：微信，5：转介绍，6：自荐，7：公司数据库，8：展会交流，9：其它；
   */
  customerSource: [{
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
   * 机构信用 1：正常，2：差
   */
  orgCredit: [{
      value: "1",
      label: "正常"
    },
    {
      value: "2",
      label: "差"
    }
  ],
  /**
   * 服务方式 1、电话服务，2、上门服务，3、来访接待，4、一对一咨询，5、开放日
   */
  serviceMode: [{
      value: 1,
      label: "电话服务"
    },
    {
      value: 2,
      label: "上门服务"
    },
    {
      value: 3,
      label: "来访接待"
    },
    {
      value: 4,
      label: "一对一咨询"
    },
    {
      value: 5,
      label: "开放日"
    }
  ],
  /**
   * ATC引用方式：1、单模块2、多模块3、子系统4、全系统
   */
  importType: [{
      value: 1,
      label: "单模块"
    },
    {
      value: 2,
      label: "多模块"
    },
    {
      value: 3,
      label: "子系统"
    },
    {
      value: 4,
      label: "全系统"
    }
  ],
  /**
   * ATC子系统模块 1、第一板块《学校营销管理系统建设》
   *               2、第二板块《学校教学管理系统建设》
   *               3、第三板块《学校组织管理系统建设》
   *               4、第四板块《学校战略管理系统建设》
   */
  atcChildSystemModel: [{
      value: "1",
      label: "第一板块《学校营销管理系统建设》"
    },
    {
      value: "2",
      label: "第二板块《学校教学管理系统建设》"
    },
    {
      value: "3",
      label: "第三板块《学校组织管理系统建设》"
    },
    {
      value: "4",
      label: "第四板块《学校战略管理系统建设》"
    }
  ],
  /**
   * 审核状态 1-审核中 2-审核通过 3-审核失败
   */
  lessonAuditStatus: [{
      value: 1,
      label: "审核中"
    },
    {
      value: 2,
      label: "审核通过"
    },
    {
      value: 3,
      label: "审核失败"
    },
    {
      value: 4,
      label: "撤销"
    }
  ],
  /**
   * 合同类型 BJBY-百家百亿 QJQW-千家千万 ATC-ATC DK- 单次课程
   */
  contractType: [{
      value: 'ATC',
      label: "ATC"
    },
    {
      value: 'BJBY',
      label: "百家百亿"
    },
    {
      value: 'QJQW',
      label: "千家千万"
    },
    {
      value: 'DK',
      label: "单次课程"
    }
  ],
  /**
   *   审批类型
   *   1-转课申请,2-开课申请 ,3-开票申请,4-合同申请,5-退款申请,6-合同回款审核，7-CRM书院合同审批，8-客服合同变更，9-咨询顾问合同变更
   *
   */
  approveType: [{
      value: 1,
      label: "转课申请"
    },
    {
      value: 2,
      label: "开课申请"
    },
    {
      value: 3,
      label: "开票申请"
    },
    {
      value: 4,
      label: "合同申请"
    },
    {
      value: 5,
      label: "退款申请"
    },
    {
      value: 6,
      label: "合同回款审核"
    },
    {
      value: 7,
      label: "CRM书院合同审批"
    },
    {
      value: 8,
      label: "CRM客服合同变更"
    },
    {
      value: 9,
      label: "CRM咨询顾问合同变更"
    }
  ],
  /**
   *  审批状态 1- 待审核  2- 通过  3- 拒绝
   */
  approveStatus: [{
      value: 1,
      label: "审核中"
    },
    {
      value: 2,
      label: "审核通过"
    },
    {
      value: 3,
      label: "审核拒绝"
    },
    {
      value: 4,
      label: "撤销"
    }
  ],
  /**
   *  系统参数 --- 权限类型：目录0,菜单1,按钮2
   */
  permissionType: [{
      value: 1,
      label: "目录"
    },
    {
      value: 2,
      label: "菜单"
    },
    {
      value: 3,
      label: "按钮"
    },
  ],
  /**
   * 下游客户筛选 企业名称
   **/
  customersName: [{
      value: "1",
      label: "企业名称"
    },
    {
      value: "2",
      label: "机构工商注册名"
    },
    {
      value: "3",
      label: "联系人"
    },
    {
      value: "4",
      label: "联系人电话"
    }
  ],
  /**
   *上游客户筛选 机构品牌
   **/
  customersNameTwo: [{
      value: 'UID',
      label: 'UID'
    },
    {
      value: "机构品牌",
      label: "机构品牌"
    },
    {
      value: "机构工商注册名",
      label: "机构工商注册名"
    },
    {
      value: "联系人",
      label: "联系人"
    },
    {
      value: "联系人电话",
      label: "联系人电话"
    }
  ],
  /**
   * 机构状态
   */
  organizationStatus: [{
      value: '1',
      label: '待下发'
    },
    {
      value: '2',
      label: '已下发'
    },
    {
      value: '3',
      label: '市场部死池'
    },
    {
      value: '4',
      label: '咨询部死池'
    }
  ],
  /**
   * 是否建立党组织
   */
  hasFoundParty: [{
      value: '1',
      label: '否'
    },
    {
      value: '2',
      label: '筹建中'
    },
    {
      value: '3',
      label: '是'
    }
  ],
  /**
   * 机构人员决策关系
   */
  policyRelation: [{
      value: '1',
      label: '关键决策'
    },
    {
      value: '2',
      label: '意见影响'
    },
    {
      value: '3',
      label: '普通'
    },
  ],
  /**
   * 证件类型
   */
  certificatesType: [{
      value: '1',
      label: '身份证'
    },
    {
      value: '2',
      label: '护照'
    },
    {
      value: '3',
      label: '港澳通行证'
    },
    {
      value: '4',
      label: '户口本'
    },
    {
      value: '5',
      label: '军官证'
    },
  ],
  /**
   * 企业性质
   */
  companyType: [{
      value: '1',
      label: '外资'
    },
    {
      value: '2',
      label: '合资'
    },
    {
      value: '3',
      label: '国企'
    },
    {
      value: '4',
      label: '民企'
    },
    {
      value: '5',
      label: '政府'
    },
    {
      value: '6',
      label: '事业单位'
    },
    {
      value: '7',
      label: '非营利组织'
    }
  ],
  /**
   * 客户年产值
   */
  annualOutput: [{
      value: '1',
      label: '0-100万'
    },
    {
      value: '2',
      label: '100-300万'
    },
    {
      value: '3',
      label: '300-500万'
    },
    {
      value: '4',
      label: '500-1000万'
    },
    {
      value: '5',
      label: '1千万-2千万'
    },
    {
      value: '6',
      label: '2千万-5千万'
    },
    {
      value: '7',
      label: '5千万以上'
    }
  ],
  /**
   * 授课范围
   */
  teachingRange: ['幼儿园', '小学', '初中', '高中', '大学', '成人教育', '国际高中课程（A-Level）', '兴趣班', '代托班'],
  /**
   * 授课方式
   */
  teachingType: ['个性化定制', '小班', '大班'],
  /**
   * 授课内容 -- 兴趣班
   */
  teachingInterest: ['兴趣英语', '美术', '书法', '素描', '色彩', '口才', '棋艺', '乐器', '编程/机器人'],
  /**
   * 授课内容 -- 学科班
   */
  teachingSubject: ['语文', '数学', '英语', '物理', '化学', '政治', '拼音', '历史', '生物', '地理'],
  /**
   * 合作紧密度
   * 1同修，2春风，3同路，4屏蔽客户
   **/
  cooperationIntensity: [{
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
  contractLevel: [{
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
   * 上游授课内容
   */
  upperTeachingRange: [{
      value: 1,
      label: "英语"
    }, {
      value: 2,
      label: "大语文"
    }, {
      value: 3,
      label: "数学"
    }, {
      value: 4,
      label: "中高考"
    }, {
      value: 5,
      label: "学科综合"
    },
    {
      value: 6,
      label: "美术"
    }, {
      value: 7,
      label: "练字书法"
    }, {
      value: 8,
      label: "口才"
    }, {
      value: 9,
      label: "艺术综合"
    }, {
      value: 10,
      label: "名师/双师"
    },
    {
      value: 11,
      label: "家庭教育"
    }, {
      value: 12,
      label: "Saas软件"
    }, {
      value: 13,
      label: "编程/机器人"
    }, {
      value: 14,
      label: "人工智能"
    }, {
      value: 15,
      label: "幼小衔接"
    },
    {
      value: 16,
      label: "教学教具"
    }, {
      value: 17,
      label: "题库测评"
    }, {
      value: 19,
      label: "图书绘本"
    }, {
      value: 20,
      label: "研留学移民"
    },
    {
      value: 21,
      label: "互联网教育"
    }, {
      value: 22,
      label: "教育科技"
    }, {
      value: 23,
      label: "早幼教"
    }, {
      value: 24,
      label: "国际教育"
    }, {
      value: 25,
      label: "职业教育"
    },
    {
      value: 26,
      label: "K12TOC"
    }, {
      value: 27,
      label: "K12TOG"
    }, {
      value: 28,
      label: "国外产品"
    }, {
      value: 29,
      label: "加盟连锁"
    }, {
      value: 30,
      label: "培训"
    },
    {
      value: 31,
      label: "3D打印"
    }, {
      value: 32,
      label: "录播直播"
    }, {
      value: 33,
      label: "渠道/展会"
    }, {
      value: 34,
      label: "金融投资"
    }, {
      value: 35,
      label: "新闻媒体"
    },
    {
      value: 36,
      label: "政府机构"
    }, {
      value: 37,
      label: "大学"
    }, {
      value: 38,
      label: "其他"
    }
  ],  
  /**
   * 商务中心标签
   *
   **/
  businessCenter: [{
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
   * 备忘录对象
   */
  memorandumObject: [{
      value: '1',
      label: '机构'
    },
    {
      value: '2',
      label: '联系人'
    }
  ],
  /**
   * 备忘录跟进方式
   */
  memorandumMode: [{
      value: '1',
      label: '电话'
    },
    {
      value: '2',
      label: '微信'
    },
    {
      value: '3',
      label: '上门拜访'
    },
    {
      value: '4',
      label: '公司参访'
    },
    {
      value: '5',
      label: '学君校参访'
    },
    {
      value: '6',
      label: '邮件'
    },
    {
      value: '7',
      label: '会议'
    },
    {
      value: '99',
      label: '其他'
    }
  ],
  /**
   * 备忘录跟进形式
   */
  memorandumType: [{
      value: '1',
      label: '客户关怀'
    },
    {
      value: '2',
      label: '课件发送'
    },
    {
      value: '3',
      label: '课程邀约'
    },
    {
      value: '4',
      label: '客诉处理'
    },
    {
      value: '5',
      label: '常规咨询'
    },
    {
      value: '6',
      label: '业务开发'
    },
    {
      value: '7',
      label: '业务跟进'
    },
    {
      value: '8',
      label: '团队培训'
    },
    {
      value: '9',
      label: '常规服务'
    },
    {
      value: '10',
      label: '落地辅导'
    },
    {
      value: '11',
      label: '其他'
    }
  ],
  /**
   * 商品中心客户等级
   **/
  shopCustomerLevel: [{
      value: '新客户',
      label: '新客户'
    },
    {
      value: 'A',
      label: 'A'
    },
    {
      value: 'B',
      label: 'B'
    },
    {
      value: 'C',
      label: 'C'
    },
    {
      value: 'D',
      label: 'D'
    },
    {
      value: 'E',
      label: 'E'
    },
    {
      value: 'F',
      label: 'F'
    }
  ],
  /**
   * 业绩计算的金额标准
   */
  performanceFormStandard: [{
      value: '1',
      label: '定额',
    },
    {
      value: '2',
      label: '签约额度',
    },
    {
      value: '3',
      label: '成本'
    },
  ],
  /**
   * 婚姻状况
   */
  maritalStatus: [{
      value: '1',
      label: '未婚'
    },
    {
      value: '2',
      label: '已婚已育'
    },
    {
      value: '3',
      label: '已婚未育'
    },
    {
      value: '4',
      label: '离异'
    },
    {
      value: '5',
      label: '丧偶'
    }
  ],
  /**
   * 学历
   */
  educationBackground: [{
      value: '1',
      label: '博士后'
    },
    {
      value: '2',
      label: '博士'
    },
    {
      value: '3',
      label: '硕士'
    },
    {
      value: '4',
      label: '本科'
    },
    {
      value: '5',
      label: '大专'
    },
    {
      value: '6',
      label: '高中'
    },
    {
      value: '7',
      label: '中专'
    },
    {
      value: '8',
      label: '初中'
    },
    {
      value: '9',
      label: '小学'
    }
  ],
  /**
   * 装修情况
   */
  decorateSituation: [{
      value: 1,
      label: '高端',
    },
    {
      value: 2,
      label: '中高端',
    },
    {
      value: 3,
      label: '一般',
    }
  ],
  /**
   * sku-营收方式
   */
  shopCenterRevenueWay: [{
      value: "1",
      label: '收货型',
    },
    {
      value: '2',
      label: '复合型',
    },
    {
      value: '3',
      label: '消课型',
    },
    {
      value: '4',
      label: '流水型',
    },
    {
      value: '5',
      label: '部署型',
    }
  ],
  /**
   * 积分增加项
   */
  integralIncrease: [{
      value: '1',
      label: '作为标杆及重要的客户见证'
    },
    {
      value: '2',
      label: '在君学活动中担任重要角色'
    },
    {
      value: '3',
      label: '协助商务推进'
    },
    {
      value: '4',
      label: '转介绍认识'
    },
    {
      value: '5',
      label: '率先支持君学新业务'
    },
    {
      value: '6',
      label: '特殊历史贡献学君'
    },
    {
      value: '7',
      label: '参与投资君学'
    },
    {
      value: '19',
      label: '其他'
    }
  ],
  /**
   * 积分减少项
   */
  integralReduce: [{
      value: '8',
      label: '损害君学集团声誉'
    },
    {
      value: '9',
      label: '影响君学集团业务'
    },
    {
      value: '10',
      label: '影响课程交付质量'
    },
    {
      value: '19',
      label: '其他'
    }
  ],
  /**
   * 积分形式
   * 积分来源2-客观流水积分 3-客观营收积分 1-主观积分
   * */
  scoreSource: [{
      value: '2',
      label: '客观流水积分'
    },
    {
      value: '3',
      label: '客观营收积分'
    },
    {
      value: '1',
      label: '主观积分'
    }
  ],
  /**
   * 阶段内容：1-发现需求；2-确认需求；3-解决方案；4-商务谈判；5-招标；6-赢单；7-输单；8-延期
   * */
  stageContent: [{
      value: 1,
      label: '发现需求'
    },
    {
      value: 2,
      label: '确认需求'
    },
    {
      value: 3,
      label: '解决方案'
    },
    {
      value: 4,
      label: '商务谈判'
    },
    {
      value: 5,
      label: '招标'
    },
    {
      value: 6,
      label: '赢单'
    },
    {
      value: 7,
      label: '输单'
    },
    {
      value: 8,
      label: '延期'
    },

  ],
  /**
   * 增加协同人列表 -> 客户筛选项
   */
  synergyCustomersName: [{
      value: "1",
      label: "UID"
    },
    {
      value: "2",
      label: "企业名称"
    },
    {
      value: "3",
      label: "品牌名称"
    },
    {
      value: "4",
      label: "机构工商注册名"
    },
    {
      value: "5",
      label: "联系人"
    },
    {
      value: "6",
      label: "联系人电话"
    },
  ],
  // 机构状态  1-待下发 2-跟进中 3-待踢单 4-退还待下发 5-移交客服 6-市场部死池 7-咨询部死池
  orgStatus: [{
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
  ]
}