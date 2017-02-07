<template lang="jade">
	a.mint-cell.mint-field
		.mint-cell-left
		.mint-cell-wrapper
			.mint-cell-title
				span.mint-cell-text {{label}}
			.mint-cell-value(v-if="value && type == 'text'")
				input.mint-field-core( v-model="text", :placeholder='placeholder', type='text', style="background-color:#fff;width:100%;height:3rem;display:block;", validate, :label="label", :v-type="vType", :disabled="disabled", :pass="pass")
				.mint-field-clear(style='display: none;')
					i.mintui.mintui-field-error
				span.mint-field-state.is-default
					i.mintui.mintui-field-default
				.mint-field-other
			.mint-cell-value(v-if="type == 'date'")
				input.mint-field-core.date(v-model="text", :placeholder='placeholder', type='date', style="width:100%;height:3rem;display:block;", :pass="pass" )
				.mint-field-clear(style='display: none;')
					i.mintui.mintui-field-error
				span.mint-field-state.is-default
					i.mintui.mintui-field-default
				.mint-field-other
			.mint-cell-value(v-if="value1 && value2")
				input.mint-field-core(type='text',  v-model="text1", style="background-color:#fff;width:10%;height:3rem;display:block;margin:0 10%;", :pass="pass" )
				span.mint-cell-text 男
				input.mint-field-core(type='text',  v-model="text2", style="background-color:#fff;width:10%;height:3rem;display:block;margin:0 10%;", :pass="pass" )
				span.mint-cell-text 女
				.mint-field-clear(style='display: none;')
					i.mintui.mintui-field-error
				span.mint-field-state.is-default
					i.mintui.mintui-field-default
				.mint-field-other
		.mint-cell-right
</template>
<script type="text/babel">
import {
	Field,
	Cell
} from 'mint-ui'

export default {
	name: 'vue-field',
	props: ['label','placeholder','type','value','value1','value2','vType','disabled','root','pass'],
	components: {
		'mt-field': Field,
		'mt-cell': Cell,
	},
	computed:{
		text:{
			get () {
			  return this.$store.state[this.root][this.value]
			},
			set (value) {
			    this.$store.state[this.root][this.value] = value
			}
		},
		text1:{
			get () {
			  return this.$store.state[this.root][this.value1]
			},
			set (value) {
			    this.$store.state[this.root][this.value1] = value
			}
		},
		text2:{
			get () {
			  return this.$store.state[this.root][this.value2]
			},
			set (value) {
			    this.$store.state[this.root][this.value2] = value
			}
		}
	}
}
</script>
<style lang="less">
.date{
	background:url('../assets/img/date.png') no-repeat right center #fff;
	background-size: 1.8rem;
}
.mint-field-cell {
    padding: 1rem !important;
    .mint-cell-title {
        width: 45%;
        margin-right: 2rem;
        text-align: right;
        span {
            font-size: 1.6rem;
        }
    }
    .mint-field-core {
        font-size: 1.6rem;
        font-family: '微软雅黑';
        color: #999999;
        width: 100%;
        height: 100%;
        background-color: #fff;
        appearance: none;

    }
    .mint-cell-value {
        font-size: 1.6rem;
        font-family: '微软雅黑';
        color: #999999;
        background-color: #fff;

    }
}
</style>
