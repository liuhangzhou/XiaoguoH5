<!--
 * @Author: 江辉 jianghui@yit.com
 * @Date: 2021-02-06 21:49:08
 * @LastEditors: 江辉 jianghui@yit.com
 * @LastEditTime: 2022-11-20 23:16:26
 * @FilePath: /XiaoguoH5/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div  style="padding-bottom: 50px;position:relative;">
      <router-view/>
    </div>
    <tabbar />
  </div>
</template>
<script>
import tabbar from '@/components/tabbar/tabbar.vue'
export default {
  components: { tabbar },
}
</script>
<style>
@import "assets/css/public.css";
@import "assets/css/index.css";
</style>
