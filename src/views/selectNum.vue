<template>
    <div class="selectNum-container">
        <div class="select-header">
            {{$t("home.zxjcrs")}}
        </div>
        <div class="select-number">
            <div class="number-container" v-for="n in 12" :key="n" @click="handleClick(n)">
                {{n}}
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'selectNum',
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
            this.setMealsNumber(n);
            this.$router.push('/home')
        }
    }
}
</script>

<style scoped>
.selectNum-container{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: .6rem;
    padding-bottom: .8rem;
}
.select-header{
    font-size: .36rem;
    color:#101010;
    margin-bottom: .3rem;
}
.select-number{
    font-size: .28rem;
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
}
.number-container{
    width: 32%;
    height: .6rem;
    line-height: .6rem;
    border-radius: .1rem;
    background: #F28512;
    margin-bottom: .2rem;
    color: #fff;
}
</style>
