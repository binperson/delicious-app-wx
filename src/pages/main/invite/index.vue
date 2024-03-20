<template>
  <view class="t-invite t-container">
    <div
      @click="
        () => {
          showInfo = true;
        }
      "
      class="rule"
    >
      规则
    </div>
    <nut-popup
      pop-class="pop-class"
      :style="{ padding: '36px 20px' }"
      v-model:visible="showInfo"
      :z-index="100"
      closeable
    >
      积分规则：新人获得一张3元优惠卷，邀请1-2人，每次获得1元；邀请3-5人，每次获得3元；邀请6人以上，每次获得5元；被邀请人每次下单，可获取100积分；
    </nut-popup>
    <DeliView :paddingBottom="false">
      <template v-slot:header>
        <DeliNavbar title="邀请有礼" :leftShow="true" :back="back" />
      </template>
      <template v-slot:content>
        <scroll-view class="invite-content" :scroll-y="true">
          <view class="content">
            <div class="invite-wrapper">
              <div class="invite-bg">
                <view class="countdown-wrap">
                  <nut-countdown v-model="resetTime" :endTime="new Date(end)">
                    <div class="countdown-part-box">
                      <span class="part-item">{{ resetTime.d }}</span>
                      <div class="part-item-symbol">天</div>
                      <div class="part-item h">{{ resetTime.h }}</div>
                      <span class="part-item-symbol">:</span>
                      <div class="part-item m">{{ resetTime.m }}</div>
                      <span class="part-item-symbol">:</span>
                      <div class="part-item s">{{ resetTime.s }}</div>
                      <span class="part-item-symbol">后结束</span>
                    </div>
                  </nut-countdown>
                </view>
                <div class="award-wrap">
                  <div class="award-list">
                    <div class="award-item">
                      <view class="top"> 1-2人 </view>
                      <view class="bottom">
                        <view class="prev"> ¥ </view>
                        <view class="num">1</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                    <div class="award-item">
                      <view class="top"> 3-5人 </view>
                      <view class="bottom">
                        <view class="prev"> ¥ </view>
                        <view class="num">3</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                    <div class="award-item">
                      <view class="top"> 6人以上 </view>
                      <view class="bottom">
                        <view class="prev"> ¥ </view>
                        <view class="num">5</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                  </div>
                </div>
                <div class="tip-wrap">
                  <view class="tip"> 好友下单每次赠送100积分 </view>
                </div>
                <div class="do-invite-wrap">
                  <div class="do-invite">
                    <IconFont
                      color="#E6552E"
                      name="iconfont iconfont icon-weixin"
                      size="24"
                    ></IconFont>
                    <view class="tt">立即邀请微信好友</view>
                  </div>

                  <button open-type="share"></button>
                </div>
              </div>
              <div class="has-invite">
                <nut-tabs v-model="hasInvite">
                  <nut-tab-pane title="未邀请成功">
                    <div
                      v-if="hasInvite === '0' && noInviteSuccessList.length > 0"
                      class="invite-list"
                    >
                      <InviteItem
                        :info="item"
                        v-for="item in noInviteSuccessList"
                      />
                    </div>
                    <InviteEmpty v-else desc="暂无邀请好友，快去邀请好友吧" />
                  </nut-tab-pane>
                  <nut-tab-pane title="已邀请成功">
                    <div
                      v-if="
                        hasInvite === '1' && hasInviteSuccessList.length > 0
                      "
                      class="invite-list"
                    >
                      <InviteItem
                        :info="item"
                        v-for="item in hasInviteSuccessList"
                      />
                    </div>
                    <InviteEmpty
                      v-else
                      desc="暂无邀请成功好友，快去邀请好友吧"
                    />
                  </nut-tab-pane>
                </nut-tabs>
              </div>
              <div class="has-invite discount-coupon">
                <nut-tabs v-model="hasReel">
                  <nut-tab-pane title="已获得优惠卷">
                    <div v-if="couponList.length > 0" class="coupon-list">
                      <CouponIntegral :info="item" v-for="item in couponList" />
                    </div>
                    <InviteEmpty v-else desc="暂无优惠券，快去邀请好友吧" />
                  </nut-tab-pane>
                  <nut-tab-pane title="已获得积分">
                    <div v-if="memberPoints.length > 0" class="integral-list">
                      <CouponIntegral
                        :info="item"
                        v-for="item in memberPoints"
                      />
                    </div>
                    <InviteEmpty v-else desc="暂无积分，快去邀请好友吧" />
                  </nut-tab-pane>
                </nut-tabs>
              </div>
              <div class="footer">
                <div class="footer-img"></div>
              </div>
            </div>
          </view>
        </scroll-view>
      </template>
      <template v-slot:footer> </template>
    </DeliView>
  </view>
</template>

<script>
import DeliView from "@/components/DeliView/index.vue";
import DeliNavbar from "@/components/DeliNavbar/index.vue";
import InviteItem from "./components/InviteItem.vue";
import CouponIntegral from "./components/CouponIntegral.vue";
import { back } from "@/utils/index";
import { reactive, ref, toRefs } from "vue";
import InviteEmpty from "./components/InviteEmpty.vue";
import { useShareTimeline, useShareAppMessage } from "@tarojs/taro";
import { getInviteList, getMemberPointsPage } from "@/api/member";
import { getMemberCoupon } from "@/api/coupon";
import Taro from "@tarojs/taro";
import { IconFont } from "@nutui/icons-vue-taro";

export default {
  name: "Invite",
  components: {
    DeliView,
    DeliNavbar,
    InviteEmpty,
    InviteItem,
    CouponIntegral,
    IconFont,
  },
  setup() {
    const state = reactive({
      end: Date.now() + 50 * 1000,
      resetTime: {
        d: "1",
        h: "00",
        m: "00",
        s: "00",
      },
    });

    const hasInvite = ref("0");
    const hasReel = ref("0");
    const showInfo = ref(false);
    const noInviteSuccessList = ref([1, 2, 3]);
    const hasInviteSuccessList = ref([]);
    const memberPoints = ref([]);
    const couponList = ref([
      {
        phone: "19923199509邀请成功",
        num: "1元",
        type: "优惠卷",
      },
    ]);
    const integralList = ref([
      {
        phone: "19923199509下单",
        num: "100",
        type: "积分",
      },
      {
        phone: "19923199509下单",
        num: "100",
        type: "积分",
      },
    ]);
    // 监听右上角菜单“分享到朋友圈”按钮的行为，并自定义分享内容。等同于 onShareTimeline 页面生命周期钩子。
    useShareTimeline(() => {
    });
    // useShareAppMessage 监听用户点击页面内转发按钮 （Button 组件 openType='share'）
    const userInfo = Taro.getStorageSync("userInfo") || {};
    useShareAppMessage((res) => {
      if (res.from === "button") {
        // 来自页面内转发按钮
      }
      return {
        title: "美食盒子部落",
        path: `pages/auth/login/index?inviter=${userInfo.id}`,
      };
    });
    const invite = () => {
    };

    const getInviteListByStatus = (data) => {
      getInviteList().then((res) => {
        const ret = res.result;
        noInviteSuccessList.value = ret.filter((t) => t.inviteStatus === 1);
        hasInviteSuccessList.value = ret.filter((t) => t.inviteStatus === 2);
      });
    };

    // 获取类型(1：后台增删；2：主动领取；3：邀请新用户)
    const getMemberPointsPageStatus = () => {
      getMemberPointsPage({
        getType: 3,
        pageNo: 1,
        pageSize: 100,
      }).then((res) => {
        memberPoints.value = res.result?.records || [];
        memberPoints.value.forEach((item) => {
          Object.assign(item, {
            phone: `${item.inviteeMobile}下单`,
            num: item.count,
            type: "积分",
          });
        });
      });
    };
    // 积分
    getMemberPointsPageStatus();

    // inviteStatus=2：已邀请成功 和 已获取优惠券
    // inviteStatus=1：未邀请成功

    // 邀请状态
    getInviteListByStatus();

    // 优惠卷
    const getCoupon = () => {
      getMemberCoupon({ getType: 3 }).then((res) => {
        couponList.value = res.result;
        couponList.value.forEach((item) => {
          Object.assign(item, {
            phone: `${item.inviteeMobile}下单`,
            num: item.faceValue,
            type: "优惠卷",
          });
        });
      });
    };
    getCoupon();

    return {
      ...toRefs(state),
      back,
      invite,
      hasInvite,
      hasReel,
      showInfo,
      noInviteSuccessList,
      hasInviteSuccessList,
      couponList,
      integralList,
      memberPoints,
    };
  },
};
</script>

<style lang="less">
.t-invite {
  background: #ff7a32;

  .iconfont {
    font-family: "iconfont" !important;
  }

  .rule {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 20;
    right: 0;
    top: 120px;
    color: #fff;
    background: rgba(0, 0, 0, 0.3);
    font-size: 11px;
    width: 46px;
    height: 23px;
    border-radius: 12px 0 0 12px;
  }

  .invite-content {
    flex: 1;
    overflow: hidden;

    .content {
      min-height: 100%;
      background-image: linear-gradient(#ff7a32, #fc5e4c);

      .invite-wrapper {
        padding-top: 48px;

        .countdown-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-top: 66px;

          .countdown-part-box {
            display: flex;
            align-items: center;

            .part-item {
              flex-shrink: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              width: 22px;
              height: 22px;
              background: #ffeed3;
              color: #ff4e39;
              font-size: 13px;
              font-weight: 600;
              border-radius: 6px;
            }

            .part-item-symbol {
              margin: 0 5px;
              color: #ffffff;
            }
          }
        }

        .award-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 130px;

          .award-list {
            width: 74%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .award-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              width: 66px;
              height: 55px;
              background: url(./award.png);
              background-size: 100% 100%;

              .top {
                font-size: 11px;
                color: #ef553d;
              }

              .bottom {
                display: flex;
                align-items: baseline;
                justify-content: center;
                color: #ffffff;

                .prev {
                  font-size: 18px;
                }

                .num {
                  font-size: 24px;
                  padding: 0 2px;
                }

                .unit {
                  font-size: 12px;
                }
              }
            }
          }
        }

        .tip-wrap {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-top: 36px;

          .tip {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 184px;
            height: 20px;
            background: #fcdaac;
            color: #a62116;
            font-size: 12px;
            border-radius: 20px;
          }
        }

        .do-invite-wrap {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;

          button {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: 0;
          }

          .do-invite {
            width: 80%;
            padding: 10px;
            margin-top: 42px;
            display: flex;
            justify-content: center;
            align-items: center;

            .tt {
              margin-left: 9px;
              color: #e6552e;
              font-size: 18px;
            }
          }
        }

        .invite-bg {
          height: 427px;
          background: url(./invite.png);
          background-size: 100% 100%;
        }

        .has-invite {
          padding: 0px 10px;
          margin-top: 8px;

          .nut-tabs {
            border-radius: 8px;
          }

          .invite-list,
          .coupon-list,
          .integral-list {
            margin: -10px 0;

            .t-invite-item,
            .t-coupon-integral {
              margin-bottom: 10px;

              &:last-child {
                margin-bottom: 0;
              }
            }
          }
        }

        // .discount-coupon {
        //   margin-bottom: 60px;
        // }

        .footer {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;

          .footer-img {
            width: 208px;
            height: 30px;
            background: url(./footer.png);
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}

.pop-class {
  width: 80%;
}
</style>
