<template>
  <div class="t-buying t-container">
    <VHeader></VHeader>
    <div class="buying-content">
      <nut-tabs class="buying-tab" v-model="tabValue" type="smile">
        <nut-tabpane title="商品">
          <div class="goods-wrapper">
            <div class="tab-wrapper">
              <nut-tabs
                v-model="goodsTabValue"
                title-scroll
                direction="vertical"
                class="goods-tab"
              >
                <nut-tabpane v-for="item in list" :title="item.name">
                  <div class="foods-wrapper">
                    <scroll-view style="height: 100%" :scroll-y="true">
                      <ul>
                        <li v-for="food in item.foods" class="food-item">
                          <div class="icon">
                            <img width="57px" height="57px" :src="food.icon" />
                          </div>
                          <div class="content">
                            <h2 class="name">{{ food.name }}</h2>
                            <p class="desc">{{ food.description }}</p>
                            <div class="extra">
                              <span class="count"
                                >月售{{ food.sellCount }}份</span
                              ><span>好评率{{ food.rating }}%</span>
                            </div>
                            <div class="price">
                              <span class="now">￥{{ food.price }}</span>
                              <span class="old" v-show="food.oldPrice"
                                >￥{{ food.oldPrice }}</span
                              >
                            </div>
                            <div class="cart-control-wrapper">
                              <CartControl
                                @add="onAdd"
                                :food="food"
                              ></CartControl>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </scroll-view>
                  </div>
                </nut-tabpane>
              </nut-tabs>
            </div>
            <div class="shop-cart-wrapper">
              <ShopCart
                :selectFoods="selectFoods"
                :deliveryPrice="seller.deliveryPrice"
                :minPrice="seller.minPrice"
              />
            </div>
          </div>
        </nut-tabpane>
        <nut-tabpane title="商家">
          商家
        </nut-tabpane>
      </nut-tabs>
    </div>
  </div>
</template>

<script>
import Taro from "@tarojs/taro";
import VHeader from "./components/VHeader/index.vue";
import CartControl from "./components/CartControl/index.vue";
import ShopCart from "./components/ShopCart/index.vue";
import { ref, computed } from "vue";
export default {
  name: "Buying",
  components: {
    VHeader,
    CartControl,
    ShopCart,
  },
  setup() {
    const onAdd = () => {};

    const seller = {
      name: "粥品香坊（回龙观）",
      description: "蜂鸟专送",
      deliveryTime: 38,
      score: 4.2,
      serviceScore: 4.1,
      foodScore: 4.3,
      rankRate: 69.2,
      minPrice: 20,
      deliveryPrice: 4,
      ratingCount: 24,
      sellCount: 90,
      bulletin:
        "粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。",
      supports: [
        { type: 0, description: "在线支付满28减5" },
        { type: 1, description: "VC无限橙果汁全场8折" },
        { type: 2, description: "单人精彩套餐" },
        { type: 3, description: "该商家支持发票,请下单写好发票抬头" },
        { type: 4, description: "已加入“外卖保”计划,食品安全保障" },
      ],
      avatar:
        "http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg",
      pics: [
        "http://fuss10.elemecdn.com/8/71/c5cf5715740998d5040dda6e66abfjpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/b/6c/75bd250e5ba69868f3b1178afbda3jpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/f/96/3d608c5811bc2d902fc9ab9a5baa7jpeg.jpeg?imageView2/1/w/180/h/180",
        "http://fuss10.elemecdn.com/6/ad/779f8620ff49f701cd4c58f6448b6jpeg.jpeg?imageView2/1/w/180/h/180",
      ],
      infos: [
        "该商家支持发票,请下单写好发票抬头",
        "品类:其他菜系,包子粥店",
        "北京市昌平区回龙观西大街龙观置业大厦底商B座102单元1340",
        "营业时间:10:00-20:30",
      ],
    };

    const list = ref([
      {
        name: "热销榜",
        type: -1,
        foods: [
          {
            name: "皮蛋瘦肉粥",
            price: 10,
            oldPrice: "",
            description: "咸粥",
            sellCount: 229,
            rating: 100,
            info:
              "一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "很喜欢的粥",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 1,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "扁豆焖面",
            price: 14,
            oldPrice: "",
            description: "",
            sellCount: 188,
            rating: 96,
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 1,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            info: "",
            icon:
              "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "葱花饼",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 124,
            rating: 85,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "没啥味道",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 1,
                text: "很一般啊",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "牛肉馅饼",
            price: 14,
            oldPrice: "",
            description: "",
            sellCount: 114,
            rating: 91,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "难吃不推荐",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "招牌猪肉白菜锅贴/10个",
            price: 17,
            oldPrice: "",
            description: "",
            sellCount: 101,
            rating: 78,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "不脆,不好吃",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "南瓜粥",
            price: 9,
            oldPrice: "",
            description: "甜粥",
            sellCount: 91,
            rating: 100,
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "红豆薏米美肤粥",
            price: 12,
            oldPrice: "",
            description: "甜粥",
            sellCount: 86,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "八宝酱菜",
            price: 4,
            oldPrice: "",
            description: "",
            sellCount: 84,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "红枣山药糙米粥",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 81,
            rating: 91,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "糊塌子",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 80,
            rating: 93,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "单人精彩套餐",
        type: 2,
        foods: [
          {
            name: "红枣山药粥套餐",
            price: 29,
            oldPrice: 36,
            description:
              "红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注",
            sellCount: 17,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "冰爽饮品限时特惠",
        type: 1,
        foods: [
          {
            name: "VC无限橙果汁",
            price: 8,
            oldPrice: 10,
            description: "",
            sellCount: 15,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "还可以",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "精选热菜",
        type: -1,
        foods: [
          {
            name: "娃娃菜炖豆腐",
            price: 17,
            oldPrice: "",
            description: "",
            sellCount: 43,
            rating: 92,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "菜量还可以,味道还可以",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "手撕包菜",
            price: 16,
            oldPrice: "",
            description: "",
            sellCount: 29,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "香酥黄金鱼/3条",
            price: 11,
            oldPrice: "",
            description: "",
            sellCount: 15,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "爽口凉菜",
        type: -1,
        foods: [
          {
            name: "八宝酱菜",
            price: 4,
            oldPrice: "",
            description: "",
            sellCount: 84,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "拍黄瓜",
            price: 9,
            oldPrice: "",
            description: "",
            sellCount: 28,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "精选套餐",
        type: -1,
        foods: [
          {
            name: "红豆薏米粥套餐",
            price: 37,
            oldPrice: "",
            description: "红豆薏米粥,三鲜干蒸烧卖,拍黄瓜",
            sellCount: 3,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "皮蛋瘦肉粥套餐",
            price: 31,
            oldPrice: "",
            description: "",
            sellCount: 12,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "果拼果汁",
        type: -1,
        foods: [
          {
            name: "蜜瓜圣女萝莉杯",
            price: 6,
            oldPrice: "",
            description: "",
            sellCount: 1,
            rating: "",
            info: "",
            ratings: [],
            icon:
              "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "加多宝",
            price: 6,
            oldPrice: "",
            description: "",
            sellCount: 7,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "VC无限橙果汁",
            price: 8,
            oldPrice: 10,
            description: "",
            sellCount: 15,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "还可以",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "小吃主食",
        type: -1,
        foods: [
          {
            name: "扁豆焖面",
            price: 14,
            oldPrice: "",
            description: "",
            sellCount: 188,
            rating: 96,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 1,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "葱花饼",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 124,
            rating: 85,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "没啥味道",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 1,
                text: "很一般啊",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "牛肉馅饼",
            price: 14,
            oldPrice: "",
            description: "",
            sellCount: 114,
            rating: 91,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "难吃不推荐",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "招牌猪肉白菜锅贴/10个",
            price: 17,
            oldPrice: "",
            description: "",
            sellCount: 101,
            rating: 78,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 1,
                text: "不脆,不好吃",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "糊塌子",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 80,
            rating: 93,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
      {
        name: "特色粥品",
        type: -1,
        foods: [
          {
            name: "皮蛋瘦肉粥",
            price: 10,
            oldPrice: "",
            description: "咸粥",
            sellCount: 229,
            rating: 100,
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "很喜欢的粥",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 1,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "南瓜粥",
            price: 9,
            oldPrice: "",
            description: "甜粥",
            sellCount: 91,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "红豆薏米美肤粥",
            price: 12,
            oldPrice: "",
            description: "甜粥",
            sellCount: 86,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "红枣山药糙米粥",
            price: 10,
            oldPrice: "",
            description: "",
            sellCount: 81,
            rating: 91,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "鲜蔬菌菇粥",
            price: 11,
            oldPrice: "",
            description: "咸粥",
            sellCount: 56,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750",
          },
          {
            name: "田园蔬菜粥",
            price: 10,
            oldPrice: "",
            description: "咸粥",
            sellCount: 33,
            rating: 100,
            info: "",
            ratings: [
              {
                username: "3******c",
                rateTime: 1469281964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "2******3",
                rateTime: 1469271264000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
              {
                username: "3******b",
                rateTime: 1469261964000,
                rateType: 0,
                text: "",
                avatar:
                  "http://static.galileo.xiaojukeji.com/static/tms/default_header.png",
              },
            ],
            icon:
              "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114",
            image:
              "http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750",
          },
        ],
      },
    ]);

    const selectFoods = computed(() => {
      let foods = [];
      list.value.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food);
          }
        });
      });
      console.log('foods', foods)
      return foods;
    });
    return {
      tabValue: ref("0"),
      goodsTabValue: ref("0"),
      list,
      onAdd,
      seller,
      selectFoods
    };
  },
};
</script>

<style lang="less">
@import "@/style/global.less";
.t-buying {
  position: relative;
  display: flex;
  flex-direction: column;

  .buying-content {
    flex: 1;
    overflow: hidden;

    .buying-tab {
      height: 100%;
      width: 100%;

      .goods-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;
        .tab-wrapper {
          flex: 1;
        }
        .shop-cart-wrapper {
          width: 100%;
          height: 48px;
        }
      }

      .nut-tabpane {
        position: relative;
        padding: 0;
      }

      .nut-tabs__content {
        flex: 1;
      }
    }

    .goods-tab {
      height: 100%;
      overflow: hidden;

      .foods-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;

        .food-item {
          display: flex;
          margin: 18px;
          padding-bottom: 18px;
          position: relative;

          &:last-child {
            border: none;
            margin-bottom: 0;
          }

          .icon {
            flex: 0 0 57px;
            margin-right: 10px;
            img {
              height: auto;
            }
          }

          .content {
            flex: 1;

            .name {
              margin: 2px 0 8px 0;
              height: 14px;
              line-height: 14px;
              font-size: 14px;
              color: #333;
            }
            .desc,
            .extra {
              line-height: 10px;
              font-size: 10px;
              color: #999;
            }

            .desc {
              line-height: 12px;
              margin-bottom: 8px;
            }

            .extra {
              .count {
                margin-right: 12px;
              }
            }

            .price {
              font-weight: 700;
              line-height: 24px;

              .now {
                margin-right: 8px;
                font-size: 14px;
                color: #f01414;
              }

              .old {
                text-decoration: line-through;
                font-size: 10px;
                color: #999;
              }
            }
          }

          .cart-control-wrapper {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }

    .nut-tabs__titles-item__text {
      padding: 0 20px;
    }
  }
}
</style>
