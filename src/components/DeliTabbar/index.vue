<template>
  <view class="deli-navbar">
    <nut-tabbar
      @tab-switch="tabSwitch"
      :visible="active"
      active-color="#fc725b"
      :bottom="bottom"
    >
      <nut-tabbar-item
        v-for="(item, index) in tabbarArr"
        :tab-title="item.title"
        :icon="
          `iconfont iconfont ${
            index === active ? `${item.icon}-active` : item.icon
          }`
        "
      ></nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script>
export default {
  name: "DeliTabbar",
  components: {},
  props: {
    bottom: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Number,
      default: 0,
    },
    tabbarArr: {
      type: Array,
      default: [],
    }
  },
  setup(_, { emit }) {
    const tabSwitch = (item, index) => {
      emit("update:active", index);
    };
    return {
      tabSwitch
    };
  },
};
</script>
<style lang="less">
.nut-tabbar {
  border-bottom: none !important;
}
</style>