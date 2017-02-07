<template lang="jade">
	div(style="position:relative;")
		my-title(title="女方婚育信息")
		vue-select(selected="fhyzk", :list="marriage", label="婚姻状况", root="form")
		div(v-show="fhyzk!='10'")
			div(style="position:relative;")
				vue-field(label="结婚证号", value="fjhzbh", placeholder="请填写结婚证号", type="text", root="form")
				div(class="info",@click="info()")
			vue-field(label="结婚日期", value="fjhrq", placeholder="请选择日期", type="date", root="form")
			vue-field(label="发证机关", value="ffzjg", placeholder="请填写结婚证发证机关", type="text", root="form")
		vue-select(selected="ddlhc", :list="times", label="当前申请孩次", root="form")
		.tips * 仅限于一、二孩申请，三孩及以上请至户籍地办理生育证
		div(v-show="ddlhc=='2'")
			vue-field(label="上一子女生日", value="yecsrq", placeholder="请选择日期", type="date", root="form")
			vue-select(selected="yexb", :list="sex", label="上一子女性别", root="form")
		vue-select(selected="fhyqk", :list="pregnant", label="怀孕情况", root="form")
		div(v-show="fhyqk=='1'")
			vue-field(label="末次月经开始时间", value="fhysj", placeholder="请选择日期", type="date", root="form")
		div(v-show="fhyqk=='2'")
			vue-field(label="生育时间", value="fhysj", placeholder="请选择日期", type="date", root="form")
		vue-field(label="本人曾育子女情况", type="text", value1="fsynan", value2="fsynv", root="form")						
		my-title(title="男方婚育信息")
		vue-select(selected="mhyzk", :list="marriage", label="婚姻状况", root="form")
		vue-field(label="本人曾育子女情况", type="text", value1="msynan", value2="msynv", root="form")
		my-button(label="下一步",data="/oneCardSolution/certificate",:action="next")
		div.infoImg(v-show="infoShow",@click="info()")
			img(src="../../assets/img/jhzbh.png")
</template>
<script type="text/babel">
import button from '../../components/btn.vue'
import select from '../../components/select.vue'
import title from '../../components/title.vue'
import field from '../../components/field.vue'

export default {
	name: 'Marriage',
	components: {
		'my-button': button,
		'my-title': title,
		'vue-field': field,
		'vue-select': select,
	},
	data() {
		return {
			infoShow: false,
			sex: [{
				name: '男',
				code: '1'
			}, {
				name: '女',
				code: '2'
			}],
			times: [{
				name: '1',
				code: '1'
			}, {
				name: '2',
				code: '2'
			}]
		}
	},
	computed: {
		pregnant() {
			return this.$store.state.pregnant
		},
		marriage() {
			return this.$store.state.marriage
		},
		fhyzk() {
			return this.$store.state.form.fhyzk
		},
		ddlhc() {
			return this.$store.state.form.ddlhc
		},
		fhyqk() {
			return this.$store.state.form.fhyqk
		}
	},
	methods: {
		step1(data) {
			let self = this
			if (self.$store.state.form.ddlhc) { //当前孩次
				if (self.$store.state.form.ddlhc == '1') { //当前孩次=1
					self.step2(data)
				} else { //当前孩次=2
					if (self.$store.state.form.yecsrq) { //上一子女生日
						if (self.$store.state.form.yexb) { //上一子女性别
							self.step2(data)
						} else {
							self.$store.dispatch('toast', '请选择上一子女性别')
						}
					} else {
						self.$store.dispatch('toast', '请选择上一子女生日')
					}
				}
			} else {
				self.$store.dispatch('toast', '请选择当前申请孩次')
			}
		},
		step2(data) {
			let self = this
			if (self.$store.state.form.fhyqk) { //怀孕情况
				if (self.$store.state.form.fhyqk == '0' || self.$store.state.form.fhyqk == '3') { //未孕 其它
					self.step3(data)
				} else { //在孕 已生育
					if (self.$store.state.form.fhysj) {
						self.step3(data)
					} else {
						self.$store.dispatch('toast', '请选择怀孕时间')
					}
				}
			} else {
				self.$store.dispatch('toast', '请选择怀孕情况')
			}
		},
		step3(data) {
			let self = this
			if (self.$store.state.form.fsynan && self.$store.state.form.fsynv) {
				if (self.$store.state.form.mhyzk) { //男方婚姻状况
					if (self.$store.state.form.msynan && self.$store.state.form.msynv) { //男方子女情况
						self.$router.push(data)
					} else {
						self.$store.dispatch('toast', '请输入男方曾育子女情况')
					}
				} else {
					self.$store.dispatch('toast', '请选择男方婚姻状况')
				}
			} else {
				self.$store.dispatch('toast', '请输入女方曾育子女情况')
			}
		},
		next(data) {
			let self = this
			if(self.$store.state.test){
				self.$router.push(data)
			}
			if (self.$store.state.form.fhyzk) { //婚姻状况
				if (self.$store.state.form.fhyzk == '10') { //未婚
					self.step1(data)
				} else {
					if (self.$store.state.form.fjhzbh) { //结婚证号
						if (self.$store.state.form.fjhrq) { //结婚日期
							if (self.$store.state.form.ffzjg) { //发证机关
								self.step1(data)
							} else {
								self.$store.dispatch('toast', '请输入发证机关')
							}
						} else {
							self.$store.dispatch('toast', '请输入结婚日期')
						}
					} else {
						self.$store.dispatch('toast', '请输入结婚证号')
					}
				}
			} else {
				self.$store.dispatch('toast', '请选择婚姻状况')
			}
		},
		info(){
			if(this.infoShow){
				this.infoShow = false
			}else{
				this.infoShow = true
			}
		}
	}
}
</script>
<style lang="less">
	.info{
		width: 10%;
		height: 3rem;
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background: url('../../assets/img/info.png') no-repeat center;
		background-size: 2rem;
	}
	.infoImg{
		width: 100%;
		height: 100%;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 9999;
		background:rgba(0, 0, 0, 0.5);
		img{
			position: absolute;
			top: 0;
			bottom:0;
			left: 0;
			right: 0;
			display: block;
			margin: auto;
			width: 90%;
		}

	}
</style>
