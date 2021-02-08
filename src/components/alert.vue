<template>
  <div>
    <div class="mask" v-if="showAlert">
      <div class="dailog">
        <div class="dailog-content">
            <div class="dailog-p1">
              {{text}}
            </div>
        </div>
        <div class="dailog-btn-wrapper flex">
          <div class="dailog-btn" @click="$emit('update:show',false)">{{$t('home.fanhui')}}</div>
          <div class="dailog-btn" @click="comfirm" >{{$t('home.queding')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert',
  props: {
      show: Boolean,
      text: String,
      comfirm: Function
  },
  created(){
    console.log(this.$props)
  },
  computed:{
      showAlert(){
          return this.show
      }
  }
}
</script>

<style scoped>

.dailog-p1{
  margin-top: .76rem;
}

.dailog {
  width: 6.4rem;
  height: 2.2rem;
  background: #fff;
  overflow: hidden;
  border-radius: .2rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  text-align: center;
}

.dailog-tit {
  color: rgba(16, 16, 16, 100);
  font-size: .4rem;
  font-weight: 700;
  line-height: .56rem;
  margin-top: .38rem;
}

.dailog-p1 {
  color: rgba(16, 16, 16, 100);
  font-size: .36rem;
  line-height: .6rem;
  margin-top: .3rem;
}

.dailog-p1 span {
  color: rgba(16, 16, 16, .5);
}

.dailog-btn-wrapper {
  height: 1rem;
  color: #FF8F1F;
  font-size: .34rem;
  line-height: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #e5e5e5;
}

.dailog-btn{
  width: 50%;
  border-right: 1px solid #e5e5e5;
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .5);
  z-index: 999;
}
</style>
