//import "babel/polyfill"; //注释掉 否则会报错,在issue里作者说不需要这个
//https://cnodejs.org/topic/572ad70a456745202c2aff24 Event模块初体验
//EventEmitter是观察者模式的体现,所以实现概念可以理解为基于事件的监听和发布
import { EventEmitter } from "events"; //https://nodejs.org/api/events.html   //没有默认就需要{}
import React from "react"; //默认export
import { render } from "react-dom";

import App from "./components/App";
import Auth from "./auth"; //也是default
import Controller from "./controller";
import Store from "./store";


const events = new EventEmitter(); // 监听和发布  理解为事件总线 , 数据在事件中流动 , 组件由events串起
const auth = new Auth(events, window.location); //class 初始化
const store = new Store("items", events);
const controller = new Controller({auth, store}, events);  //控制器   {a,b} 这是什么用法 因为ab都是对象？

render(<App controller={controller}/>, document.getElementById("app")); //初始化的时候只传入controller
