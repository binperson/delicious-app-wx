<template>
  <view class="t-select-tribe t-container">
    <DeliView>
      <template v-slot:header>
        <DeliNavbar title="请选择部落" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <LocalInfo @changeLocation="changeLocation" />
        <scroll-view class="tribe-list-content" :scroll-y="true">
          <TribeInfo :item="item" v-for="item in tribeList" />
        </scroll-view>
      </template>
      <template v-slot:footer> </template>
    </DeliView>
  </view>
  <!-- <nut-address
    v-model:visible="showPopup"
    :province="province"
    :city="city"
    :country="country"
    :town="town"
    @change="onChange"
    @close="close"
    custom-address-title="请选择所在地区"
  ></nut-address> -->
</template>

<script>
import { ref, reactive, toRefs } from "vue";
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import LocalInfo from "./components/LocalInfo.vue";
import TribeInfo from "./components/TribeInfo.vue";
import { back } from "@/utils/index";

export default {
  name: "SelectTribe",
  components: {
    DeliView,
    DeliNavbar,
    LocalInfo,
    TribeInfo,
  },
  setup() {
    const showPopup = ref(false);
    const address = reactive({
      province: [
        { id: 1, name: "北京" },
        { id: 2, name: "广西" },
        { id: 3, name: "江西" },
        { id: 4, name: "四川" },
      ],
      city: [
        { id: 7, name: "朝阳区" },
        { id: 8, name: "崇文区" },
        { id: 9, name: "昌平区" },
        { id: 6, name: "石景山区" },
      ],
      country: [],
      town: [],
    });
    const changeLocation = () => {
      wx.navigateTo({
        url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
      });
    };
    const onChange = (cal) => {
      const name = address[cal.next];
      if (name.length < 1) {
        showPopup.value = false;
      }
      console.log(123, name);
    };
    const close = (val) => {
      console.log(val);
    };
    return {
      back,
      close,
      onChange,
      ...toRefs(address),
      showPopup,
      changeLocation,
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
