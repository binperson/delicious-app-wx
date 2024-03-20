<template>
  <view class="t-home t-container">
    <DeliView>
      <template v-slot:content>
        <Index v-if="active === 0" />
        <Main v-if="active === 2" />
        <DeliOrder v-if="active === 3" />
        <My v-if="active === 4" />
      </template>
      <template v-slot:footer>
        <DeliTabbar v-model:active="active" :tabbarArr="tabbarArr" />
      </template>
    </DeliView>
  </view>
</template>

<script>
import { ref } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliTabbar from "@/components/DeliTabbar/index.vue";
import My from "./components/My/index";
import Main from "./components/Main/index";
import Index from "./components/Index/index";
import DeliOrder from "@/components/DeliOrder/index.vue";
import Taro from "@tarojs/taro";
export default {
  name: "Home",
  components: {
    DeliView,
    DeliTabbar,
    My,
    Main,
    Index,
    DeliOrder,
  },
  setup() {
    const instance = Taro.getCurrentInstance();
    const active = ref(Number(instance.router.params.active || 0));
    const tabbarArr = [
      {
        title: "首页",
        icon: "icon-shouye",
      },
      {
        title: "点单",
        icon: "icon-diancan",
      },
      {
        title: "活动",
        icon: "icon-huodong",
      },
      {
        title: "取餐",
        icon: "icon-qucan",
      },
      {
        title: "我的",
        icon: "icon-wode",
      },
    ];
    return {
      active,
      tabbarArr,
    };
  },
};
</script>

<style lang="less"></style>
