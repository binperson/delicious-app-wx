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
        fontSize: '16px',
        background: 'transparent',
      }"
      :left-show="leftShow"
      :title="title"
      @on-click-back="back"
    >
    <template #[item]="data" v-for="item in Object.keys(omit($slots, 'default'))">
      <slot :name="item" v-bind="data || {}"></slot>
    </template>
  </nut-navbar>
  </view>
</template>

<script>
import { reactive, toRefs } from "vue";
import Taro from "@tarojs/taro";
import { omit } from 'lodash-es';
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
    return {
      ...toRefs(state),
      omit
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
.t-deli-navbar {
  .nut-navbar__title .title {
    color: #000;
  }

  .nut-navbar {
    padding: 0;
  }
}
</style>
