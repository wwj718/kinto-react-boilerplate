//import "babel/polyfill"; //注释掉 否则会报错,在issue里作者说不需要这个
import { EventEmitter } from "events";  //没有默认就需要{}
import React from "react"; //默认export
import { render } from "react-dom";

import App from "./components/App";
import Auth from "./auth"; //也是default
import Controller from "./controller";
import Store from "./store";


const events = new EventEmitter(); //？这是什么
const auth = new Auth(events, window.location); //class 初始化
const store = new Store("items", events);
const controller = new Controller({auth, store}, events);  //控制器

render(<App controller={controller}/>, document.getElementById("app"));
