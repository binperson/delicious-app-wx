<template>
  <view class="t-main t-container">
    <view class="main-header">
      <view :style="{
        height: `${menuRect.height + 2 * menuRect.top - statusBarHeight}px`,
        paddingTop: `${menuRect.top}px`,
        paddingBottom: `${menuRect.top - statusBarHeight}px!important`,
      }" class="header-content">
        123
      </view>
    </view>
  </view>
</template>
<script>
import { reactive, toRefs } from "vue";
import Taro from "@tarojs/taro";
export default {
  name: "Main",
  components: {},
  setup() {
    const state = reactive({
      menuRect: Taro.getMenuButtonBoundingClientRect(),
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
    });

    return {
      ...toRefs(state)
    }
  }
};
</script>
<style lang="less">
.t-main {
  .main-header {
    // background-color: #ec6a34;
  }
}
</style>
