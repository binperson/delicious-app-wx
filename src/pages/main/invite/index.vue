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
      pop-class="popclass"
      :style="{ padding: '30px 50px' }"
      v-model:visible="showInfo"
      :z-index="100"
      closeable
    >
      积分规则：
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
                  <nut-countdown v-model="resetTime" :endTime="end">
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
                      <view class="top">
                        1-2人
                      </view>
                      <view class="bottom">
                        <view class="prev">
                          ¥
                        </view>
                        <view class="num">1</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                    <div class="award-item">
                      <view class="top">
                        3-5人
                      </view>
                      <view class="bottom">
                        <view class="prev">
                          ¥
                        </view>
                        <view class="num">3</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                    <div class="award-item">
                      <view class="top">
                        6人以上
                      </view>
                      <view class="bottom">
                        <view class="prev">
                          ¥
                        </view>
                        <view class="num">5</view>
                        <view class="unit">/人</view>
                      </view>
                    </div>
                  </div>
                </div>
                <div class="tip-wrap">
                  <view class="tip">
                    邀请成功条件：好友下单满5元
                  </view>
                </div>
                <div class="do-invite-wrap">
                  <div @click="invite" class="do-invite">
                    <nut-icon
                      color="#E6552E"
                      name="iconfont iconfont icon-weixin"
                      size="24"
                    ></nut-icon>
                    <view class="tt">立即邀请微信好友</view>
                  </div>
                </div>
              </div>
              <div class="has-invite">
                <nut-tabs v-model="hasInvite">
                  <nut-tabpane title="未邀请成功">
                    <InviteEmpty desc="暂无邀请好友，快去邀请好友吧" />
                  </nut-tabpane>
                  <nut-tabpane title="已邀请成功">
                    <InviteEmpty desc="暂无邀请好友，快去邀请好友吧" />
                  </nut-tabpane>
                </nut-tabs>
              </div>
              <div class="has-invite discount-coupon">
                <nut-tabs>
                  <nut-tabpane title="已获得优惠卷">
                    <InviteEmpty desc="暂无优惠券，快去邀请好友吧" />
                  </nut-tabpane>
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
import { back } from "@/utils/index";
import { reactive, ref, toRefs } from "vue";
import InviteEmpty from "./components/InviteEmpty.vue";

export default {
  name: "Invite",
  components: {
    DeliView,
    DeliNavbar,
    InviteEmpty,
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
    const showInfo = ref(false);
    const invite = () => {
      console.log(123);
    };

    return {
      ...toRefs(state),
      back,
      invite,
      hasInvite,
      showInfo,
    };
  },
};
</script>

<style lang="less">
.t-invite {
  background: #ff7a32;

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
          display: flex;
          justify-content: center;
          align-items: center;

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
</style>
