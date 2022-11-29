<template>
  <div class="warper warper2">
    <div class="details-box2">
      <div class="details-zh between" >
        <span style="margin:0 auto" >{{$t('home.zhuce')}}/{{$t('home.denglu')}}</span>
        </div>
    </div>
    <div class="cont cont2">
      <p><span>{{$t('home.xingming')}}/{{$t('home.chenghu')}}</span><input type="text" v-model="registerData.name" :placeholder="$t('home.dhsr')"></p>
      <p><span>{{$t('home.xingbie')}}</span>
      <span class="toborder" style="width:1.58rem;text-align:center;color: #1890FF;border: 1px solid  rgb(0, 118, 255);" :class="activeIndex == index ? 'active' : ''" 
        v-for="(item,index) in sexList" 
        :key="index" 
        @click="handleTap(index)">
        {{item.name}}
        </span></p>
      <p><span>{{$t('home.shoujihao')}}</span><input type="text"  v-model="registerData.tel" :placeholder="$t('home.dhsr') "></p>
      <p><span>{{$t('home.yanzhengma')}}</span>
      <input type="text"  v-model="registerData.validateCode" style="width:30%;margin-right:.2rem">
      <span class="colorWhite"  @click="identifyclick" style="color:#666;font-size:.24rem;">{{ iptValue }}</span>
      </p>
      <p><span>{{$t('home.youxiang')}}</span><input type="text"  v-model="registerData.email" :placeholder="$t('home.dhsr') "></p>
      <p><span>{{$t('home.mima')}}</span><input type="password" v-model="registerData.password"  :placeholder="$t('home.dhsr') "></p>
      <p><span>{{$t('home.qrmm')}}</span><input type="password" v-model="registerData.rePassword"  :placeholder="$t('home.dhsr') "></p>
    </div>
    <p class=" center center2"  >
    <span class="radius10 color000 bcgWhite" style="background:#fff;border:1px solid #5b6b73;" @click="goHome"> {{$t('home.quxiao')}}</span><span class="radius10" @click="submit" style="background-color: rgb(242, 133, 18);"> {{$t('home.tijiao')}}</span></p>
    <div class="goloign center">
      <span style="color:#000;">{{$t('home.yshy')}}？</span>
      <span class="radius10" @click="gologin">{{$t('home.qudenglu')}}</span>
    </div>
    <alert :show.sync="alertShow" :text="alertText" :comfirm="changeAlertShow"/>
  
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
    changeAlertShow() {
      this.alertShow = false;
    },
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
        this.alertShow = true;
        this.alertText = $t('home.zccg');
      } catch (e) {
        console.log('e', e)
        this.alertShow = true;
        this.alertText = e.desc;
      }
    },
    gologin() {
      this.$router.push('/login')
    },
    goHome() {
      this.$router.push('/home')
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

</style>
