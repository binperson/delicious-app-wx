<template>
  <view class="deli-navbar" :style="{ paddingBottom: safeInsetBottom }">
    <nut-tabbar
      @tab-switch="tabSwitch"
      v-model="activeInner"
      active-color="#fc725b"
      :bottom="bottom"
    >
      <nut-tabbar-item
        v-for="(item, index) in tabbarArr"
        :tab-title="item.title"
        :key="index"
      >
        <template v-if="index === active" #icon>
          <IconFont
            :name="`iconfont iconfont ${`${item.icon}-active`}`"
          ></IconFont>
        </template>
        <template v-else #icon>
          <IconFont :name="`iconfont iconfont ${item.icon}`"></IconFont>
        </template>
      </nut-tabbar-item>
    </nut-tabbar>
  </view>
</template>

<script>
import { IconFont } from "@nutui/icons-vue-taro";
import { ref } from "vue";
export default {
  name: "DeliTabbar",
  components: {
    IconFont,
  },
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
    },
  },
  setup(props, { emit }) {
    const tabSwitch = (item, index) => {
      emit("update:active", index);
    };
    const activeInner = ref(props.active)
    const safeInsetBottom = Taro.getStorageSync('safeInsetBottom')
    return {
      tabSwitch,
      activeInner,
      safeInsetBottom
    };
  },
};
</script>
<style lang="less">
.nut-tabbar {
  border-bottom: none !important;

  .iconfont {
    font-family: "iconfont" !important;
  }
}
</style>
