<template>
  <view class="t-select-tribe t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar title="请选择部落" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <LocalInfo />
        <scroll-view class="tribe-list-content" :scroll-y="true">
          <TribeInfo :item="item" v-for="item in tribeList" />
        </scroll-view>
      </template>
      <template v-slot:footer> </template>
    </DeliView>
  </view>
</template>

<script>
import { ref } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import LocalInfo from "./components/LocalInfo.vue";
import TribeInfo from "./components/TribeInfo.vue";

export default {
  name: "Home",
  components: {
    DeliView,
    DeliNavbar,
    LocalInfo,
    TribeInfo,
  },
  setup() {
    return {
      tribeList: [
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
      ],
    };
  },
};
</script>

<style lang="less">
.tribe-list-content {
  flex: 1;
  overflow: hidden;
}
</style>
