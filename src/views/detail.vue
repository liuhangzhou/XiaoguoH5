<template>
  <div class="warper">
    <div class="food-main">
      <Kv />
      <template v-if="detailInformation.attributeList.length">
        <div class="food-select-wrapper">
          <div
            class="food-select-panel"
            v-for="info in detailInformation.attributeList"
            :key="info.id"
          >
            <div class="food-select-head">{{ info.name }}</div>
            <div class="food-select-content" v-if="info.optionList.length">
              <ul class="flex flex-vc">
                <li
                  v-for="option in info.optionList"
                  :key="option.id"
                  :class="{isDisabled: option.isDisabled,current: option.isSelected }"
                  @click="selectProduct(info, option)"
                >
                  {{ option.optionName }} <span v-if="option.optionPrice">+ {{ option.optionPrice }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <div class="settlement">
        <div class="settlement-zd">
          <div class="settlement-bg flex">
            <div class="settlement-monery">$ {{ amount }}</div>
            <div class="settlement-btn" @click="addInCart()">{{$t("home.jiarugouwuche")}}</div>
          </div>
        </div>
      </div>
    </div>
    <toast v-if="alertShow" :show.sync="alertShow" :text="alertText" />
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
    '$store.state.detailInformation': {
      handler(val) {
        val.attributeList.forEach(attr=> {
          let count = 0;
          attr.optionList.forEach(option=>{
            if (option.isSelected) {
              count = count + 1
            }
          })
          if(attr.leastChoose > 1 && count == attr.leastChoose) {
            attr.optionList.forEach(option=>{
              if(!option.isSelected) {
                option.isDisabled = true;
              }
            })
          }
        })
      },
      deep: true

    }
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
            option.isDisabled = false
            if (mustChoose || leastChoose > 0) {
              if (optionList.indexOf(option) < leastChoose) {
                this.amount = (Number(this.amount) + Number(option.optionPrice)).toFixed(2);
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
      if(optionBean.isDisabled) {
        this.showAlert1(attribute.name,attribute.leastChoose)
      }
      const { isSelected } = optionBean
      var count = 0
      var leastChoose = attribute.leastChoose
      const { optionList = [] } = attribute
      if(optionList.length == leastChoose) {
        this.showAlert(leastChoose)
        return false;
      }
      optionList.forEach((option) => {
        option.isDisabled = false;
        if (option.isSelected) {
          count = count + 1
        }
      })
      // 单选
      if(leastChoose == 1 && count == leastChoose) {
        attribute.optionList.forEach(attr=>{
          if(attr.isSelected) {
            this.amount = ((Math.round(this.amount*100) - Math.round(attr.optionPrice*100))/100).toFixed(2)
          }
          attr.isSelected = false;
        })
      }
      // 多选
      if(leastChoose > 1 && count == leastChoose && !isSelected) {
        return false;
      }


      if (isSelected) {
        if (leastChoose == 1 ){
          this.amount = ((Math.round(this.amount*100) + Math.round(optionBean.optionPrice*100))/100).toFixed(2) 
          this.showAlert(leastChoose)
          this.$set(optionBean, 'isSelected', true)
        }else {
          this.$set(optionBean, 'isSelected', false)
          this.amount = ((Math.round(this.amount*100) - Math.round(optionBean.optionPrice*100))/100).toFixed(2) 
        }
      } else {
        this.$set(optionBean, 'isSelected', true)
        this.amount = ((Math.round(this.amount*100) + Math.round(optionBean.optionPrice*100))/100).toFixed(2) 
      }
      
    },
    showAlert(leastChoose){
      this.alertShow = true;
      this.alertText = this.$t('home.zsxz') + leastChoose + this.$t('home.xiang');
    },
    showAlert1(attr,number){
      this.alertShow = true;
      this.alertText = attr + this.$t('home.znxz') + number + this.$t('home.xiang');
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

<style scoped>

.settlement-btn {
  width: 2.34rem;
}

.food-main {
  padding-bottom: .8rem;
}

.food-select-head {
  width: 100%;
  position: relative;
  color: #999;
  font-size: .28rem;
}

.food-select-content ul {
  flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  padding: .25rem 0 .04rem;
}

.food-select-content li {
  height: .64rem;
  line-height: .64rem;
  border-radius: 6px;
  color: #333;
  font-size: .28rem;
  text-align: center;
  margin-bottom: .16rem;
  background: #f5f5f5;
  padding: 0 .2rem;
  margin-right: .2rem;
}

.food-select-content.tea li {
  min-width: 1.68rem;
}

.food-select-content li.current {
  background: #FFEFDF;
  color: #FF8F1F;
}
.food-select-content li.isDisabled {
  background-color: #E4E7ED;
  border: 1px solid #E4E7ED;
}
.food-select-content li span {
  color: #F93A4A;
}
.food-main .settlement-monery {
  font-weight: 500;
  color: #FFFFFF;
  font-size: .38rem;
  line-height: 1rem;
  padding-left: .4rem;
}

.settlement-btn {
  width: 2.34rem;
}

.settlement-zd {
  height: 1.4rem;
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding:0 .24rem;
}
.settlement-bg {
  margin-top: .08rem;
  position: relative;
  height: 1rem;
  background: #333333;
  border-radius: .5rem;
  overflow: hidden;
}
.settlement-btn {
  width: 2.4rem;
  height: .76rem;
  margin-top: .11rem;
  border-radius: .49rem;
  background-color: rgba(247, 133, 14, 100);
  color: rgba(251, 250, 250, 100);
  font-size: .34rem;
  line-height: .78rem;
  text-align: center;
  position: absolute;
  top: 0;
  right: 0.13rem;
  font-weight: 500;
}
.settlement {
  width: 100%;
  background: rgba(251, 250, 250, 100);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
  border-radius: 16px 16px 0px 0px;
  overflow: hidden;
}
.food-select-wrapper{
  padding: 0 .25rem 1.4rem;
}
.food-select-panel{
  padding-top: .45rem;
}

</style>
