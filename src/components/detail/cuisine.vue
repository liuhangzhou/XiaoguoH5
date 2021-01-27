<template>
  <div>
    <div
      class="food-select-panel"
      v-for="info in detailInformation.attributeList"
      :key="info.id"
    >
      <div class="food-select-head">{{ info.name }}</div>
      <div class="food-select-content" v-if="info.optionList.length">
        <ul class="flex flex-vc flex-sc">
          <li
            :class="{ current: 1 }"
            v-for="option in info.optionList"
            :key="option.id"
          >
            {{ option.optionName }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'cuisine',
  computed: {
    ...mapGetters(['detailInformation'])
  }
}
</script>

<style scoped></style>
