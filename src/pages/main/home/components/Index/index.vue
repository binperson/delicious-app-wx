<template>
  <div class="t-index t-container">
    <scroll-view class="content">
      <div class="top">
        <div class="title">美食盒子落户</div>
        <div class="sub-title">大竹林烤鱼干锅家常菜</div>
        <div class="time">周一至周日10:00-22:00</div>
      </div>
      <div class="main-content">
        <div class="main">
          <div class="info">
            <div class="left">
              <div class="title">Hi，微信用户</div>
            </div>
            <div class="right">
              <div class="info-item">
                <div class="label">优惠券</div>
                <div class="val">2张</div>
              </div>
              <div class="info-item">
                <div class="label">积分</div>
                <div class="val">97个</div>
              </div>
            </div>
          </div>
          <view class="op-wrap">
            <view class="op-item">
              <view class="op-name">门店自取</view>
              <view class="op-desc"> 饭友里面请 </view>
            </view>
            <view class="op-item vertical"> </view>
            <view class="op-item">
              <view class="op-name">外卖点单</view>
              <view class="op-desc"> 送饭到家 </view>
            </view>
          </view>
          <div class="heat-wrap">
            <div class="heat">
              <div class="left">
                <div class="title">干饭计算器</div>
              </div>
              <div class="right">
                <div class="desc">一键查询菜品</div>
                <IconFont name="right"></IconFont>
              </div>
            </div>
          </div>
        </div>
        <div class="more">
          <nut-cell>
            <template #title>
              <div style="color: red">邀请有礼</div>
              <div style="color: red">邀请成功立得优惠卷</div>
            </template>
            <template #desc>
              <div style="color: red">Description Slot</div>
            </template>
          </nut-cell>
          <nut-cell>
            <template #title>
              <div style="color: red">加盟咨询</div>
              <div style="color: red">想在重庆开店的，过来看看，选择大于努力</div>
            </template>
            <template #desc>
              <div style="color: red">Description Slot</div>
            </template>
          </nut-cell>
        </div>
      </div>
    </scroll-view>
  </div>
</template>
<script>
import { IconFont } from "@nutui/icons-vue-taro";
export default {
  components: {
    IconFont,
  },
};
</script>
<style lang="less">
.t-index {
  .top {
    height: 230px;
    background: url(../../../../../assets/bg.png);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-size: 100% 100%;
  }

  .main-content {
    position: relative;
    padding: 0 12px;
    margin-top: -20px;

    .main {
      display: flex;
      flex-direction: column;
      background: #fff;
      border-radius: 8px;

      .info {
        display: flex;
        justify-content: space-between;
        padding: 8px 18px 8px 8px;

        .right {
          display: flex;

          .info-item {
            display: flex;
            margin-left: 10px;

            .val {
              margin-left: 4px;
            }
          }
        }
      }
    }

    .op-wrap {
      display: flex;
      justify-content: space-around;
      padding: 12px 20px;

      .op-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &.vertical {
          height: 60px;
          width: 1px;
          background: #666;
        }

        .op-name {
          display: flex;
          align-items: flex-end;
          color: #000000;
          font-size: 20px;
        }

        .op-desc {
          display: flex;
          align-items: center;
          font-size: 12px;
          color: #666666;
        }
      }
    }

    .heat-wrap {
      padding: 0 10px;

      .heat {
        display: flex;
        padding: 6px 2px;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #666;

        .right {
          position: relative;
          right: -6px;
          color: #666;
          font-size: 12px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
