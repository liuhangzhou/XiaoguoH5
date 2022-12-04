<template>
  <div class="warper warper2">
    <navBar :title="$t('home.zhuce')+ '/' + $t('home.denglu')" />
    <div class="container">
      <van-field v-model="registerData.name" :label="$t('nicheng')" :placeholder="$t('qsrnc')" />
      <div class="van-cell van-field">
        <div class="van-cell__title van-field__label">
          {{$t('home.xingbie')}}
        </div>
        <van-radio-group v-model="registerData.sex" direction="horizontal">
          <van-radio checked-color="#FF8F1F" name="1">{{$t('home.nan')}}</van-radio>
          <van-radio checked-color="#FF8F1F" name="2">{{$t('home.nv')}}</van-radio>
        </van-radio-group>
      </div>
    </div>
    <div class="container">
      <van-field v-model="registerData.tel" type="tel" :label="$t('home.shoujihao')" :placeholder="$t('home.txsjh')" />
      <van-field
        v-model="registerData.validateCode"
        center
        clearable
        :label="$t('home.yanzhengma')"
        :placeholder="$t('srdxyzm')"
      >
        <template #button>
          <div class="send-btn" @click="identifyclick" >
            {{ iptValue }}
          </div>
        </template>
      </van-field>
      <van-field v-model="registerData.email" :label="$t('dzyx')" :placeholder="$t('srdzyx')" />
    </div>
    <div class="container">
      <van-field v-model="registerData.password" type="password" :label="$t('home.mima')" :placeholder="$t('home.srmm')" />
      <van-field v-model="registerData.rePassword" type="password" :label="$t('home.qrmm')" :placeholder="$t('home.qrmm')" />
    </div>
    <div class="login-btn center" @click="submit">{{$t('home.tijiao')}}</div>
    <div class="goloign center">
      <span style="color:#000;">{{$t('home.yshy')}}？</span>
      <span @click="gologin">{{$t('home.qudenglu')}}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { post } from '@/net/http'
import api from '@/net/api'

export default {
  name: 'order',
  data(){
    return {
      sexList: [
        {code:'1',name:this.$t('home.nan')},
        {code:'2',name:this.$t('home.nv')},
        ],
      registerData:{
        name:'',
        sex:'1',
        tel:'',
        validateCode:'',
        email:'',
        password:'',
        rePassword:'',
          
        },
      activeIndex : 0,
      iptValue: this.$t('home.hqyzm'),
      verifyCode: "", //验证码
      num: 60,
      alertShow: false,
      alertText: '',
    }
  },
  mounted() {
  },
  methods: {
    async querySendValidateCode(params) {
      try {
        const data = await post(api.querySendValidateCode, params)
        console.log(data,"data")
      } catch (e) {
        console.log('e', e)
      }
    },
    async queryRegister(params) {
      try {
        const data = await post(api.queryRegister, params)
        setTimeout(()=>{
          this.gologin();
        },3000)
        this.$toast(this.$t('home.zccg'));
      } catch (e) {
        this.$toast(e.desc);
        console.log('e', e)
      }
    },
    gologin() {
      this.$router.replace('/login')
    },
    goHome() {
      this.$router.replace('/home')
    },
    handleTap(index) {
        this.activeIndex = index;  // 把当前点击元素的index，赋值给activeIndex
        console.log(index)
        if(this.activeIndex=='1'){
          this.registerData.sex='2'
        }else{
          this.registerData.sex='1'
        }
     },
    // 发送验证码
    identifyclick() {
      // if (this.registerData.tel == "" || this.registerData.tel.length != 11) {
      //   alert("请先输入正确的手机号");
      // } else {
        let data = {
          tel:this.registerData.tel
      }

          this.querySendValidateCode(data)
          this.num--;
          this.iptValue = `${this.$t('home.cxfs')}(${this.num})`;
          let timeID = setInterval(_ => {
            this.num--;
            this.iptValue = `${this.$t('home.cxfs')}(${this.num})`;
            if (this.num === 0) {
              this.iptValue = this.$t('home.hqyzm');
              this.num = 60;
              clearInterval(timeID);
            }
          }, 1000);
    },
    submit(){
      try{
        Object.keys(this.registerData).forEach((key)=>{
        if(this.registerData[key]==''){
          this.alertShow = true;
          this.alertText = $t('home.txwzxx');
          throw new Error('未填写完整')
        }
      })
      } catch(e) {
        console.log(e)
      }
      this.queryRegister(this.registerData)
    }
  }
}
</script>

<style scoped>

.warper{
  min-height: 100vh;
  background: #FAFAFA;
}
.container{
  padding: 0;
}
.send-btn{
  width: 1.6rem;
  height: .5rem;
  line-height: .5rem;
  background: #FF8F1F;
  border-radius: .1rem;
  font-size: .24rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
}
.login-btn{
  width: 7rem;
  height: 1rem;
  background: #FF8F1F;
  border-radius: 8px;
  color: #fff;
  line-height: 1rem;
  padding: 0;
  font-weight: 500;
  font-size: .36rem;
}

</style>
