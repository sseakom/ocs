import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import mutations from './mutations'
import * as getters from './getters'

Vue.use(Vuex)

const state = {
    platform: (navigator.userAgent.indexOf('iPhone') != -1 || navigator.userAgent.indexOf('iPad') != -1)
    ? true
    : false, //设备识别 IOS true 其它 false
    test: false, //测试环境
    otherId: '', //对方身份证号码
    gender: true, //性别 男true 女 false
    nation: [], // 名族列表
    culture: [], //文化程度列表
    certificate: [], //证件类型列表
    marriage: [], //婚姻列表
    pregnant: [], //怀孕列表
    material: [], //材料列表
    street: [],
    community: [],
    district: [],
    addr: {
        sheng: '',
        shi: '',
        qx: '',
        jd: '',
        sq: '',
        zrc: '',
        xz: '',
        mp: ''
    },
    addrCode: {
        sheng: '',
        shi: '',
        qx: '',
        jd: '',
        sq: '',
        zrc: '',
        xz: '',
        mp: ''
    },
    pickupAddr: '', //取件地址
    pickupTel: '', //取件电话
    form: {
        sqr: '', //申请人·
        sqrsfz: '', //申请人身份证·
        sqrsjh: '', //申请人手机号·
        fzjlx: '', //女方证件类型
        fzjhm: '', //女方证件号码
        flxdh: '', //女方联系电话
        fxm: '', //女方姓名·
        fmz: '', //女方民族·
        fmwhcd: '', //女方文化程度
        fzjbld: '', //女方证件办理地
        fhyqk: '', //女方怀孕情况  (1:在孕 fhysj为怀孕时间  2:已生育 fhysj为出生时间  3:其他 fhysj为审批时间)
        fhysj: '', //女方怀孕时间/出生时间/审批时间
        fgzdw: '', //女方工作单位·
        fhjsheng: '', //女方户籍省·
        fhjshi: '', //女方户籍市·
        fhjqx: '', //女方户籍区县·
        fhjjd: '', //女方户籍街道·
        fhjsq: '', //女方户籍社区·
        fhjzrc: '', //女方户籍自然村·
        fhjxz: '', //女方户籍地详址·
        fhjmp: '', //女方户籍地门牌
        fhdwdm: '', //女方户籍单位代码
        fjzsheng: '', //女方居住省·
        fjzshi: '', //女方居住市·
        fjzqx: '', //女方居住区县·
        fjzjd: '', //女方居住街道·
        fjzsq: '', //女方居住社区·
        fjzzrc: '', //女方居住自然村·
        fjzxz: '', //女方居住地详址·
        fjzmp: '', //女方居住地门牌
        fhyzk: '', //女方婚姻状况
        fjdwdm: '', //女方居住单位代码
        fsynan: '0', //女方生育男孩数·
        fsynv: '0', //女方生育女孩数·
        fjhzbh: '', //女方结婚证编号·
        fjhrq: '', //女方结婚日期·
        fbz: '', //女方备注
        ffzjg: '', //女方发证机关·
        znfglrs: '', //女方非国内人士
        mzjlx: '', //男方证件类型
        mzjhm: '', //男方证件号码
        mlxdh: '', //男方联系电话
        mxm: '', //男方姓名·
        mmz: '', //男方民族·
        mwhcd: '', //男方文化程度·
        mgzdw: '', //男方工作单位·
        mhjsheng: '', //男方户籍省·
        mhjshi: '', //男方户籍市·
        mhjqx: '', //男方户籍区县·
        mhjjd: '', //男方户籍街道·
        mhjsq: '', //男方户籍社区·
        mhjzrc: '', //男方户籍自然村·
        mhjxz: '', //男方户籍地详址·
        mhjmp: '', //男方户籍地门牌
        mhdwdm: '', //男方户籍单位代码
        mjzsheng: '', //男方居住省·
        mjzshi: '', //男方居住市·
        mjzqx: '', //男方居住区县·
        mjzjd: '', //男方居住街道·
        mjzsq: '', //男方居住社区·
        mjzzrc: '', //男方居住自然村·
        mjzxz: '', //男方居住地详址·
        mjzmp: '', //男方居住地门牌
        mjdwdm: '', //男方居住单位代码
        mhyzk: '', //男方婚姻状况·
        msynan: '0', //男方生育男孩数·
        msynv: '0', //男方生育女孩数·
        mqfgnrs: '', //男方非国内人士
        tsrq: '', //是否是特殊人群
        ddlhc: '', //当前申请孩次，互联网端仅使用1或2·
        yecsrq: '', //当前出生时间·
        yexb: '', //上一子女性别 （1男 2 女）·
        number: '', //一卡通编号，形如WJN13402080071024。在审批过程中生成。
        zclx: '', //政策类型（0政策内，1政策外），互联网端建议传0
        fcssj: '', //女方出生时间
        fhjszd: '', //女方户籍所在地·
        fxjzddz: '', //女方现居住地地址·
        mhjszd: '', //男方户籍所在地·
        mxjzddz: '', //男方现居住地地址·
        id: '', //UUID编码·
        oid: '2c9a84815654645b01567360647b00be', //办事项id·     2c90871a549e59120154a3ad40ca0001
        emsflag: '', //取件方式· 0 自取 1 EMS
        servicename: '', //办事项名称
        serviceno: '', //办事项编号
        servicecode: '', //办事项代码
        applydate: '', //申请日期格式“MM/dd/YYYY/ HH:mm:ss
        applylinkname: '', //收件人姓名·
        applylinktel: '', //联系电话·
        applyaddr: '', //收件地址·
        userid: '', //用户id·
        districtcode: '', //受理区县·
        streetcode: '', //受理乡镇街道·
        communitycode: '', //受理村社区·
    },
    precedenceMaterial:[],
    precedenceStreet: '',
    precedenceCommunity: '',
    precedenceDistrict: '',
    precedence: {
        name: '', //姓名·
        xb: '', //性别(0--男，1-女)
        birthday: '', //出生年月
        cardID: '', //身份证证号·
        address: '', //现居住地家庭住址（对应applyaddr）
        tel: '', //联系电话·
        zjbh: '', //证件编号 ?
        fzrq: '', //发证日期 ?
        type: '', //发证类型(1为绿本 2为红本)
        typeName: '',
        hjaddress: '', //户籍所在地
        dbr: '', //代办人(0-未代办，1-代办)
        dbridCard: '', //代办人证件号码
        dbrName: '', //代办人名称
        id: '', //UUID编码
        oid: '2c9a848157a8655d0157d1db74780305', //办事项id
        servicename: '', //办事项名称 ?
        serviceno: '', //办事项编号 ?
        servicecode: '', //办事项代码  ?
        applydate: '', //申请日期格式“MM/dd/YYYY/ HH:mm:ss ?
        applylinkname: '', //收件人姓名
        applylinktel: '', //联系电话
        applyaddr: '', //收件地址
        applycardtype: '', //证件种类  ?
        caseno: '', //业务编码 ?
        addrflag: '', //提交平台1提交到权利运行平台0一站通 ?
        emsflag: '', //取件方式   0 自取 1 EMS
        userid: '', //用户id
        streetcode: '', //受理乡镇街道
        communitycode: '', //受理村社区
        updatetime: '', //更新时间格式“MM/dd/YYYY/ HH:mm:ss   ?
        isedit: '', //是否修改(0:新增  1：修改) ?
        applysource: '', //申请来源 1易户网2易企网 3城市令 ?
        districtcode: '', //受理区县
        phjsheng: '', //女方户籍省·
        phjshi: '', //女方户籍市·
        phjqx: '', //女方户籍区县·
        phjjd: '', //女方户籍街道·
        phjsq: '', //女方户籍社区·
        phjzrc: '', //女方户籍自然村·
        phjxz: '', //女方户籍地详址·
        phjmp: '', //女方户籍地门牌
        pjzsheng: '', //女方户籍省·
        pjzshi: '', //女方户籍市·
        pjzqx: '', //女方户籍区县·
        pjzjd: '', //女方户籍街道·
        pjzsq: '', //女方户籍社区·
        pjzzrc: '', //女方户籍自然村·
        pjzxz: '', //女方户籍地详址·
        pjzmp: '', //女方户籍地门牌
    }
}

export default new Vuex.Store({state, mutations, actions, getters})
