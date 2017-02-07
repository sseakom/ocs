<template lang="jade">
	div
		div(v-if="!gender")
			my-title(title="男方基本信息")
			vue-field(label="姓名", value="mxm", placeholder="请填写姓名", type="text", vType="name", root="form")
			vue-field(label="身份证号", value="mzjhm", placeholder="请填写身份证号", type="text", vType="idcard", root="form")
			vue-field(label="联系电话", value="mlxdh", placeholder="请填写联系电话", type="text", vType="mobile", root="form")
			vue-select(selected="mmz", :list="nation", label="民族", root="form")
			vue-select(selected="mwhcd", :list="culture", label="文化程度", root="form")
			vue-field(label="工作单位", value="mgzdw", placeholder="请填写工作单位", type="text", root="form")
			my-title(title="户籍详细地址", :action="changeAddr", data="mhj", :param="mhjxz")
			p.address(v-if="mhjxz") {{mhjxz}}{{mhjmp}}
			.add(v-else,@click="changeAddr('mhj')") +点击添加地址
			my-title(title="现居住详细地址", :action="changeAddr", data="mjz", :param="mjzxz")
			p.address(v-if="mjzxz") {{mjzxz}}{{mjzmp}}
			.add(v-else,@click="changeAddr('mjz')") +点击添加地址
		div(v-else)
			my-title(title="女方基本信息")
			vue-field(label="姓名", value="fxm", placeholder="请填写姓名", type="text", vType="name", root="form")
			vue-field(label="身份证号", value="fzjhm", placeholder="请填写身份证号", type="text", vType="idcard", root="form")
			vue-field(label="联系电话", value="flxdh", placeholder="请填写联系电话", type="text", vType="mobile", root="form")
			vue-select(selected="fmz", :list="nation", label="民族", root="form")
			vue-select(selected="fmwhcd", :list="culture", label="文化程度", root="form")
			vue-field(label="工作单位", value="fgzdw", placeholder="请填写工作单位", type="text", root="form")
			my-title(title="户籍详细地址", :action="changeAddr", data="fhj", :param="fhjxz")
			p.address(v-if="fhjxz") {{fhjxz}}{{fhjmp}}
			.add(v-else,@click="changeAddr('fhj')") +点击添加地址
			my-title(title="现居住详细地址", :action="changeAddr", data="fjz", :param="fjzxz")
			p.address(v-if="fjzxz") {{fjzxz}}{{fjzmp}}
			.add(v-else,@click="changeAddr('fjz')") +点击添加地址
		my-button(label="下一步",data="/oneCardSolution/marriage",:action="next")
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
		validateAddr(data){
			let self = this
			if( self.$store.state.form.mjzshi== '3412' || self.$store.state.form.mhjshi== '3412'  || self.$store.state.form.fjzshi== '3412'  || self.$store.state.form.fhjshi== '3412' ){
				self.$router.push(data)
			}else{
				self.$store.dispatch('toast','很抱歉，您不具备在芜湖办理《健康家庭一卡通》的条件，请到夫妻一方的户籍地或现居住地办理')
			}
		},
		next(data) {
			let self = this
			if(self.$store.state.test){
				self.$router.push(data)
			}
			styzy.validate({
				flagName: 'validate',
				typeName: 'v-type',
				labelName: 'label',
				success() {
					if (!self.gender) {
						if (self.$store.state.form.mmz) {//民族
							if (self.$store.state.form.mwhcd) {//文化程度
								if (self.$store.state.form.mhjsheng && self.$store.state.form.mhjshi && self.$store.state.form.mhjqx && self.$store.state.form.mhjjd ) { //户籍详细地址
									if (self.$store.state.form.mjzsheng && self.$store.state.form.mjzshi && self.$store.state.form.mjzqx && self.$store.state.form.mjzjd ) {//现居住地址
										self.validateAddr(data)
									} else {
										self.$store.dispatch('toast', '请完善现居住详细地址')
									}
								} else {
									self.$store.dispatch('toast', '请完善户籍详细地址')
								}
							} else {
								self.$store.dispatch('toast', '请选择文化程度')
							}
						} else {
							self.$store.dispatch('toast', '请选择民族')
						}
					} else {
						if (self.$store.state.form.fmz) { //民族
							if (self.$store.state.form.fmwhcd) { //文化程度
								if (self.$store.state.form.fhjsheng && self.$store.state.form.fhjshi && self.$store.state.form.fhjqx && self.$store.state.form.fhjjd) { //户籍详细地址
									if (self.$store.state.form.fjzsheng && self.$store.state.form.fjzshi && self.$store.state.form.fjzqx && self.$store.state.form.fjzjd) { //现居住地址
										self.validateAddr(data)
									} else {
										self.$store.dispatch('toast', '请完善现居住详细地址')
									}
								} else {
									self.$store.dispatch('toast', '请完善户籍详细地址')
								}
							} else {
								self.$store.dispatch('toast', '请选择文化程度')
							}
						} else {
							self.$store.dispatch('toast', '请选择民族')
						}
					}
				},
				error(msg) {
					self.$store.dispatch('toast', msg)
				}
			})
		},
		changeAddr(data) {
			this.setAddress(data)
      		this.$router.push('/oneCardSolution/changeAddr')
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
	computed: {
		gender() {
			return this.$store.state.gender
		},
		nation() {
			return this.$store.state.nation
		},
		culture() {
			return this.$store.state.culture
		},
		mhjxz() {
			return this.$store.state.form.mhjxz
		},
		mjzxz() {
			return this.$store.state.form.mjzxz
		},
		fhjxz() {
			return this.$store.state.form.fhjxz
		},
		fjzxz() {
			return this.$store.state.form.fjzxz
		},
		fhjmp(){
			return this.$store.state.form.fhjmp
		},
		fjzmp(){
			return this.$store.state.form.fjzmp
		},
		mhjmp(){
			return this.$store.state.form.mhjmp
		},
		mjzmp(){
			return this.$store.state.form.mjzmp
		}
	},
	mounted() {
		let self = this
		if (self.$store.state.form.fjhzbh) {
			//请求注册信息
			if(self.$store.state.form.mxm && self.$store.state.form.fxm){

			}else{
				self.$store.dispatch('getRegistry', self.$store.state.otherId).then(response => {
					self.$store.commit('SET_REGISTRY', {
						data: response,
						gender: !self.$store.state.gender
					})
				})
			}

			//请求公司信息
			if(self.$store.state.form.mgzdw && self.$store.state.form.fgzdw){

			}else{
				self.$store.dispatch('getCompany', self.$store.state.otherId).then(response => {
					self.$store.commit('SET_COMPANY', {
						data: response[self.$store.state.otherId],
						gender: !self.$store.state.gender
					})
				})
			}

			//请求住址信息
			if(self.$store.state.form.mhjxz && self.$store.state.form.fhjxz){

			}else{
				self.$store.dispatch('getAddress', self.$store.state.otherId).then(response => {
					self.$store.commit('SET_ADDRESS', {
						data: response,
						gender: !self.$store.state.gender
					})
				})
			}

		} else {

		}

	}
}
</script>
