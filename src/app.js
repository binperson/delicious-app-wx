import { createApp } from 'vue'
import { Navbar, Button, Toast, Icon, Tabbar, TabbarItem } from '@nutui/nutui-taro';
import '@nutui/nutui-taro/dist/styles/themes/default.scss';
import "./assets/font/iconfont.css";

import './app.less'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(Button).use(Toast).use(Navbar).use(Icon).use(Tabbar).use(TabbarItem)

export default App
