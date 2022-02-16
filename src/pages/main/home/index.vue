<template>
  <view class="t-home t-container">
    <DeliView>
      <template v-slot:content>
        <Main v-if="active === 0" />
        <My v-if="active === 1" />
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
export default {
  name: "Home",
  components: {
    DeliView,
    DeliTabbar,
    My,
    Main
  },
  setup() {
    const active = ref(0);
    const tabbarArr = [
      {
        title: "首页",
        icon: "icon-shouye",
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
