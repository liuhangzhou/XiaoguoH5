<template>
  <div class="warper">
    <div class="food-main">
      <Kv />

      <template v-if="detailInformation.attributeList.length">
        <div
          class="food-select-panel"
          v-for="info in detailInformation.attributeList"
          :key="info.id"
        >
          <div class="food-select-head">{{ info.name }}</div>
          <div class="food-select-content" v-if="info.optionList.length">
            <ul class="flex flex-vc flex-sc">
              <li
                v-for="option in info.optionList"
                :key="option.id"
                :class="{ current: option.isSelected }"
                @click="selectProduct(info, option)"
              >
                {{ option.optionName }} <span v-if="option.optionPrice"></span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-monery">$ {{ amount }}</div>
          <div class="settlement-btn" @click="addInCart()">加入购物车</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Kv from '@/components/detail/kv'
import { get } from '@/net/http'
import api from '@/net/api'
export default {
  name: 'detail',
  data() {
    return {
      productList: {
        productId: this.$route.query.productId, //	商品id
        selectedNum: '1', //detail.vue	已选数量
        attributeList: [] //	已选规格json
      },
      attributeList: [],
      thisObject: {
        productId: this.$route.query.productId,
        selectedNum: 1,
        attributeList: []
      },
      amount: 0.0
    }
  },
  components: { Kv },
  computed: {
    ...mapGetters(['detailInformation'])
  },
  mounted() {
    const { productId } = this.$route.query
    const params = {
      // TODO
      msCode: '10001',
      tableNo: '10',
      token: '',
      lang: 'cn',
      productId
    }
    this.queryProductionDetail(params)
  },
  methods: {
    ...mapActions(['setDetailInformation']),
    async queryProductionDetail(params) {
      try {
        const data = await get(api.queryProductionDetail, params)
        const { activePrice = Float32Array } = data
        this.amount = activePrice
        const { attributeList = [] } = data
        attributeList.forEach((attribute) => {
          const { mustChoose = Boolean } = attribute
          const { leastChoose = Number } = attribute
          const { optionList = [] } = attribute
          optionList.forEach((option) => {
            option.isSelected = false
            if (mustChoose || leastChoose > 0) {
              if (optionList.indexOf(option) < leastChoose) {
                option.isSelected = true
              }
            }
          })
        })
        this.setDetailInformation(data)
        this.thisObject = data;
      } catch (e) {
        console.log('e', e)
      }
    },
    selectProduct(attribute, optionBean) {
      const { isSelected } = optionBean
      var count = 0
      var leastChoose = attribute.leastChoose
      const { optionList = [] } = attribute
      optionList.forEach((option) => {
        if (option.isSelected) {
          count = count + 1
        }
      })
      if (isSelected) {
        if (leastChoose > 0 && count == leastChoose) {
          alert('最少选择' + leastChoose + '项')
        } else {
          this.$set(optionBean, 'isSelected', false)
        }
      } else {
        this.$set(optionBean, 'isSelected', true)
      }
      var addition = 0.0
      optionList.forEach((option) => {
        if (option.isSelected) {
          addition = addition + option.optionPrice
        }
      })
      this.amount = this.amount + addition
    },

    addInCart() {
      this.thisObject.attributeList.forEach(attribute=> {
        attribute.optionList.forEach(option=> {
          if(option.isSelected) {
            this.productList.attributeList.push(option)
          }
        })
      })
      this.$router.push({ path: '/home', query: { 'productList': JSON.stringify(this.productList) } })
    }
  }
}
</script>

<style scoped></style>
