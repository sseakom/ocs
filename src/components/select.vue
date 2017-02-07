<template lang="jade">
    a.mint-cell.mint-field
        .mint-cell-wrapper
            .mint-cell-title
                span.mint-cell-text {{label}}
            .mint-cell-value
                select.select(v-model="select",style="color:#999;")
                    option.option(value="",disabled="disabled")  请选择
                    option.option(v-for="item in list", :value="item.code")  {{item.name}}
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
    },
    watch:{
        select(val){
            let self = this
            if(self.selected == 'yexb'){
                if(self.$store.state.form.ddlhc == '2'){
                    if(val == '1'){
                        self.$store.state.form.fsynan = '1'
                        self.$store.state.form.fsynv = '0'
                    }else if(val == '2'){
                        self.$store.state.form.fsynv = '1'
                        self.$store.state.form.fsynan = '0'
                    }
                }
            }
            if(self.selected == 'ddlhc'){
                if(val == '1'){
                    setTimeout(()=>{
                        self.$store.state.form.fsynan = '0'
                        self.$store.state.form.fsynv = '0'
                    },500)
                }else if(val == '2'){
                    if(self.$store.state.form.yexb == '1'){
                        setTimeout(()=>{
                            self.$store.state.form.fsynan = '1'
                            self.$store.state.form.fsynv = '0'
                        },500)
                    }else if(this.$store.state.form.yexb == '2'){
                        setTimeout(()=>{
                            self.$store.state.form.fsynv = '1'
                            self.$store.state.form.fsynan = '0'
                        },500)
                    }
                }
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
            background: none;
            .select{
                width: 95%;
                height: 100%;
                font-size: 1.5rem;
                font-family: '微软雅黑';
                background-color: #fff;
                border: none;
                -webkit-appearance: none;
                .option{
                    text-align: center;
                    -webkit-appearance: none;
                }
            }
        }
    }
}
</style>
