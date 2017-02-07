import * as types from '../constants'

export default {
    [types.SET_DICT](state, data) {
        if(data){
            if(data.MZ){
                state.nation = data.MZ
            }
            if(data.WHCD){
                state.culture = data.WHCD
            }
            if(data.ZJLX){
                state.certificate = data.ZJLX
            }
            if(data.HYZK){
                state.marriage = data.HYZK
            }
            if(data.HYQK){
                state.pregnant = data.HYQK
            }
        }
    },
    [types.SET_INIT](state, data) {
        if(data.data){
            state.form.sqr = data.data.name
            state.form.sqrsfz = data.data.icard
            state.form.sqrsjh = data.data.phoneNum
            state.form.userid = data.data.userId
            state.form.id = data.data.workSubmitId

            if (data.gender) {
                state.form.mxm = data.data.name
                state.form.mzjhm = data.data.icard
                state.form.mlxdh = data.data.phoneNum
            } else {
                state.form.fxm = data.data.name
                state.form.fzjhm = data.data.icard
                state.form.flxdh = data.data.phoneNum
            }
            //设置收件信息
            state.form.applylinkname = data.data.name
            state.form.applylinktel = data.data.phoneNum
        }
    },
    [types.SET_MATERIAL](state, data) {
        state.material = data
    },
    [types.SET_ADDRESS](state, data) {
        if(data.data){
            if (data.gender) {
                state.form.mhjxz = data.data.hjd
                state.form.mhjsheng = data.data.h_province
                state.form.mhjshi = data.data.h_city
                state.form.mhjqx = data.data.h_district
                state.form.mhjjd = data.data.h_street
                state.form.mhjsq = data.data.h_group
                state.form.mhjzrc = data.data.h_village

                state.form.mjzxz = data.data.xjd
                state.form.mjzsheng = data.data.x_province
                state.form.mjzshi = data.data.x_city
                state.form.mjzqx = data.data.x_district
                state.form.mjzjd = data.data.x_street
                state.form.mjzsq = data.data.x_group
                state.form.mjzzrc = data.data.x_village
            } else {
                state.form.fhjxz = data.data.hjd
                state.form.fhjsheng = data.data.h_province
                state.form.fhjshi = data.data.h_city
                state.form.fhjqx = data.data.h_district
                state.form.fhjjd = data.data.h_street
                state.form.fhjsq = data.data.h_group
                state.form.fhjzrc = data.data.h_village

                state.form.fjzxz = data.data.xjd
                state.form.fjzsheng = data.data.x_province
                state.form.fjzshi = data.data.x_city
                state.form.fjzqx = data.data.x_district
                state.form.fjzjd = data.data.x_street
                state.form.fjzsq = data.data.x_group
                state.form.fjzzrc = data.data.x_village
            }
            //设置收件信息
            state.form.applyaddr = data.data.xjd
        }
    },
    [types.SET_REGISTRY](state, data) {
        if(data.data){
            if (data.gender) {
                if(data.data.MZDM){
                    state.form.mmz = data.data.MZDM
                }
                if(data.data.NAME){
                    state.form.mxm = data.data.NAME
                }
                if(data.data.SFHM){
                    state.form.mzjhm = data.data.SFHM
                }
            } else {
                if(data.data.MZDM){
                    state.form.fmz = data.data.MZDM
                }
                if(data.data.NAME){
                    state.form.fxm = data.data.NAME
                }
                if(data.data.SFHM){
                    state.form.fzjhm = data.data.SFHM
                }
            }
        }
    },
    [types.SET_COMPANY](state, data) {
        if (data.data) {
            if (data.gender) {
                state.form.mgzdw = data.data //男工作单位
            } else {
                state.form.fgzdw = data.data //女工作单位
            }
        }
    },
    [types.SET_MARRIAGE](state, data) {
        if(data){
            state.form.fjhzbh = data.jhzbh //结婚证编号
            if(data.djsj){
                state.form.fjhrq = data.djsj.substring(0,10) //登记日期
            }
            state.form.ffzjg = data.djdd //婚姻登记
        }
    }
}
