import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    storeInfo: {
      msCode: '',
      msLogo: '',
      msName: ''
    },
    list: [],
    storeCoupons: [],
    categoryList: [],
    currentCategoryId: '', // 当前类目
    detailInformation: {
      attributeList: [],
      imgList: []
    }, // 详情页信息
    cartProduct: []
  },
  mutations: {
    SET_STORE_INFO: (state, payload) =>
      (state.storeInfo = { ...state.storeInfo, ...payload }),
    SET_LIST: (state, payload) => (state.list = payload),
    SET_COUPONS: (state, payload) => (state.storeCoupons = payload),
    SET_CATEGORY_LIST: (state, payload) => (state.categoryList = payload),
    SET_CURRENT_CATEGORY_ID: (state, payload) =>
      (state.currentCategoryId = payload),
    SET_DETAIL_INFORMATION: (state, payload) =>
      (state.detailInformation = payload),
    SET_STORE_CART_PRODUCT: (state, payload) => (state.cartProduct = payload)
  },
  actions: {
    setStoreInfo: ({ commit }, payload) => commit('SET_STORE_INFO', payload),
    setList: ({ commit }, payload) => commit('SET_LIST', payload),
    setStoreCoupons: ({ commit }, payload) => commit('SET_COUPONS', payload),
    setCategoryList: ({ commit }, payload) =>
      commit('SET_CATEGORY_LIST', payload),
    setCurrentCategoryId: ({ commit }, payload) =>
      commit('SET_CURRENT_CATEGORY_ID', payload),
    setDetailInformation: ({ commit }, payload) =>
      commit('SET_DETAIL_INFORMATION', payload),
    setCatProduct: ({ commit }, payload) =>
      commit('SET_STORE_CART_PRODUCT', payload)
  },
  getters: {
    storeInfo: (state) => state.storeInfo,
    list: (state) => state.list,
    storeCoupons: (state) => state.storeCoupons,
    categoryList: (state) => state.categoryList,
    currentCategoryId: (state) =>
      state.currentCategoryId === ''
        ? state.categoryList[0].categoryId
        : state.currentCategoryId,
    detailInformation: (state) => state.detailInformation,
    cartProduct: (state) => state.cartProduct
  }
})
