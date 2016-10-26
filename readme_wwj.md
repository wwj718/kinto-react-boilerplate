# 开发笔记
*  本地使用kinto启动服务：http://127.0.0.1:8888/v1/
*  使用kinto_admin观看数据变化: /Users/wwj/mylab/blockly/blockly/demos/generator/kinto_admin/kinto_admin.html
  *  用户名 密码： public-demo / s3cr3t

# 打包
npm  run build

# 工具使用
https://facebook.github.io/react/ 可以使用

https://github.com/facebook/react-devtools 使用说明

npm install babel-plugin-transform-react-jsx-source

Currently iframes and Chrome apps/extensions are not inspectable.

使用http://localhost:3000/#public-demo 而不是http://localhost:3000/webpack-dev-server/


# todo
### react学习
*  props?
   *  问题解决：[优质demo](https://hulufei.gitbooks.io/react-tutorial/content/introduction.html) 
   *  视为context
   *  props 是组件包含的两个核心概念之一，另一个是 state（这个组件没用到）。可以把 props 看作是组件的配置属性，在组件内部是不变的
*  render?
  *  解决：当组件状态 state 有更改的时候，React 会自动调用组件的 render 方法重新渲染整个组件的 UI
*  import { EventEmitter } from "events"; 
  *  显式调用 bind(this) 将事件函数上下文绑定要组件实例上，这也是 React 推崇的原则：没有黑科技，尽量使用显式的容易理解的 JavaScript 代码
  *  react支持的事件：https://facebook.github.io/react/docs/events.htmlv
*  JSX
  *  前端被“表现和逻辑层分离”这种思想“洗脑”太久
  *  JSX 让 JS 支持嵌入 HTML 不得不说是一种非常聪明的做法，让前端实现真正意义上的组件化成为了可能
*  组件通信
  *  父子组件间通信：通过 props 属性传递
  *  非父子组件间的通信：使用全局事件 Pub/Sub 模式，在 componentDidMount 里面订阅事件，在 componentWillUnmount 里面取消订阅，当收到事件触发的时候调用 setState 更新 UI
  *  比较复杂的应用，推荐使用类似 Flux 这种单项数据流架构
*  react props state 对比
  *  https://segmentfault.com/q/1010000002958539
  *  props放初始化数据（诸如下拉菜单选项），一直不变的，state就是放要变的（诸如购物车物品总价）

# 学会
*  window.localStorage
*  events
*  state and props

# 小结
整个流程已经走通，核心概念学完

# todo
react bootstrap

# 教程
*  [react中文教程](http://reactjs.cn/react/docs/getting-started-zh-CN.html)
*  [ECMAScript 6 入门](http://es6.ruanyifeng.com/#docs) 
