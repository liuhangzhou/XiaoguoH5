<template>
  <div class="warper">
      <div class="user-info flex flex-vc" v-if="centerData.name">
          <div class="user-logo">
              <img src="../assets/img/ic_header.png" alt="">
          </div>
          <div class="user-text">
          <p class="user-name">{{centerData.name}}</p>
              <p>{{centerData.sex==1 ? $t('home.nan') : $t('home.nv')}}</p>
          </div>
      </div>
      <div class="user-info flex flex-vc" v-else @click="toLogin">
          <div class="user-logo">
              <img src="../assets/img/ic_header.png" alt="">
          </div>
          <div class="user-text">
              {{$t('dianjidenglu')}}
          </div>
      </div>
      <div class="container">
          <h6 class="account">{{$t('zhanghuzonglan')}}</h6>
          <div class="flex flex-hc">
              <div class="account-box flex-1 ">
                  <div class="number">
                      {{centerData.balance}}
                  </div>
                  <div class="text">
                      {{$t('yue')}}
                  </div>
              </div>
              <div class="account-box flex-1 ">
                  <div class="number">
                      {{centerData.bonus}}
                  </div>
                  <div class="text">
                      {{$t('jifen')}}
                      
                  </div>
              </div>
              <div class="account-box flex-1 ">
                  <div class="number">
                      {{centerData.couponNum}}
                  </div>
                  <div class="text">
                      {{$t('youhuiquan')}}
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <li class="my-list flex flex-sc flex-vc " @click="goProfile">
              <div class="flex flex-vc">
                  <van-icon name="setting-o" class="setting-icon"/>
                  {{$t('wodeziliao')}}
              </div>
              <div class="icon-right">
                  <img src="../assets/img/ic_right.png" alt="">
              </div>
          </li>
          <li class="my-list flex flex-sc flex-vc " style="margin-top:.3rem" @click="handleClickLogin">
              <div class="flex flex-vc">
                <img src="../assets/img/icon_exit_black.png" class="setting-icon"/>
                  {{$t('logout')}}
              </div>
              <div class="icon-right">
                  <img src="../assets/img/ic_right.png" alt="">
              </div>
          </li>
      </div>
  </div>
</template>

<script>
import { get } from '@/net/http'
import api from '@/net/api'
export default {
  name: 'my-order',
  data: () => {
      return {
          showMask: false,
          centerData: {}
      }
  },
  created(){
      get(api.queryCenter,{}).then(res=>{
          this.centerData = res;
          console.log(this.centerData)
      })
  },
  methods: {
      toLogin(){
          this.$router.push('/login')
      },
      goProfile() {
          this.$router.push('/profile')
      },
      goAddress() {
          this.$router.push('/myAddress')
      },
      goOrder(type) {
          this.$router.push('/myorder?type='+type)
      },
      handleClickLogin() {
        this.centerData = {};
        sessionStorage.removeItem('user')
        this.toLogin();
      },
  }
}
</script>

<style scoped>
.warper{
  min-height: 100vh;
  background: #FAFAFA;
}
.user-info{
  padding-top: .4rem;
  padding-left: .24rem;
  overflow: hidden;
}
.user-logo{
  width: 1rem;
  height: 1rem;
}
.user-logo img{
  width: 1rem;
  height: 1rem;
}
.user-text{
  font-size: .28rem;
  font-weight: 400;
  color: #666666;
  margin-left: .24rem;
}
.user-name{
  font-size: .34rem;
  font-weight: 800;
  color: #111111;
  margin-bottom: .08rem;
}
.account{
  font-size: .32rem;
  font-weight: 500;
  margin-bottom: .3rem;
  color: #111111;
}
.account-box{
  text-align: center;
}
.account-box .number{
  line-height: .48rem;
  height: .48rem;
  font-weight: 600;
  font-size: .34rem;
  color: #333;
}
.account-box .text{
  color: #666;
  font-size: .26rem;
  line-height: .37rem;
}
.account-box .image{
  height: .6rem;
  margin-bottom: .1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-box .image img{
  height: .6rem;
}
.account-box .text-bold{
  color: #333;
  font-size: .26rem;
  line-height: .37rem;
}
.my-list {
  font-size: .28rem;
  font-weight: 400;
  color: #000000;
}
.my-list img{
  height: .3rem;
  margin-right: .16rem;
}
.setting-icon{
    font-size: .34rem;
    margin-right: .12rem;
}
</style>
