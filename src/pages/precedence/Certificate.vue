<template lang="jade">

	div
		my-title(title="办件申请信息")
		vue-select(selected="districtcode", :list="district", label="办件县区", root="precedence")
		vue-select(selected="streetcode", :list="street", label="办件乡镇/街道", root="precedence")
		vue-select(selected="communitycode", :list="community", label="受理社区/村", root="precedence")
		vue-select(selected="emsflag", :list="list", label="证件领取方式", root="precedence")
		div(v-show="emsflag=='1'")
			vue-field(label="收件人", value="applylinkname", placeholder="请填写收件人", type="text", vType="name", root="precedence")
			vue-field(label="收件地址", value="applyaddr", placeholder="请填写收件地址", type="text", root="precedence")
			vue-field(label="联系电话", value="applylinktel", placeholder="请填写联系电话", type="text", vType="mobile", root="precedence")
		div(v-show="emsflag=='0'")
			p.address 取件地址：{{pickupAddr}}
			p.address 取件电话：{{pickupTel}}
		my-title(title="提交材料")
		div.material-list
			div.material-item(v-for="(item, index)  in precedenceMaterial")
				em(@click="toggle(index)",:class="{'open':item.isShow == '1'}")
				p.p(@click="uploadAll(item.appAttName,item.appAttId,item.id,item.zzKey,index)") {{item.appAttName}}
				span.span.file(@click="upload('one_card_file',item.appAttName,item.appAttId,item.id,item.zzKey,index)")
				span.span.photo(@click="upload('one_card_photo',item.appAttName,item.appAttId,item.id,item.zzKey,index)")
				span.span.id(v-show="(dbr=='0') && (item.hasDzzz != '0')",@click="uploadId(item.appAttName,item.appAttId,item.id,item.zzKey,index)",:class="{'gray': (item.hasDzzz == '2')}")
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
		my-title(title="诚信承诺书")
		p.address 郑重承诺：本人承诺以上填写的信息及所传附件材料真实有效，如有虚假，愿意承担信用风险和相关法律责任。
		mt-checklist(v-model="agree", :options="['本人自愿签署上方诚信承诺书']")
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
		precedenceMaterial() {
			return this.$store.state.precedenceMaterial
		},
		gender() {
			return this.$store.state.gender
		},
		streetcode() {
			return this.$store.state.precedence.streetcode
		},
		communitycode() {
			return this.$store.state.precedence.communitycode
		},
		districtcode() {
			return this.$store.state.precedence.districtcode
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
			return this.$store.state.precedence.emsflag
		},
		pickupAddr() {
			return this.$store.state.pickupAddr ? this.$store.state.pickupAddr : '暂无'
		},
		pickupTel() {
			return this.$store.state.pickupTel ? this.$store.state.pickupTel : '暂无'
		},
		dbr(){
			return this.$store.state.precedence.dbr
		}
	},
	watch: {
		districtcode(code) {
			if (code) {
				this.updateCode(code, 'street')
				this.$store.state.precedence.streetcode = ''
				this.$store.state.precedence.communitycode = ''
				this.$store.state.pickupAddr = ''
				this.$store.state.pickupTel = ''
			}
		},
		streetcode(code) {
			if (code) {
				this.updateCode(code, 'community')
				this.$store.state.precedence.communitycode = ''
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
			//验证材料
			let enable = true
			let info = []
			for (let i in this.$store.state.precedenceMaterial) {
				if (this.$store.state.precedenceMaterial[i].fileList.length) {

				} else {
					if (this.$store.state.precedenceMaterial[i].zzKeyFiles.length) {

					} else {
						enable = false
						info.push(this.$store.state.precedenceMaterial[i].appAttName)
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
			if (self.$store.state.precedence.districtcode) { //请选择办件街道
				if (self.$store.state.precedence.streetcode) { //请选择办件社区
					if (self.$store.state.precedence.communitycode) { //请选择办件社区
						if (self.$store.state.precedence.emsflag) { //领取方式
							console.log(self.$store.state.precedence.emsflag)
							if (self.$store.state.precedence.emsflag == '0') { //自取
								console.log('自取')
								self.valMaterial()
							} else if(self.$store.state.precedence.emsflag == '1') { //EMS
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
		//切换显示隐藏
		toggle(index) {
			if (this.$store.state.precedenceMaterial[index].isShow == '1') {
				this.$store.state.precedenceMaterial[index].isShow = '0'
			} else {
				this.$store.state.precedenceMaterial[index].isShow = '1'
			}
		},
		//提交
		submitApply() {
			console.log(JSON.stringify(this.$store.state.precedence))
			if(this.agree){
				if(this.submitDelay){
					this.submitDelay = false
					this.$store.dispatch('submitApply', this.$store.state.precedence)
					setTimeout(()=>{
						this.submitDelay = true
					},2000)
				}
			}else{
				this.$store.dispatch('toast', '您未同意诚信承诺书')
			}
		},
		//上传删除材料后检测文件显示
		checkShow(index) {
			if (this.$store.state.precedenceMaterial[index].fileList.length || this.$store.state.precedenceMaterial[index].zzKeyFiles.length) {
				this.$store.state.precedenceMaterial[index].isShow = '1'
			} else {
				this.$store.state.precedenceMaterial[index].isShow = '0'
			}
		},
		//上传 文件、拍照
		upload(type, appAttName, appAttId, id, zzKey, index) {
			//let isMe = this.isMe(id)
			this.$store.dispatch('uploadMaterial', {
				type,
				data: {
					appAttName,
					appAttId,
					id,
					zzKey,
					isMe:'1'
				}
			}).then(response => {
				this.$store.state.precedenceMaterial[index].fileList.push(response)
				this.checkShow(index)
			})
		},
		//上传证件照
		uploadId(appAttName, appAttId, id, zzKey, index) {
			//let isMe = this.isMe(id)
			this.$store.dispatch('uploadIdMaterial', {
				appAttName,
				appAttId,
				id,
				zzKey,
				isMe:'1',
				list: this.$store.state.precedenceMaterial[index].zzKeyFiles
			}).then(response => {
				this.$store.state.precedenceMaterial[index].zzKeyFiles = []
				for (let i in response) {
					this.$store.state.precedenceMaterial[index].zzKeyFiles.push(response[i])
				}
				this.checkShow(index)
			})
		},
		//通用上传
		uploadAll(appAttName, appAttId, id, zzKey, index) {
			//let isMe = this.isMe(id)
			this.$store.dispatch('uploadAll', {
				appAttName,
				appAttId,
				id,
				zzKey,
				isMe: (this.dbr == '0') ? '1' : '0',
				list: this.$store.state.precedenceMaterial[index].zzKeyFiles
			}).then((response) => {
				if(response.flag=='0' || response.flag==0){
					this.$store.state.precedenceMaterial[index].fileList.push(response.response)
				}else if(response.flag=='1' || response.flag==1){
					this.$store.state.precedenceMaterial[index].zzKeyFiles = []
					for (let i in response.response) {
						this.$store.state.precedenceMaterial[index].zzKeyFiles.push(response.response[i])
					}
				}else {
					console.log('flag：'+response.flag)
				}
				this.checkShow(index)
			})
		},
		//删除材料
		deleteMaterial(uuid, zzKey, index, inIndex) {
			let self = this
			self.$store.dispatch('deleteMaterial', {
				uuid,
				zzKey
			}).then(response => {
				if (zzKey) {
					self.$store.state.precedenceMaterial[index].zzKeyFiles.splice(inIndex, 1)
				} else {
					self.$store.state.precedenceMaterial[index].fileList.splice(inIndex, 1)
				}
				this.checkShow(index)
			})
		},
		//更新选择地区代码
		updateCode(code, type) {
			let self = this
			self.$store.dispatch('getChildArea', code).then(response => {
				self.$store.state[type] = response
			})
		},
		//获取材料列表
		fetchMaterial() {
			let self = this
			self.$store.dispatch('getMaterial', self.$store.state.precedence.oid).then(response => {
				self.$store.state.precedenceMaterial = response
			})
		}
	},
	mounted() {
		let self = this
		self.updateCode('340200', 'district')
		if (self.$store.state.precedenceMaterial.length) {
			return
		}else {
			self.fetchMaterial()
		}
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
