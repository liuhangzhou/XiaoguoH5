<template>
  <div>
    <div class="container">
      <van-form>
        <van-field readonly clickable :value="gender" :name="$t('yuyan')" :label="$t('yuyan')"
          :placeholder="$t('qingxuanze')" @click="showPicker = true" />
      </van-form>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar :columns="columns" :confirm-button-text="$t('home.queding')"
        :cancel-button-text="$t('home.quxiao')" @confirm="onConfirm" @cancel="showPicker = false" />
    </van-popup>
  </div>
</template>
  
<script>
import { Locale } from 'vant';
// 引入英文语言包
import enUS from 'vant/es/locale/lang/en-US';
import zhCN from 'vant/es/locale/lang/zh-CN';
export default {
  data() {
    return {
      username: '',
      gender: '',
      showPicker: false,
      columns: [this.$t('en'), this.$t('cn')]
    }
  },
  methods: {
    onConfirm(value) {
      this._i18n.locale = value == 'en' ? 'en' : 'zh'
      if (value == 'en') {
        Locale.use('en-US', enUS);
      } else {
        Locale.use('zh-CN', zhCN);
      }
      localStorage.setItem('language', this._i18n.locale)
      this.gender = value;
      this.showPicker = false
    }
  }

}
</script>
  
<style scoped>
.container {
  padding: 0;
}
</style>