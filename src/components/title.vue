<template lang="jade">
    div
        .space
        .title
            h4 {{title}}
                span(v-show="param", @click="action(data)") 修改
</template>
<script type="text/babel">
export default {
    name: 'my-title',
    props: ['title','action','data','param']
}
</script>
<style lang="less" scoped>
.title{
    padding: 1rem 0;
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    background: #fff;
    h4{
        height: 1.5rem;
        font-size: 1.5rem;
        line-height: 1.7rem;
        border-left: 4px solid #ff0055;
        color: #999;
        text-indent: 0.6rem;
        font-weight: normal;
        span{
            float: right;
            color: #ff0055;
            padding-right: 1.5rem;
        }
    }
}
</style>
