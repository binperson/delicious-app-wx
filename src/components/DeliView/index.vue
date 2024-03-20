<template>
  <view :class="paddingBottom ? 't-deli-view padding-bottom' : 't-deli-view'">
    <slot name="header"> </slot>
    <view class="deli-view-content">
      <slot name="content"> </slot>
    </view>
    <slot name="footer"> </slot>
  </view>
</template>

<script>
export default {
  name: "Index",
  components: {},
  props: {
    paddingBottom: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
  },
};
</script>

<style lang="less">
@import '../../common.less';
.t-deli-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  // &.padding-bottom {
  //   padding-bottom: constant(safe-area-inset-bottom);
  //   padding-bottom: env(safe-area-inset-bottom);
  // }

  .deli-view-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    flex: 1;
    overflow: hidden;
    background: @default-bg-color;
  }
}
</style>
