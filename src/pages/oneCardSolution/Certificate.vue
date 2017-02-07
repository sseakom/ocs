<template lang="jade">
	div
		my-title(title="办件申请信息")
		vue-select(selected="districtcode", :list="district", label="办件县区", root="form")
		vue-select(selected="streetcode", :list="street", label="办件乡镇/街道", root="form")
		.tips *确保办件地点和夫妻其中一方的现居住地或户籍地址保持一致
		vue-select(selected="communitycode", :list="community", label="受理社区/村", root="form")
		vue-select(selected="emsflag", :list="list", label="证件领取方式", root="form")
		div(v-show="emsflag=='1'")
			vue-field(label="收件人", value="applylinkname", placeholder="请填写收件人", type="text", vType="name", root="form")
			vue-field(label="收件地址", value="applyaddr", placeholder="请填写收件地址", type="text", root="form")
			vue-field(label="联系电话", value="applylinktel", placeholder="请填写联系电话", type="text", vType="mobile", root="form")
		div(v-show="emsflag=='0'")
			p.address 取件地址：{{pickupAddr}}
			p.address 取件电话：{{pickupTel}}
		my-title(title="提交材料")
		div.material-list
			div.material-item(v-for="(item, index)  in material")
				em(@click="toggle(index)",:class="{'open':item.isShow == '1'}")
				p.p(@click="uploadAll(item.appAttName,item.appAttId,item.id,item.zzKey,index,item.hasDzzz)") {{item.appAttName}}
				span.span.file(@click="upload('one_card_file',item.appAttName,item.appAttId,item.id,item.zzKey,index)")
				span.span.photo(@click="upload('one_card_photo',item.appAttName,item.appAttId,item.id,item.zzKey,index)")
				span.span.id(v-if="item.hasDzzz != '0'",@click="uploadId(item.appAttName,item.appAttId,item.id,item.zzKey,index)",:class="{'gray': (item.hasDzzz == '2') && (isMe(item.id) == 1)}")
				.clear
				div.file-list(v-show="item.isShow == '1'")
					div.file-item(v-for="(file, inIndex) in item.fileList")
						p.filep {{file.contentName}}
							span.filespan(@click="deleteMaterial(file.uuid,'',index,inIndex)") 删除
					.clear
				div.file-list(v-show="item.isShow == '1'")
					div.file-item.id(v-for="(file, inIndex) in item.zzKeyFiles")
						p.filep {{file.contentName}}
							span.filespan(@click="deleteMaterial(file.uuid,item.zzKey,index,inIndex)") 删除
					.clear
		my-title(title="婚育情况诚信承诺书")
		p.address
			| 我已详细填写本人婚育情况，清楚并理解办理《健康家庭一卡通》的法定条件和依据，在此我郑重承诺：
			br
			| 一、真实、准确地提供本人个人信息、证明资料、证件等相关材料；
			br
			| 二、认真履行计划生育各项法定义务；
			br
			| 三、对违反以上承诺所造成的后果，本人已充分理解，失信行为将纳入个人征信记录，并自愿承担相应法律责任。
		mt-checklist(v-model="agree", :options="['本人自愿签署上方婚育状况诚信承诺书']")
		my-button(label="提交",data="",:action="validate")
</template>
<script type="text/babel">
import button from '../../components/btn.vue'
import select from '../../components/areaSelect.vue'
import title from '../../components/title.vue'
import field from '../../components/field.vue'
import styzy from '../../assets/js/tool-validate.common.styzy.js'
import {
	Checklist
} from 'mint-ui'
export default {
	name: 'Certificate',
	components: {
		'my-button': button,
		'my-title': title,
		'vue-select': select,
		'vue-field': field,
		'mt-checklist': Checklist
	},
	data() {
		return {
			agree: false,
			list: [{
				area_code: '0',
				area_name: '窗口自取'
			}, {
				area_code: '1',
				area_name: 'EMS邮寄'
			}],
			submitDelay: true
		}
	},
	computed: {
		material() {
			return this.$store.state.material
		},
		gender() {
			return this.$store.state.gender
		},
		streetcode() {
			return this.$store.state.form.streetcode
		},
		communitycode() {
			return this.$store.state.form.communitycode
		},
		districtcode() {
			return this.$store.state.form.districtcode
		},
		street() {
			return this.$store.state.street
		},
		community() {
			return this.$store.state.community
		},
		district() {
			return this.$store.state.district
		},
		emsflag() {
			return this.$store.state.form.emsflag
		},
		pickupAddr() {
			return this.$store.state.pickupAddr ? this.$store.state.pickupAddr : '暂无'
		},
		pickupTel() {
			return this.$store.state.pickupTel ? this.$store.state.pickupTel : '暂无'
		}
	},
	watch: {
		districtcode(code) {
			if (code) {
				this.updateCode(code, 'street')
				this.$store.state.form.streetcode = ''
				this.$store.state.form.communitycode = ''
				this.$store.state.pickupAddr = ''
				this.$store.state.pickupTel = ''
			}
		},
		streetcode(code) {
			if (code) {
				this.updateCode(code, 'community')
				this.$store.state.form.communitycode = ''
				this.$store.state.pickupAddr = ''
				this.$store.state.pickupTel = ''
			}
		},
		communitycode(code) {
			this.$store.state.pickupAddr = ''
			this.$store.state.pickupTel = ''
			this.$store.dispatch('getCertificationsite', code).then(response => {
				this.$store.state.pickupAddr = response.BZDZ
				this.$store.state.pickupTel = response.TELE_GOV
			})
		}
	},
	methods: {
		valMaterial() {
			let enable = true
			let info = []
			for (let i in this.$store.state.material) {
				if (this.$store.state.material[i].fileList.length) {} else {
					if (this.$store.state.material[i].zzKeyFiles.length) {} else {
						enable = false
						info.push(this.$store.state.material[i].appAttName)
					}
				}
			}
			if (enable) {
				this.submitApply()
			} else {
				this.$store.dispatch('toast', '请上传' + info[0] + '材料')
			}
		},
		validate() {
			let self = this
			if (self.$store.state.form.districtcode) { //请选择办件街道
				if (self.$store.state.form.streetcode) { //请选择办件社区
					if (self.$store.state.form.communitycode) { //请选择办件社区
						if (self.$store.state.form.emsflag) { //领取方式
							console.log(self.$store.state.form.emsflag)
							if (self.$store.state.form.emsflag == '0') { //自取
								console.log('自取')
								self.valMaterial()
							} else if (self.$store.state.form.emsflag == '1') { //EMS
								console.log('EMS')
								styzy.validate({
									flagName: 'validate',
									typeName: 'v-type',
									labelName: 'label',
									success() {
										self.valMaterial()
									},
									error(msg) {
										self.$store.dispatch('toast', msg)
									}
								})
							}
						} else {
							self.$store.dispatch('toast', '请选择领取方式')
						}
					} else {
						self.$store.dispatch('toast', '请选择办件社区')
					}
				} else {
					self.$store.dispatch('toast', '请选择办件街道')
				}
			} else {
				self.$store.dispatch('toast', '请选择办件县区')
			}
		},
		toggle(index) {
			if (this.$store.state.material[index].isShow == '1') {
				this.$store.state.material[index].isShow = '0'
			} else {
				this.$store.state.material[index].isShow = '1'
			}
		},
		submitApply() {
			// console.log(JSON.stringify(this.$store.state.form))
			if (this.agree) {
				if(this.submitDelay){
					this.submitDelay = false
					this.$store.dispatch('submitApply', this.$store.state.form)
					setTimeout(()=>{
						this.submitDelay = true
					},2000)
				}
			} else {
				this.$store.dispatch('toast', '您未同意诚信承诺书')
			}
		},
		isMe(id) {
			if (id == '2c9a8481567c470f0156bbc2dc5d0119' || id == '2c9a8481567c470f0156bbc2dc6c011b' || id == '2c9a8481567c470f01569c92f7a700ed' || id == '2c9a8481567c470f01569c92f7b600ef' || id == '2c9a84815557a5c10155a022235f016b' || id ==
				'2c9a84815557a5c10155a022235f016d') {
				if (this.gender) {
					return 0
				} else {
					return 1
				}
			} else if (id == '2c9a8481567c470f0156bbc2dc5d011a' || id == '2c9a8481567c470f0156bbc2dc6c011c' || id == '2c9a8481567c470f01569c92f7b600ee' || id == '2c9a8481567c470f01569c92f7b600f0' || id == '2c9a84815557a5c10155a022235f016a' || id ==
				'2c9a84815557a5c10155a022235f016c') {
				if (this.gender) {
					return 1
				} else {
					return 0
				}
			} else if (id == '2c9a8481567c470f0156bbc2dc6c011d' || id == '2c9a8481567c470f01569c92f7b600f1') {
				return 1
			}
		},
		checkShow(index) {
			if (this.$store.state.material[index].fileList.length || this.$store.state.material[index].zzKeyFiles.length) {
				this.$store.state.material[index].isShow = '1'
			} else {
				this.$store.state.material[index].isShow = '0'
			}
		},
		upload(type, appAttName, appAttId, id, zzKey, index) {
			let isMe = this.isMe(id)
			this.$store.dispatch('uploadMaterial', {
				type,
				data: {
					appAttName,
					appAttId,
					id,
					zzKey,
					isMe
				}
			}).then(response => {
				this.$store.state.material[index].fileList.push(response)
				this.checkShow(index)
			})
		},
		uploadId(appAttName, appAttId, id, zzKey, index) {
			let isMe = this.isMe(id)
			this.$store.dispatch('uploadIdMaterial', {
				appAttName,
				appAttId,
				id,
				zzKey,
				isMe,
				list: this.$store.state.material[index].zzKeyFiles
			}).then(response => {
				this.$store.state.material[index].zzKeyFiles = []
				for (let i in response) {
					this.$store.state.material[index].zzKeyFiles.push(response[i])
				}
				this.checkShow(index)
			})
		},
		uploadAll(appAttName, appAttId, id, zzKey, index, hasDzzz) {
			let isMe = this.isMe(id)
			this.$store.dispatch('uploadAll', {
				appAttName,
				appAttId,
				id,
				zzKey,
				isMe,
				list: this.$store.state.material[index].zzKeyFiles,
				hasDzzz
			}).then((response) => {
				if (response.flag == '0' || response.flag == 0) {
					this.$store.state.material[index].fileList.push(response.response)
				} else if (response.flag == '1' || response.flag == 1) {
					this.$store.state.material[index].zzKeyFiles = []
					for (let i in response.response) {
						this.$store.state.material[index].zzKeyFiles.push(response.response[i])
					}
				} else {
					console.log('flag：' + response.flag)
				}
				this.checkShow(index)
			})
		},
		deleteMaterial(uuid, zzKey, index, inIndex) {
			let self = this
			self.$store.dispatch('deleteMaterial', {
				uuid,
				zzKey
			}).then(response => {
				if (zzKey) {
					self.$store.state.material[index].zzKeyFiles.splice(inIndex, 1)
				} else {
					self.$store.state.material[index].fileList.splice(inIndex, 1)
				}
				this.checkShow(index)
			})
		},
		updateCode(code, type) {
			let self = this
			self.$store.dispatch('getChildArea', code).then(response => {
				self.$store.state[type] = response
			})
		},
		fetchMaterial() {
			let self = this
			self.$store.dispatch('getMaterial', self.$store.state.form.oid).then(response => {
				self.$store.commit('SET_MATERIAL', response)
			})
		}
	},
	mounted() {
		let self = this
		self.updateCode('340200', 'district')
		if (self.$store.state.form.mhjsheng == "34" && self.$store.state.form.fhjsheng == "34") {
			self.$store.state.form.oid = '2c9a84815654645b01567360647b00be'
			if (self.$store.state.material.length == '6') {
				return
			} else {
				self.fetchMaterial()
			}
		} else if (self.$store.state.form.mhjsheng == "34" || self.$store.state.form.fhjsheng == "34") {
			self.$store.state.form.oid = '2c9a84815654645b01567371693700c6'
			if (self.$store.state.material.length == '7') {
				return
			} else {
				self.fetchMaterial()
			}
		} else {
			self.$store.dispatch('toast', '必须有一方户籍在省内')
		}
		// if (self.$store.state.material.length) {
		// 	return
		// }else {
		// 	self.fetchMaterial()
		// }
	}
}

</script>
<style lang="less">
.material-list {
    background-color: #fff;
    .material-item {
        padding: 1rem;
        text-indent: 0.5rem;
        border-bottom: 1px solid #f0f0f0;
        .p {
            display: inline-block;
            float: left;
            font-size: 1.5rem;
        }
        .span {
            float: right;
            display: inline-block;
            width: 2rem;
            height: 2rem;
            margin-left: 1rem;
            &.id {
                background: url('../../assets/img/gray.png') no-repeat center;
                background-size: 2rem;
                &.gray {
                    background: url('../../assets/img/id.png') no-repeat center;
                    background-size: 2rem;
                }
            }
            &.photo {
                background: url('../../assets/img/photo.png') no-repeat center;
                background-size: 2rem;
            }
            &.file {
                background: url('../../assets/img/file.png') no-repeat center;
                background-size: 2rem;
            }
        }
        em {
            display: inline-block;
            width: 1.5rem;
            height: 1.5rem;
            float: left;
            background: url('../../assets/img/open.png') no-repeat center;
            transform: rotate(270deg);
            -webkit-transform: rotate(270deg);
            background-size: 1rem;
            &.open {
                transform: rotate(0deg) !important;
                -webkit-transform: rotate(0deg) !important;
            }
        }
    }
    .file-list {
        text-indent: 2em;
        .file-item {
            margin-top: 1.5rem;
            .filep {
                font-size: 1.4rem;
                clear: both;
                .filespan {
                    float: right;
                    font-size: 1.5rem;
                    text-indent: 0;
                    color: #999;
                }
            }
            &.id {
                background: url('../../assets/img/id.png') no-repeat left center;
                background-size: 1.2rem;
            }

        }

    }
}
</style>
