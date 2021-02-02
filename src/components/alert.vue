<template>
  <div>
    <div class="mask" v-if="showAlert">
      <div class="dailog">
        <div class="dailog-tit">{{$t('home.tishi')}}</div>
        <div class="dailog-content">
            <div class="dailog-p1">
              {{text}}
            </div>
        </div>
        <div class="dailog-btn" @click="$emit('update:show',false)">{{$t('home.queding')}}</div>
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
  },
  data(){
    return {
      showMask: true
    }
  },
  computed:{
      showAlert(){
          return this.show
      }
  },
}
</script>

<style scoped>

.dailog-p1{
  margin-top: .76rem;
}
</style>
