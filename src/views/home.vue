<template>
  <div class="warper">
    <dining-information />
    <div class="menu">
      <category />
      <list />
    </div>
    <cart />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import diningInformation from '@/components/misc/dining-information'
import category from '@/components/order/category'
import list from '@/components/order/list'
import cart from '@/components/cart'

import { get } from '@/net/http'
import api from '@/net/api'

export default {
  name: 'home',
  components: { diningInformation, category, list, cart },

  mounted() {
    const params = {
      // TODO
      msCode: '10001',
      tableNo: '10',
      token: '',
      lang: 'cn'
    }
    this.queryProductionList(params)
  },

  methods: {
    ...mapActions([
      'setStoreInfo',
      'setList',
      'setCategoryList',
      'setCurrentCategoryId',
      'setStoreCoupons'
    ]),
    async queryProductionList(params) {
      try {
        const { msCode, msName, msLogo, list, storeCoupons } = await get(
          api.queryProductionList,
          params
        )
        this.setStoreInfo({
          msCode,
          msName,
          msLogo
        })
        //
        this.setList(list)
        this.setStoreCoupons(storeCoupons)
        const categoryList = []
        list.forEach((item, index) => {
          const { categoryId, categoryName } = item
          categoryList.push({ categoryId, categoryName })
          index === 0 && this.setCurrentCategoryId(categoryId)
        })
        this.setCategoryList(categoryList)
      } catch (e) {
        console.log('e', e)
      }
    }
  }
}
</script>
