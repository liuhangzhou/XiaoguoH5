<template>
    <div class="selectNum-container">
        <div class="selectNum-box">
            <div class="select-header">
                {{$t("home.zxjcrs")}}
            </div>
            <div class="table-no-wrapper">{{$t("home.zhuohao")}}：{{tableNo}}</div>
            <div class="select-number">
                <div class="number-container" v-for="n in 12" :key="n" @click="handleClick(n)" :class="{current: n==selectNum}">
                    {{n}}
                </div>
            </div>
            <div class="select-btn" @click="submit">
                {{$t("home.ksdc")}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'selectNum',
    data() {
        return {
            tableNo: sessionStorage.getItem('tableNo'),
            selectNum: 1,
        }
    },
    created() {
        let msCode = this.$route.query.msCode ? this.$route.query.msCode : '10001';
        let tableNo = this.$route.query.tableNo ? this.$route.query.tableNo : '10';
        sessionStorage.setItem('msCode',msCode)
        sessionStorage.setItem('tableNo',tableNo)
    },
    computed: {
        ...mapGetters(['mealsNumber'])
    },
    methods: {
        ...mapActions(['setMealsNumber']),
        handleClick(n) {
            this.selectNum = n;
        },
        submit() {
            this.setMealsNumber(this.selectNum);
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
.selectNum-container{
    height: 100vh;
    background-image: url('../assets/img/background.png'); 
    background-size: 100% 100%; 
    background-repeat:no-repeat;
}
.selectNum-box{
    position: fixed;
    padding: .35rem;
    bottom: .5rem;
    width: 7rem;
    margin: 0 auto;
    background: #fff;
    left: 0;
    border-radius: .1rem;
    right: 0;
}
.select-header{
    font-family: PingFangSC-Semibold, PingFang SC;
    font-size: .36rem;
    color:#000000;
    margin-bottom: .16rem;
}
.select-number{
    font-size: .28rem;
    display:flex;
    text-align: center;
    flex-wrap: wrap;
    justify-content: space-between;
}
.number-container{
     width: 1.3rem;
    height: .7rem;
    background: #F5F5F5;
    border-radius: .35rem;
    line-height: .7rem;
    color: #666660;
    border: 1px solid #F5F5F5;
    margin-bottom: .2rem;
}
.table-no-wrapper{
    margin-bottom: .5rem;
    font-size: .28rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
}
.current{
    background: #FFEFDF;
    border: 1px solid #FF8F1F;
}
.select-btn{
    width: 100%;
    height: 1rem;
    background: #FF8F1F;
    border-radius: .5rem;
    line-height: 1rem;
    text-align: center;
    font-size: .32rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-top: .5rem;
}
</style>
