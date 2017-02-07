<template lang="jade">
    a.mint-cell.mint-field
        .mint-cell-wrapper
            .mint-cell-title
                span.mint-cell-text {{label}}
            .mint-cell-value
                select.select(v-model="select",style="color:#999;")
                    option.option(value="",disabled="disabled")  请选择
                    option.option(v-for="item in list", :value="item.area_code")  {{item.area_name}}
</template>
<script type="text/babel">
export default {
    name: 'select',
    props: ['selected','list','label','root'],
    computed:{
        select:{
            get () {
			    return this.$store.state[this.root][this.selected]
			},
			set (value) {
			    this.$store.state[this.root][this.selected] = value
			}
        }
    }
}
</script>
<style lang="less">
select:focus {
    outline:none;
}

.mint-field{
    border-bottom: 1px solid #f0f0f0 !important;
    background-color: #fff;
    .mint-cell-wrapper {
        .mint-cell-title {
            width: 35%;
            margin-right: 2rem;
            .mint-cell-text {
                font-size: 1.5rem;
            }
        }
        .mint-field-core {
            font-size: 1.5rem;
            font-family: '微软雅黑';
            color: #999999;
        }
        .mint-cell-value {
            font-size: 1.5rem;
            font-family: '微软雅黑';
            color: #999999;
            .select{
                width: 95%;
                height: 100%;
                font-size: 1.5rem;
                font-family: '微软雅黑';
                background-color: #fff;
                border: none;
                .option{
                    text-align: center;
                }
            }
        }
    }
}
</style>
