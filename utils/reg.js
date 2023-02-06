const RegexConfig = {
    /**
     * 手机号码
     */
    mobile: /^1([3-9])\d{9}$/,
    /**
     * 手机号/座机
     * */
    telephone:/^((0\d{3}-?\d{7})|(\d{3}-?\d{8})|(1[3-9]\d{9}))$/,
    /**
     * 身份证
     */
    idcard: /^[1-9]\d{5}(19|20|(\d))\d{2}((0[2])(([0-2][1-9])|10|20)|((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31))\d{3}[0-9Xx]$/,
	/**
	 * 护照号码
	 */
	passportcard:/^(E\d|SE|DE|PE)\d{7}$/,
    /**
     * 邮箱
     */
    email: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)+[a-zA-Z0-9]{2,}$/,
    /**
     * QQ
     */
    qq: /^[1-9]\d{4,}$/,
    /**
     * 微信
     */
    weixin: /^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/,
	/**
	 * wechat
	 */
	wechat: /^(1[3-9]\d{9}|[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19})$/,
    /**
     * 金额
     */
    money: /^[0-9]+\.?[0-9]{0,2}$/,
    /**
     * 整数
     */
    integer: /^0|([1-9][0-9]*)$/,
    /**
     * 小数点两位数字
     */
    regMoney:/^[+]?(\d+)(?:.\d{0,2})?$/,
    /***
     * 正整数
     * */
    positiveInteger:/^[+]?(\d+)$/,
    /**
     * 邮编
     * */
    isPostCode: /^[\d-]*$/i,
    /**
     * 数字和字母
     * */
    isNumberEnglish:/^[A-Za-z0-9]+$/ig,
	/**
	 * 银行卡
	 */
	bankCard:/^[01345689]\d{15,19}$/,
    /**
     * 军官证
     * */
    officersCertificate :/^[南北沈兰成济广海空参政后装]字第(\d{8})号$/,
	/**
     * 港澳通行证
     * */
    macaoHongKong:/^[HMhm]{1}([0-9]{10}|[0-9]{8})$/,
	/**
	 * 图片
	 */
	isPicture:/\.(png|jpg|png|gif|bmp|webp|tif|exif|svg|pcx|tiff|tga|fpx)/i,
	/**
	 * 文档查看
	 */
	isOfficFile:/\.(do(c[mx]?|tm|tx)|xls[mxsb]?|pp([ts][x]?|[ast]m))/i,
	/**
	 * 视频音频
	 */
	isMedia:/\.m(p4|p3|4a)/i
}

module.exports = {
  RegexConfig:RegexConfig
}