<template>
  <view class="t-deli-navbar">
    <nut-navbar
      :style="{
        height: `${menuRect.height}px`,
        paddingTop: `0`,
        paddingBottom: `0`,
        marginTop: `${menuRect.top}px`,
        marginBottom: `${menuRect.top - statusBarHeight}px!important`,
        boxShadow: 'none!important',
        color: '#000000',
        fontSize: '16px',
        background: 'transparent',
      }"
      :left-show="leftShow"
      :title="title"
      @on-click-back="back"
    ></nut-navbar>
  </view>
</template>

<script>
import { reactive, toRefs } from "vue";
import Taro from "@tarojs/taro";
export default {
  name: "DeliNavbar",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    leftShow: {
      type: Boolean,
      default: false,
    },
    back: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const state = reactive({
      menuRect: Taro.getMenuButtonBoundingClientRect(),
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
    });
    console.log(123, props)
    return {
      ...toRefs(state),
    };
  },
};
</script>
<style lang="less">
.nut-navbar__left {
  padding-left: 6px;

  text {
    color: #000 !important;
  }
}
</style>
