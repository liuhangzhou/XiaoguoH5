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
                :class="{ disabled: isDisabled ,current: option.isSelected }"
                @click="selectProduct(info, option)"
              >
                {{ option.optionName }} <span v-if="option.optionPrice">+ {{ option.optionPrice }}</span>
              </li>
            </ul>
          </div>
        </div>
      </template>

      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-monery">$ {{ amount }}</div>
          <div class="settlement-btn" @click="addInCart()">{{$t("home.jiarugouwuche")}}</div>
        </div>
      </div>
    </div>
    <alert :show.sync="alertShow" :text="alertText" />
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
      amount: 0.0,
      alertShow: false,
      alertText: null,
      
    }
  },
  components: { Kv },
  computed: {
    ...mapGetters(['detailInformation']),
    isDisabled() {
      this.detailInformation.attributeList.forEach(attr=> {
        if(attr.leastChoose > 1 && attr.count == attr.leastChoose && !attr.isSelected) {
          console.log(attr,'未选择')
          return false;
        }
      })
      
    }
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
  watch: {
    // 当选项改变的时候监听变化，使是否不可点击
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
          attribute.count = leastChoose;
          optionList.forEach((option) => {
            option.isSelected = false
            option.isDisabled = false
            if (mustChoose || leastChoose > 0) {
              if (optionList.indexOf(option) < leastChoose) {
                this.amount = Number(this.amount) + Number(option.optionPrice);
                option.isSelected = true
              }
            }
          })
        })
        this.setDetailInformation(data)
        this.thisObject = data
      } catch (e) {
        console.log('e', e)
      }
    },
    selectProduct(attribute, optionBean) {
      const { isSelected } = optionBean
      var count = 0
      var leastChoose = attribute.leastChoose
      const { optionList = [] } = attribute
      if(optionList.length == leastChoose) {
        this.showAlert(leastChoose)
        return false;
      }
      optionList.forEach((option) => {
        if (option.isSelected) {
          count = count + 1
        }
      })
      attribute.count = count;
      // 单选
      if(leastChoose == 1) {
        if (leastChoose > 0 && count == leastChoose) {
          attribute.optionList.forEach(attr=>{
            attr.isSelected = false;
          })
        }
      }
      // 多选
      if(leastChoose > 1 && count == leastChoose && !isSelected) {
        return false;
      }

      if (isSelected) {
        if (leastChoose == 1 ){
          this.showAlert(leastChoose)
          this.$set(optionBean, 'isSelected', true)
        }else {
          this.$set(optionBean, 'isSelected', false)
          this.amount = (Math.round(this.amount*100) - Math.round(optionBean.optionPrice*100))/100 
        }
      } else {
        this.$set(optionBean, 'isSelected', true)
        this.amount = (Math.round(this.amount*100) + Math.round(optionBean.optionPrice*100))/100 
      }
      
    },
    showAlert(leastChoose){
      this.alertShow = true;
      this.alertText = this.$t('home.zsxz') + leastChoose + this.$t('home.xiang');
    },

    addInCart() {
      this.productList = JSON.parse(JSON.stringify(this.thisObject));
      let isOk = true;
      this.productList.attributeList.forEach(attribute=> {
        // delete attribute.leastChoose
        // delete attribute.mustChoose
        let attributeLength = 0;
        for(let n=0;n<attribute.optionList.length;n++) {
          if(!attribute.optionList[n].isSelected) {
            attribute.optionList[n] = undefined
          }else{
            attributeLength++;
            delete attribute.optionList[n].attributeId
            delete attribute.optionList[n].isSelected
          }
        }
        if(attribute.leastChoose !== attributeLength && attribute.leastChoose != 0) {
          this.alertShow = true;
          this.alertText = '[' + attribute.name + ']' + this.$t('home.bxxz') + attribute.leastChoose + this.$t('home.xiang');
          isOk = false;
          return false;
        }
      })
      // this.thisObject.attributeList.forEach(attribute=> {
      //   attribute.optionList.forEach(option=> {
      //     if(option.isSelected) {
      //       this.productList.attributeList.push(option)
      //     }
      //   })
      // })
      if(isOk) {
        this.$router.push({ path: '/home', query: { 'productList': JSON.stringify(this.productList) } })
      }
    }
  }
}
</script>

<style scoped></style>
