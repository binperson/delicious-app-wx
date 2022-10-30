import { createApp } from "vue";
import { setupStore } from '@/store';
import {
  Navbar,
  Button,
  Toast,
  Icon,
  Tabbar,
  TabbarItem,
  Address,
  Popup,
  Elevator,
  CountDown,
  Price,
  Progress,
  Tabs,
  TabPane,
  Cell,
  TimeSelect,
  TimePannel,
  TimeDetail,
  Divider,
  Row,
  Col,
  Empty,
  Input,
  Dialog,
  OverLay
} from "@nutui/nutui-taro";
import "@nutui/nutui-taro/dist/styles/themes/default.scss";
import "./assets/font/iconfont.css";

import "./app.less";

const App = createApp({
  onShow(options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
});

App.use(Button)
  .use(TimeSelect)
  .use(TimePannel)
  .use(TimeDetail)
  .use(Toast)
  .use(Navbar)
  .use(Icon)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Address)
  .use(Elevator)
  .use(CountDown)
  .use(Price)
  .use(Progress)
  .use(Tabs)
  .use(TabPane)
  .use(Cell)
  .use(Divider)
  .use(Popup)
  .use(Col)
  .use(Row)
  .use(Empty)
  .use(Input)
  .use(Dialog)
  .use(OverLay);


setupStore(App);

export default App;
