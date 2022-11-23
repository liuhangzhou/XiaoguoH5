<template>
  <div v-if="isShowTabbarBol">
    <van-tabbar route active-color="#FF8F1F" inactive-color="#999999" safe-area-inset-top=true>
      <van-tabbar-item replace to="/home">
        <span>{{ $t('home.shouye') }}</span>
        <template #icon="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/orderdetail" :badge="orderList.length">
        <span>{{ $t('home.dingdan') }}</span>
        <template #icon="props">
          <img :src="props.active ? orderIcon.active : orderIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/myCenter">
        <span>{{ $t('home.wode') }}</span>
        <template #icon="props">
          <img :src="props.active ? myIcon.active : myIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import api from '@/net/api'
import { get } from '@/net/http'
export default {
  props: {
  },
  watch: {
    $route(to, from) {
      console.log(this.excludeShowTab, to.name)
      if(this.excludeShowTab.indexOf(to.name) > -1) {
        this.isShowTabbarBol = false;
      }else{
        this.isShowTabbarBol = true;
      }
    },
  },
  
  data() {
    return {
      homeIcon: {
        active: require('../../assets/img/home-active.png'),
        inactive: require('../../assets/img/home.png'),
      },
      orderIcon: {
        active: require('../../assets/img/order-active.png'),
        inactive: require('../../assets/img/order.png'),
      },
      myIcon: {
        active: require('../../assets/img/my-active.png'),
        inactive: require('../../assets/img/my.png'),
      },
      orderCount: 0,
      isShowTabbarBol: true,
      excludeShowTab: [
        'selectnum'
      ],
      orderList: [],
    }
  },
  created() {
    this.getOrderList();
  },
  methods: {
    async getOrderList() {
      let data = {
        msCode: '10001',// 公共参数
        tableNo: '10',
        lang: 'cn',
        status: 'waiting_pay'
      }
      get(api.queryOrderList,data).then(res=> {
        res.list.forEach(element => {
          element.productList.forEach(attr=>{
            attr.attribute = attr.attribute ? JSON.parse(attr.attribute) : [];
          })
        });
        this.orderList = res.list;
      })
    },
  },
}
</script>
  
  
<style>
.van-tabbar-item__icon img {
  height: .5rem;
}
</style>
  