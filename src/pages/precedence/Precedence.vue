<template lang="jade">

	div
		my-title(title="老年人优待证福利政策")
		p.step 免费进入公园、博物馆、纪念馆、纪念性陵园、开放文物点、美术馆、技馆、文化宫等场所；
		p.step 优先购买车船票、飞机票，优先上下船、飞机，优先托运行李、物品；
		p.step 各类医疗机构优先就诊、化验、检查、交费、取药，需要住院治疗的，优先安排床位免费使用收费公共厕所；
		p.step 70周岁以上的本省老年人免费乘坐城市市内公共汽车，免费进入风景名胜区，在医疗机构就诊免收普通门诊挂号费；
		.tips(style="padding-bottom:1rem;") * 仅限满60周岁以上的居民办理
		my-button(label="本人办理",data="/precedence/homepage",:action="next",type='md')
		my-button(label="代他人办理",data="/precedence/agent",:action="next",type='md')

</template>
<script type="text/babel">
import button from '../../components/btn.vue'
import title from '../../components/title.vue'

export default {
	name: 'Precedence',
	components: {
		'my-button': button,
		'my-title': title
	},
	methods: {
		next(data) {
			this.$router.push(data)
		}
	},
	mounted(){
		let self = this
		//清空数据
		for(let key in self.$store.state.precedence){
			self.$store.state.precedence[key] = ''
		}
		self.$store.state.precedence.oid = '2c9a848157a8655d0157d1db74780305'
	}
}
</script>
<style lang="less" scoped>
.step {
    padding: 1.5rem;
    font-size: 1.6rem;
    line-height: 1.5;
    background: #fff;
}
</style>
