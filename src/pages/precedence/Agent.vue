<template lang="jade">
	div
		my-title(title="申请人基本信息")
		vue-field(label="姓名", value="name", placeholder="请填写姓名", type="text", vType="name", root="precedence")
		vue-field(label="身份证号", value="cardID", placeholder="请填写身份证号", type="text", vType="idcard", root="precedence")
		.tips * 仅限满60周岁以上的居民办理。
		vue-field(label="联系电话", value="tel", placeholder="请填写联系电话", type="text", vType="mobile", root="precedence")
		div(v-show="show")
			vue-field(label="发证类型", value="typeName", type="text", root="precedence", disabled="disabled", pass="pass")
			.tips * 红色由70周岁以上老年人使用，绿色由60周岁以上老年人使用。
		my-title(title="户籍详细地址", :action="changeAddr", data="phj", :param="hjaddress")
		p.address(v-if="hjaddress") {{hjaddress}}
		.add(v-else,@click="changeAddr('phj')") +点击添加地址
		my-title(title="现居住详细地址", :action="changeAddr", data="pjz", :param="address")
		p.address(v-if="address") {{address}}
		.add(v-else,@click="changeAddr('pjz')") +点击添加地址
		my-button(label="下一步",data="/precedence/certificate",:action="next")
</template>
<script type="text/babel">
import button from '../../components/btn.vue'
import select from '../../components/select.vue'
import title from '../../components/title.vue'
import field from '../../components/field.vue'
import styzy from '../../assets/js/tool-validate.common.styzy.js'

export default {
	name: 'HomePage',
	components: {
		'my-button': button,
		'my-title': title,
		'vue-select': select,
		'vue-field': field,
	},
	methods: {
		next(data) {
			let self = this
			styzy.validate({
				flagName: 'validate',
				typeName: 'v-type',
				labelName: 'label',
				passName: 'pass',
				success() {
					let id = self.$store.state.precedence.cardID
					let sexno //倒数第二位
					if (id.length == 18) {
						sexno = id.substring(16, 17)
					} else if (id.length == 15) {
						sexno = id.substring(14, 15)
					} else {
						console.log("错误的身份证号码，请核对！")
						return false
					}
					//设置性别
					if (sexno % 2 == 0) {
						self.$store.state.precedence.xb = '0'
					} else {
						self.$store.state.precedence.xb = '1'
					}
					if(self.$store.state.precedence.hjaddress){
						if(self.$store.state.precedence.address){
							if(self.$store.state.precedence.typeName){
								self.$store.state.precedence.applylinkname = self.$store.state.precedence.name
								self.$store.state.precedence.applylinktel = self.$store.state.precedence.tel
								self.$store.state.precedence.applyaddr = self.$store.state.precedence.address
								self.$router.push(data)
							} else {
								self.$store.dispatch('toast', '仅限满60周岁以上的居民办理。')
							}
						}else{
							self.$store.dispatch('toast', '请完善现居住详细地址')
						}
					}else{
						self.$store.dispatch('toast', '请完善户籍详细地址')
					}
				},
				error(msg) {
					self.$store.dispatch('toast', msg)
				}
			})
		},
		changeAddr(data) {
			this.setAddress(data)
			this.$router.push('/precedence/changeAddr')
		},
		setAddress(data) {
			this.$store.state.addr.sheng = data + 'sheng'
			this.$store.state.addr.shi = data + 'shi'
			this.$store.state.addr.qx = data + 'qx'
			this.$store.state.addr.jd = data + 'jd'
			this.$store.state.addr.sq = data + 'sq'
			this.$store.state.addr.zrc = data + 'zrc'
			this.$store.state.addr.xz = data + 'xz'
			this.$store.state.addr.mp = data + 'mp'
		}
	},
	data(){
		return {
			show: false
		}
	},
	computed: {
		phjxz() {
			return this.$store.state.precedence.phjxz
		},
		phjmp() {
			return this.$store.state.precedence.phjmp
		},
		pjzxz() {
			return this.$store.state.precedence.pjzxz
		},
		pjzmp() {
			return this.$store.state.precedence.pjzmp
		},
		address() {
			return this.$store.state.precedence.address
		},
		hjaddress() {
			return this.$store.state.precedence.hjaddress
		},
		cardID() {
			return this.$store.state.precedence.cardID
		},
		typeName() {
			return this.$store.state.precedence.typeName
		}
	},
	watch: {
		cardID(idCard) {
			if(idCard.length == 18 || idCard.length == 15){
				//从身份证获取年龄
				let myDate = new Date();
				let month = myDate.getMonth() + 1;
				let day = myDate.getDate();
				let age = myDate.getFullYear() - idCard.substring(6, 10) - 1;
				if (idCard.substring(10, 12) < month || idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day) {
					age++;
				}
				if (age >= 60 && age < 70) {
					this.$store.state.precedence.typeName = '绿卡'
					this.$store.state.precedence.type = 1
					this.show = true
				} else if (age >= 70) {
					this.$store.state.precedence.typeName = '红卡'
					this.$store.state.precedence.type = 2
					this.show = true
				} else {
					this.$store.state.precedence.typeName = ''
					this.$store.state.precedence.type = ''
					this.show = false
				}
			}else{
				this.$store.state.precedence.typeName = ''
				this.$store.state.precedence.type = ''
				this.show = false
			}
		}
	},
	mounted() {
		let self = this
		if(self.$store.state.precedence.dbr != '1'){
			//清空数据
			for(let key in self.$store.state.precedence){
				self.$store.state.precedence[key] = ''
			}
	        self.$store.state.precedence.dbr = '1' //设置代办
			self.$store.state.precedence.oid = '2c9a848157a8655d0157d1db74780305'

			//请求初始化信息
			self.$store.dispatch('getInitData').then(response => {
				self.$store.state.precedence.dbrName = response.name
				self.$store.state.precedence.dbridCard = response.icard
				self.$store.state.precedence.userid = response.userId
				self.$store.state.precedence.id = response.workSubmitId
			})
		}
	}
}
</script>
