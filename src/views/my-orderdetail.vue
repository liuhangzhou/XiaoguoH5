<template>
<!-- 待支付订单 -->
  <div class="warper">
    <!-- <div class="details-box "> -->
      <div class="details-zh flexBetween padding10 navBg"><span >下单时间：<i class="colorRgb">2020-12-12 12：30</i></span><span class="colorRgb">$123.3</span></div>
      <ul class="details-item padding10">
        <li class="flex">
          <div class="flex">
            <div class="details-goods-img"></div>
            <div class="details-text">
              <div class="details-text-p1">碳烤牛肉</div>
              <div class="details-text-p2">250ML、热</div>
            </div>
          </div>
          <div>
            <div class="details-monery">$ 12.8</div>
            <div class="details-number">x <span>2</span></div>
          </div>
        </li>
        <li class="flex">
          <div class="flex">
            <div class="details-goods-img"></div>
            <div class="details-text">
              <div class="details-text-p1">烤肉A套餐</div>
              <div class="details-text-p2">牛肉100g+五花肉150g+面包50g</div>
            </div>
          </div>
          <div>
            <div class="details-monery">$ 12.8</div>
            <div class="details-number">x <span>2</span></div>
          </div>
        </li>
        <li class="flex">
          <div class="flex">
            <div class="details-goods-img"></div>
            <div class="details-text">
              <div class="details-text-p1">热咖啡</div>
              <div class="details-text-p2">250ML、热</div>
            </div>
          </div>
          <div>
            <div class="details-monery">$ 12.8</div>
            <div class="details-number">x <span>2</span></div>
          </div>
        </li>
       
      </ul>
      <!-- <div class="details-youhui flex flex-sc flex-vc">
        <div class="details-youhui-text flex flex-vc"><i></i>满减优惠</div>
        <div class="details-youhui-monery">$ -5.00</div>
      </div>
      <div class="total flex flex-sc flex-vc">
        <div class="total-text">合计</div>
        <div class="total-monery">$ 213.40</div>
      </div> -->
    <!-- </div> -->
    <div class="mask" v-if="showMask">
      <div class="dailog">
        <div class="dailog-tit">下单成功</div>
        <div class="dailog-content">
          <div class="dailog-p1">美食正在做准备中，请耐心等待<br><span>如需加菜，继续点餐</span></div>
        </div>
        <div class="dailog-btn" @click="clearMask">确定</div>
      </div>
    </div>
    <div class="xiadan flex flex-vc flex-hc">
      <div class="xiadan-btn-left" @click="toHome">继续点餐</div>
      <div class="xiadan-btn-right" @click="payNow">现在支付</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-order',
  data: () => {
    return {
      showMask: false
    }
  },
  methods: {
    clearMask() {
      this.showMask = false
    },
    toHome() {
      this.$router.push('/home')
    },
    payNow() {
      this.$router.push('/pay')
    }
  }
}
</script>

<style scoped>

</style>
