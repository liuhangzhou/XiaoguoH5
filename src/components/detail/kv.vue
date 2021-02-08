<template>
  <div class="food-swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper" v-if="detailInformation.imgList.length">
        <Swiper :options="swiperOption">
          <Swiper-slide v-for="(img, index) in detailInformation.imgList" :key="index">
            <div class="swiper-slide">
              <img :src="img" alt="">
            </div>
          </Swiper-slide>
        </Swiper>
      </div>
    </div>
    <div class="food-info">{{ detailInformation.productName }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import '@/assets/css/swiper.min.css'

export default {
  name: 'kv',
  components: { Swiper, SwiperSlide },
  data: () => {
    return {
      swiperOption: {
        autoplay: 2000,
        speed: 1000,
        loop: true
      }
    }
  },
  computed: {
    ...mapGetters(['detailInformation'])
  }
}
</script>

<style scoped>
.food-swiper {
  width: 100%;
}

.swiper-container {
  width: 100%;
}
.food-info {
  font-size: .36rem;
  line-height: .42rem;
  padding: .4rem .25rem 0;
  font-weight: 600;
  color: #111111;
}
</style>
