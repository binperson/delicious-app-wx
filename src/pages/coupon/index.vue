<template>
  <div class="t-coupon t-container">
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="优惠卷" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <template v-if="coupons.length > 0">
          <div v-for="item in coupons" class="content">
            <div class="coupon">
              <div class="coupon-intro">
                <h4>{{ item.name }}</h4>
                <ul class="desc">
                  <li>{{ item.remark }}</li>
                  <!-- <li>限 {{ item.validityEndTime }} 前使用</li> -->
                </ul>
              </div>
              <div class="coupon-value">￥{{ item.faceValue }}</div>
            </div>
          </div>
        </template>
        <div v-else class="empty-wrap">
          <nut-empty
            :description="`暂无优惠卷`"
          ></nut-empty>
        </div>
      </template>
    </DeliView>
  </div>
</template>
<script>
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import { back } from "@/utils/index";
import { getMemberCoupon } from "@/api/coupon";
import { ref } from "vue";
export default {
  components: {
    DeliView,
    DeliNavbar,
  },
  setup() {
    const coupons = ref([]);
    const getCoupon = () => {
      getMemberCoupon({ smsCouponUse: {}, status: 0 }).then((res) => {
        coupons.value = res.result;
      });
    };
    getCoupon();
    return {
      back,
      coupons,
    };
  },
};
</script>
<style lang="less">
.t-coupon {
  .content {
    padding: 7px 12px 0 12px;
  }

  .coupon {
    margin-bottom: 4px;
    display: flex;
    align-items: stretch;
    justify-content: stretch;

    > div {
      padding: 9px 9px;
      border-radius: 12px;
    }

    .coupon-intro {
      position: relative;
      background: #fff;
      flex: 3;

      ul {
        color: #aaa;
        margin-top: 6px;
      }

      &:after {
        content: " ";
        border: 2px dashed #eee;
        height: 100%;
        position: absolute;
        top: 0;
        right: -2px;
        z-index: 2;
      }
    }

    .coupon-value {
      display: flex;
      flex: 1;
      position: relative;
      background: #efac37;
      color: #fff;
      font-size: 38px;
      align-items: center;
      justify-content: center;
      padding: 9px 2px;

      &:before {
        content: " ";
        width: 12px;
        height: 12px;
        position: absolute;
        top: -6px;
        left: -6px;
        border-radius: 100%;
        background: #eee;
      }
      &:after {
        content: " ";
        width: 12px;
        height: 12px;
        position: absolute;
        bottom: -3px;
        left: -6px;
        border-radius: 100%;
        background: #eee;
      }
    }
  }
}
</style>
