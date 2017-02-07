<template lang="jade">

	.my-btn(@click="action(data)",:class="type") {{label}}

</template>
<script type="text/babel">
export default {
  name: 'my-btn',
  props: ['label', 'data', 'action', 'type']
}
</script>
<style lang="less">
.my-btn {
    width: 90%;
    margin-left: 5%;
    margin-top: 1rem;
    margin-bottom: 1rem;
    height: 4rem;
    line-height: 4rem;
    background-color: #ff0055;
    color: #fff;
    font-size: 1.8rem;
    border-radius: 0.5rem;
    text-align: center;
    &.md {
        width: 40%;
        margin-right: 5%;
        float: left;
        height: 4rem;
        line-height: 4rem;
    }
}
</style>
