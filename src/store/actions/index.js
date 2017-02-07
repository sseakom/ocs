import fly from '../../assets/js/fly.js'
// import Vue from 'vue'
//
// //数据请求模块
// export const dataRequest = ({ commit }, data) => {
//     return new Promise((resolve, reject) => {
//         Vue.http.post(data.url, data.data, {
//             emulateJSON: true,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
//             }
//         }).then(response => {
//             if (response) {
//                 resolve(response)
//             } else {
//                 console.warn('数据返回为空')
//             }
//         }, response => {
//             console.warn('接口请求失败:' + response)
//             reject(response)
//         })
//     })
// }

//土司
export const toast = ({ commit }, data) =>{
    console.info(data)
    fly.request({action: 'BaseComponents.error', args: [data]})
}

//获取初始信息
export const getInitData = ({commit}) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_init',
            args: ['one_card_init']
        }).done(response => {
            console.log('getInitData---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('初始信息返回为空')
            }
        }).fail(response =>{
            reject(response)
            console.warn('初始信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['数据请求失败']
            })
        })
    })
}


//3.6.1.3获取所有字典信息
export const getDict = ({ commit }) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_dict',
            args: ['one_card_dict']
        }).done(response => {
            console.log('getDict---' + JSON.stringify(response))
            if (response) {
                resolve(response)
                commit('SET_DICT', response)
            } else {
                console.warn('字典返回为空')
            }
        }).fail(response =>{
            reject(response)
            console.warn('字典数据请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['字典请求失败']
            })
        })
    })
}


//3.6.1.2获取户籍基本信息
export const getRegistry = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_registry',
            args: ['one_card_registry', data]
        }).done(response => {
            console.log('getRegistry---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('户籍信息返回为空')
            }
        }).fail(response =>{
            reject(response)
            console.warn('户籍信息请求失败')
            fly.request({
                action: 'BaseComponents.error',
                args: ['户籍信息请求失败']
            })
        })
    })
}

//3.6.1.1获取婚姻信息接口
export const getMarriage = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_marriage',
            args: ['one_card_marriage', data.name, data.id]
        }).done(response => {
            console.log('getMarriage---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('婚姻信息返回为空')
            }
        }).fail(response =>{
            console.warn('婚姻信息请求失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['婚姻信息请求失败']
            })
        })
    })
}

//3.6.1.4根据上级行政区划id获取下级行政区划id
export const getArea = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_area',
            args: ['one_card_area', data]
        }).done(response => {
            console.log('getArea---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('行政区划返回为空')
            }
        }).fail(response =>{
            console.warn('行政区划请求失败')
            reject(response)
        })
    })
}
//3.6.1.5根据身份证号码获取省平台地址信息
export const getAddress = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_address',
            args: ['one_card_address', data]
        }).done(response => {
            console.log('getAddress---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('地址信息返回为空')
            }
        }).fail(response =>{
            console.warn('地址信息返回为空')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['地址信息请求失败']
            })
        })
    })
}
//根据身份证号获取公司信息
export const getCompany = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_company',
            args: ['one_card_company', data]
        }).done(response => {
            console.log('getCompany---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('公司信息返回为空')
            }
        }).fail(response =>{
            console.warn('公司信息请求失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['公司信息请求失败']
            })
        })
    })
}

export const getCertificationsite = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_certificationsite',
            args: ['one_card_certificationsite', data]
        }).done(response => {
            console.log('getCertificationsite---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('证件信息返回为空')
            }
        }).fail(response =>{
            console.warn('证件信息请求失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['证件信息请求失败']
            })
        })
    })
}

//获取材料列表
export const getMaterial = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_material',
            args: ['one_card_material', data]
        }).done(response => {
            console.log('getMaterial---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('材料列表返回为空')
            }
        }).fail(response =>{
            console.warn('材料列表请求失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['材料列表请求失败']
            })
        })
    })
}
//上传材料
export const uploadMaterial = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.appClick',
            callback: data.type,
            args: [data.type, data.data]
        }).done(response => {
            console.log('uploadMaterial---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('信息返回为空')
            }
        }).fail(response =>{
            console.warn('上传材料失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['上传材料失败']
            })
        })
    })
}
//上传证件照材料
export const uploadIdMaterial = ({ commit }, data) => {
    console.log('uploadIdMaterial--in--' + JSON.stringify(data))
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.appClick',
            callback: 'one_card_id',
            args: ['one_card_id', data]
        }).done(response => {
            console.log('uploadIdMaterial--out--' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('上传证件照返回为空')
            }
        }).fail(response =>{
            console.warn('上传证件照失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['上传证件照失败']
            })
        })
    })
}
//上传所有
export const uploadAll = ({ commit }, data) => {
    console.log('uploadAll--in--' + JSON.stringify(data))
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.appClick',
            callback: 'one_card_clpop',
            args: ['one_card_clpop', data]
        }).done((response,flag) => {
            console.log('uploadAll--out--' + JSON.stringify(response)+':'+flag)
            if (response) {
                resolve({response,flag})
            } else {
                console.warn('上传证件照返回为空')
            }
        }).fail(response =>{
            console.warn('上传证件照失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['上传证件照失败']
            })
        })
    })
}

//删除材料
export const deleteMaterial = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.appClick',
            callback: 'one_card_delete',
            args: ['one_card_delete', data]
        }).done(response => {
            console.log('deleteMaterial---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('删除材料返回为空')
            }
        }).fail(response =>{
            console.warn('删除材料失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['删除材料失败']
            })
        })
    })
}

//3.6.1.11根据上级行政区划code获取下级行政区划(一站通)
export const getChildArea = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.data',
            callback: 'one_card_childArea',
            args: ['one_card_childArea', data]
        }).done(response => {
            console.log('getChildArea---' + JSON.stringify(response))
            if (response) {
                resolve(response)
            } else {
                console.warn('行政区划返回为空')
            }
        }).fail(response =>{
            console.warn('行政区划失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['行政区划请求失败']
            })
        })
    })
}

//提交
export const submitApply = ({ commit }, data) => {
    return new Promise((resolve, reject) => {
        fly.request({
            action: 'oneCardComponents.appClick',
            callback: 'one_card_submitApply',
            args: ['one_card_submitApply', data]
        }).done((response,msg) => {
            console.log('submitApply---' + JSON.stringify(response))
            if(response=='1'){
                window.location.href = "http://news.citytoken.cn/worktest/html/work_completed.html?casno=" + msg
            }else if(response=='0'){
                fly.request({action: 'BaseComponents.error', args: [msg]})
            } else {
                console.warn('提交信息返回为空')
            }
        }).fail(response =>{
            console.warn('提交信息失败')
            reject(response)
            fly.request({
                action: 'BaseComponents.error',
                args: ['提交信息失败']
            })
        })
    })
}
