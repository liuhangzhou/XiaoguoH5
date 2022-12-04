<template>
<div>
    <van-nav-bar :title="title" left-text="" left-arrow @click-left="onClickLeft">
        <template #left>
            <img src="../../assets/img/ic_right.png" class="left-icon" alt="">
        </template>
    </van-nav-bar>
</div>
</template>

<script>
export default {
    props: {
        title: String,
        router: String
    },
    methods: {
        onClickLeft(){
            if(this.$props.router) {
                this.$router.push('/'+ this.$props.router)
            }else {
                this.$router.go(-1)
            }
        },
    }
}
</script>

<style scoped>
.left-icon{
    transform: rotate(180deg);
    width: .44rem;
    height: .44rem;
}

</style>