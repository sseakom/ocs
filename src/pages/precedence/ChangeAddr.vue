<template lang="jade">
	div
		city-picker(:sheng="addr.sheng", :shi="addr.shi", :qx="addr.qx", :jd="addr.jd", :sq="addr.sq", :zrc="addr.zrc", :xz="addr.xz", :mp="addr.mp", root="precedence")
		my-button(label="确定",:action="next")

</template>
<script type="text/babel">
import Button from '../../components/btn.vue'
import CityPicker from '../../components/CityPicker.vue'

export default {
	name: 'ChangeAddr',
	components: {
		CityPicker,
		'my-button': Button
	},
	computed: {
		addr(){
			return this.$store.state.addr
		}
	},
	data(){
		return {
			arr:['xz','sheng','shi','qx','jd','sq','zrc','mp']
		}
	},
	methods:{
		next(data){
			for(let key in this.arr){
				this.$store.state.precedence[this.$store.state.addr[this.arr[key]]] = this.$store.state.addrCode[this.arr[key]]
			}
			if(this.$store.state.precedence.phjxz || this.$store.state.precedence.phjmp){
				this.$store.state.precedence.hjaddress = this.$store.state.precedence.phjxz + this.$store.state.precedence.phjmp
			}
			if(this.$store.state.precedence.pjzxz || this.$store.state.precedence.pjzmp){
				this.$store.state.precedence.address = 	this.$store.state.precedence.pjzxz + this.$store.state.precedence.pjzmp
			}
			this.$router.back()
		}
	},
	mounted(){
		for(let key in this.arr){
			this.$store.state.addrCode[this.arr[key]] = ''
		}
	}
}
</script>
