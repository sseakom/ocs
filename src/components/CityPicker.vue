<template lang="jade">
	div
		my-title(title="请选择省 / 市 / 区")
		mt-picker(:slots="slots", @change="onValuesChange", :visible-item-count="3")
		my-title(title="请选择乡（街道） / 村（社区） / 组（自然村）")
		mt-picker(:slots="slots2", @change="onValuesChange2", :visible-item-count="3")
		my-title(title="详细地址")
		p.address {{address}}
		my-title(title="门牌地址")
		textarea.address(style="width:100%;resize:none;",v-model="mpAddr")
</template>
<script type="text/babel">
import { Picker } from 'mint-ui'
import title from '../components/title.vue'

export default {
	name: 'CityPicker',
	props:['sheng','shi','qx','jd','sq','zrc','xz','mp','root'],
	components: {
		'mt-picker': Picker,
		'my-title': title,
	},
	methods: {
		onValuesChange(picker, values) {
			let self = this
			if(self.checked1 != values[0] && values[0]){
				console.log(values[0])
				self.checked1 = values[0]
				self.checked3 = ''
				self.checked4 = ''
				self.checked5 = ''
				self.checked6 = ''
				self.code[2] = ''
				self.code2[0] = ''
				self.code2[1] = ''
				self.code2[2] = ''
				self.slots[2].values = []
				self.slots2[0].values = []
				self.slots2[1].values = []
				self.slots2[2].values = []
				for(let key in self.slots[0].values){
					if(self.slots[0].values[key] == values[0]){
						self.index[0] = self.code[0][key]
						self.fetchData(self.code[0][key],1,()=>{
							self.checked3 = ''
							self.checked4 = ''
							self.checked5 = ''
							self.checked6 = ''
							self.code[2] = ''
							self.code2[0] = ''
							self.code2[1] = ''
							self.code2[2] = ''
							self.slots[2].values = []
							self.slots2[0].values = []
							self.slots2[1].values = []
							self.slots2[2].values = []
						})
					}
				}
			}
			if(self.checked2 != values[1] && values[1]){
				console.log(values[1])
				self.checked2 = values[1]
				self.checked4 = ''
				self.checked5 = ''
				self.checked6 = ''
				self.code2[0] = ''
				self.code2[1] = ''
				self.code2[2] = ''
				self.slots2[0].values = ''
				self.slots2[1].values = ''
				self.slots2[2].values = ''
				for(let key in self.slots[1].values){
					if(self.slots[1].values[key]==values[1]){
						self.index[1] = self.code[1][key]
						self.fetchData(self.code[1][key],2,()=>{
							self.checked4 = ''
							self.checked5 = ''
							self.checked6 = ''
							self.code2[0] = ''
							self.code2[1] = ''
							self.code2[2] = ''
							self.slots2[0].values = []
							self.slots2[1].values = []
							self.slots2[2].values = []
						})
					}
				}
			}
			if(self.checked3 != values[2]  && values[2]){
				console.log(values[2])
				self.checked3 = values[2]
				self.checked5 = ''
				self.checked6 = ''
				self.code2[1] = ''
				self.code2[2] = ''
				self.slots2[1].values = []
				self.slots2[2].values = []
				for(let key in self.slots[2].values){
					if(self.slots[2].values[key]==values[2]){
						self.index[2] = self.code[2][key]
						self.fetchData2(self.code[2][key],0,()=>{
							self.checked5 = ''
							self.checked6 = ''
							self.code2[1] = ''
							self.code2[2] = ''
							self.slots2[1].values = []
							self.slots2[2].values = []
						})
					}
				}
			}
		},
		onValuesChange2(picker, values) {
			let self = this
			if(self.checked4 != values[0] && values[0]){
				console.log(values[0])
				self.checked4 = values[0]
				self.checked6 = ''
				self.code2[2] = ''
				self.slots2[2].values = []
				for(let key in self.slots2[0].values){
					if(self.slots2[0].values[key] == values[0]){
						self.index[3] = self.code2[0][key]
						self.fetchData2(self.code2[0][key],1,() => {
							self.checked6 = ''
							self.code2[2] = ''
							self.slots2[2].values = []
						})
					}
				}
			}
			if(self.checked5 != values[1] && values[1]){
				console.log(values[1])
				self.checked5 = values[1]
				for(let key in self.slots2[1].values){
					if(self.slots2[1].values[key] == values[1]){
						self.index[4] = self.code2[1][key]
						self.fetchData2(self.code2[1][key],2,()=>{
						})
					}
				}
			}
			if(self.checked6 != values[2] && values[2]){
				console.log(values[2])
				self.checked6 = values[2]
				for(let key in self.slots2[2].values){
					if(self.slots2[2].values[key] == values[2]){
						self.index[5] = self.code2[2][key]
					}
				}
			}
		},
		fetchData(code,index,callback){
			let self = this
			let ind = 0
			self.$store.dispatch('getArea',code).then(response => {
				let result = response //JSON.parse(response.data).result
				self.slots[index].values = []
				self.code[index] = []
				for(let key in result){
					self.slots[index].values.push(result[key].aeraName)
					self.code[index].push(result[key].aeraID)
				}
				if(result){
					if(index==0){
						self.checked1 = result[0].aeraName
					}else if(index==1){
						self.checked2 = result[0].aeraName
					}else if(index==2){
						self.checked3 = result[0].aeraName
					}
					callback && callback()
				}
			})
		},
		fetchData2(code,index,callback){
			let self = this
			let ind = 0
			self.$store.dispatch('getArea',code).then(response => {
				let result = response//JSON.parse(response.data).result
				self.slots2[index].values = []
				self.code2[index] = []
				for(let key in result){
					self.slots2[index].values.push(result[key].aeraName)
					self.code2[index].push(result[key].aeraID)
				}
				if(result){
					if(index==0){
						self.checked4 = result[0].aeraName
					}else if(index==1){
						self.checked5 = result[0].aeraName
					}else if(index==2){
						self.checked6 = result[0].aeraName
					}
					callback && callback()
				}
			})
		}
	},
	data() {
		return {
			checked1:'',checked2:'',checked3:'',checked4:'',checked5:'',checked6:'',
			index:['','','','','',''],
			code:['','',''],
			slots: [
				{
					flex: 1,
					values: [],
					className: 'slot1',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot2',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot3',
					textAlign: 'center'
				}
			],
			code2:['','',''],
			slots2: [
				{
					flex: 1,
					values: [],
					className: 'slot4',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot5',
					textAlign: 'center'
				}, {
					flex: 1,
					values: [],
					className: 'slot6',
					textAlign: 'center'
				}
			]
		}
	},
	watch:{
		address(val){
			this.$store.state.addrCode.xz = val
			this.$store.state.addrCode.sheng = this.index[0]
			this.$store.state.addrCode.shi = this.index[1]
			this.$store.state.addrCode.qx = this.index[2]
			this.$store.state.addrCode.jd = this.index[3]
			this.$store.state.addrCode.sq = this.index[4]
			this.$store.state.addrCode.zrc = this.index[5]
		}
	},
	computed:{
		address(){
			return this.checked1 + this.checked2 + this.checked3 + this.checked4 + this.checked5 + this.checked6
		},
		mpAddr:{
			get () {
			    return this.$store.state[this.root][this.mp]
			},
			set (value) {
			    this.$store.state.addrCode.mp = value
			}
		}
	},
	mounted(){
		this.fetchData('',0)
	}
}
</script>
<style lang="less">
.picker-items{
	border-bottom: 1px solid #dfdfdf;
	.picker-slot-wrapper{
		.picker-item{
			font-size: 1.6rem;
		}
	}
}
.address{
	padding: 1.5rem;
	font-size: 1.6rem;
	line-height: 1.5;
	background: #fff;
}
</style>
