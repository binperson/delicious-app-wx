<template>
  <view class="t-main t-container">
    <div class="t-main-bg"></div>
    <view class="main-header">
      <view
        :style="{
          height: `${menuRect.height + 2 * menuRect.top - statusBarHeight}px`,
          lineHeight: `${menuRect.height}px`,
          paddingTop: `${menuRect.top}px`,
          paddingBottom: `${menuRect.top - statusBarHeight}px!important`,
        }"
        class="header-content"
      >
        <view class="location" @click="getLocation">
          <nut-icon name="location2" color="#fff" size="15"></nut-icon>
          <view class="region-name">{{
            region.regionName ? region.regionName : "获取定位"
          }}</view>
        </view>
      </view>
      <div
        @click="goUrl('/pages/main/select-tribe/index')"
        class="switch-tribe"
      >
        <div class="title">
          产业园一期十栋
        </div>
        <div class="switch">
          更换
        </div>
      </div>
    </view>
    <scroll-view class="content" :scroll-y="true">
      <div class="group-list">
        <div class="group-item">
          <div class="top">
            <div class="title">
              <div class="shop-name">
                大竹林烤鱼
              </div>
              <div class="tip">
                优选食物团购中
              </div>
            </div>
            <div class="countdown-wrap">
              <nut-countdown
                :end-time="Date.now() + 500 * 1000"
              ></nut-countdown>
              后结束
            </div>
          </div>
          <div class="info-wrap">
            <div class="food-wrap">
              <scroll-view>
                <div class="food-list">
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </div>
            <div class="info">
              <div class="left">
                <div class="progress">
                  <nut-progress
                    percentage="60"
                    :text-inside="true"
                    size="small"
                  />
                </div>
                <div class="num-wrap">
                  已拼60单
                </div>
              </div>
              <div class="right">
                <nut-button size="mini" type="warning">
                  <view class="join">
                    <view class="text">去拼单</view>
                    <nut-icon
                      name="iconfont iconfont icon-invite-right"
                      color="#fff"
                      size="12"
                    ></nut-icon>
                  </view>
                </nut-button>
              </div>
            </div>
          </div>
        </div>
        <div class="group-item">
          <div class="top">
            <div class="title">
              <div class="shop-name">
                大竹林烤鱼
              </div>
              <div class="tip">
                优选食物团购中
              </div>
            </div>
            <div class="countdown-wrap">
              <nut-countdown
                :end-time="Date.now() + 500 * 1000"
              ></nut-countdown>
              后结束
            </div>
          </div>
          <div class="info-wrap">
            <div class="food-wrap">
              <scroll-view>
                <div class="food-list">
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </div>
            <div class="info">
              <div class="left">
                <!-- <div class="progress">
                    <nut-progress
                      percentage="60"
                      :text-inside="true"
                      size="small"
                    />
                  </div> -->
                <div class="success">
                  拼单成功，加入即配送
                </div>
              </div>
              <div class="right">
                <nut-button size="mini" type="warning">
                  <view class="join">
                    <view class="text">去加入</view>
                    <nut-icon
                      name="iconfont iconfont icon-invite-right"
                      color="#fff"
                      size="12"
                    ></nut-icon>
                  </view>
                </nut-button>
              </div>
            </div>
          </div>
        </div>
        <div class="group-item">
          <div class="top">
            <div class="title">
              <div class="shop-name">
                大竹林烤鱼
              </div>
              <div class="tip">
                优选食物团购中
              </div>
            </div>
            <div class="countdown-wrap">
              <nut-countdown
                :end-time="Date.now() + 500 * 1000"
              ></nut-countdown>
              后结束
            </div>
          </div>
          <div class="info-wrap">
            <div class="food-wrap">
              <scroll-view>
                <div class="food-list">
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="food-item">
                    <div class="food-img"></div>
                    <div class="food-title">
                      谷物红壳鲜
                    </div>
                    <div class="price-wrap">
                      <div class="price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                      <div class="old-price">
                        <nut-price
                          :price="10.01"
                          size="normal"
                          :need-symbol="true"
                          :thousands="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </scroll-view>
            </div>
            <div class="info">
              <div class="left">
                <!-- <div class="progress">
                    <nut-progress
                      percentage="60"
                      :text-inside="true"
                      size="small"
                    />
                  </div> -->
                <div class="success">
                  拼单成功，加入即配送
                </div>
              </div>
              <div class="right">
                <nut-button size="mini" type="warning">
                  <view class="join">
                    <view class="text">去加入</view>
                    <nut-icon
                      name="iconfont iconfont icon-invite-right"
                      color="#fff"
                      size="12"
                    ></nut-icon>
                  </view>
                </nut-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll-view>
  </view>
</template>
<script>
import Taro, { useDidShow } from "@tarojs/taro";
import { reactive, toRefs } from "vue";
import { goUrl } from "@/utils/index";
const citySelector = requirePlugin("citySelector");
export default {
  name: "Main",
  components: {},
  onUnload() {
    console.log(1231);
    // 页面卸载时清空插件数据，防止再次进入页面，getCity返回的是上次的结果
    citySelector.clearCity();
  },
  setup() {
    const key = "TX5BZ-5B53D-WYN4P-PJECA-5FV5S-OLB2N";
    const referer = "deli";
    const hotCitys = "重庆";
    const state = reactive({
      menuRect: Taro.getMenuButtonBoundingClientRect(),
      statusBarHeight: Taro.getSystemInfoSync().statusBarHeight,
    });

    const getLocation = () => {
      wx.navigateTo({
        url: `plugin://citySelector/index?key=${key}&referer=${referer}&hotCitys=${hotCitys}`,
      });
    };

    useDidShow(() => {
      const selectedCity = citySelector.getCity();
      console.log(123, selectedCity);
    });

    return {
      ...toRefs(state),
      region: {
        regionName: "重庆市",
      },
      goUrl,
      getLocation,
    };
  },
};
</script>
<style lang="less">
.t-main {
  display: flex;
  flex-direction: column;
  position: relative;

  .t-main-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 350px;
    background-image: linear-gradient(#ec6a34, #ffffff);
  }
  .main-header {
    padding: 0 12px;
    position: relative;

    .header-content {
      display: flex;
      align-items: center;

      .location {
        display: flex;
        align-items: center;
        color: #fff;
        font-size: 15px;
        .region-name {
          margin-left: 6px;
        }
      }
    }

    .switch-tribe {
      margin-top: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      line-height: 40px;
      background: #fffff2e8;
      padding: 0 15px;
      border-radius: 6px;

      .title {
        font-size: 13px;
        color: #fa4918;
      }

      .switch {
        font-size: 12px;
        color: #bdc4cc;
      }
    }
  }

  .content {
    flex: 1;
    overflow: hidden;

    .group-list {
      padding-top: 7px;
      padding: 7px 12px 0 12px;

      .group-item {
        padding: 0 12px 12px 12px;
        margin-top: 12px;
        background: #f7702e;
        border-radius: 16px 0 0 0;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40px;

          .title {
            display: flex;
            align-items: flex-end;
            color: #fff;

            .shop-name {
              font-size: 16px;
            }

            .tip {
              font-size: 12px;
              line-height: 18px;
              margin-left: 12px;
            }
          }

          .countdown-wrap {
            display: flex;
            align-items: center;
            color: #ffe4ab;
            font-size: 12px;
          }
        }

        .info-wrap {
          background: #fff;
          padding: 8px 0 0 8px;

          .food-wrap {
            .food-list {
              display: flex;
              align-items: center;

              .food-item {
                margin-right: 8px;
                .food-img {
                  height: 80px;
                  width: 80px;
                  background: url("https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F201902%2F19%2F20190219140255_mkuch.thumb.400_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1649158655&t=d3f358785848b00675721f39378f4917");
                  background-size: 100% 100%;
                }
                .food-title {
                  font-size: 12px;
                  color: #666666;
                  margin-top: 8px;
                  padding: 0 2px;
                }
              }

              .price-wrap {
                display: flex;
                align-items: center;
                .price {
                  .nut-price--symbol-normal {
                    font-size: 13px;
                  }
                  .nut-price--normal {
                    font-size: 13px;
                  }

                  .nut-price--decimal-normal {
                    font-size: 11px;
                  }
                }

                .old-price {
                  margin-left: 2px;
                  .nut-price {
                    color: #bdc4cc;
                    text-decoration-line: line-through;
                  }

                  .nut-price--symbol-normal {
                    font-size: 8px;
                    text-decoration-line: line-through;
                  }
                  .nut-price--normal {
                    font-size: 8px;
                    text-decoration-line: line-through;
                  }
                  .nut-price--decimal-normal {
                    font-size: 6px;
                    text-decoration-line: line-through;
                  }
                }
              }
            }
          }
          .info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 8px 8px 0;

            .left {
              display: flex;
              align-items: center;
              width: 70%;

              .success {
                color: #fa2c19;
                font-size: 12px;
              }

              .progress {
                flex: 1;

                .nut-progress-inner {
                  opacity: 0.6;
                }
              }

              .num-wrap {
                font-size: 10px;
                color: #999;
                margin-left: 8px;
              }
            }

            .right {
              font-size: 12px;

              .nut-button {
                background: #fce0ca;
              }

              .join {
                position: relative;
                display: flex;
                align-items: center;
                color: #fa5f22;

                .text {
                  position: relative;
                  left: -6px;
                }

                .icon-invite-right {
                  position: absolute;
                  right: -6px;
                  top: 1px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
