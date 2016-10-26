const DEFAULT_SERVER = "https://kinto.dev.mozaws.net/v1"; //kinto服务器地址  本地 127.0.0.1:8888/v1

//总的控制器
//用类十分合适
export default class Controller {

  constructor(components, events) {
    this.store = components.store; //Controller({auth, store}, events)
    this.auth = components.auth;
    this.events = events;

    this.events.on('auth:login', this.onLogin.bind(this));  //创建事件 , 'auth:login' 是事件名，后边是回调函数  显示绑定
    this.events.on('action:start', this.onStart.bind(this));
    this.events.on('action:configure', this.onConfigure.bind(this));
    this.events.on('action:create', this.onCreate.bind(this));
    this.events.on('action:update', this.onUpdate.bind(this));
    this.events.on('action:delete', this.onDelete.bind(this));
    this.events.on('action:sync', this.onSync.bind(this));
  }

  on(events, callback) {
    const names = events.split(/\s*,\s*/); //? 这是啥 为了继承的时候用？
    names.forEach(event => this.events.on(event, callback));
  }

  dispatch(name, data) { //事件派发  为了给子类用？
    this.events.emit(name, data);
  }

  onStart() {
    // Start application with default config.
    const previous = window.localStorage.getItem("config"); //本地浏览器缓存 ,todo:学习window.localStorage的用法 ,是url级别的
    const config = previous ? JSON.parse(previous) : {server: DEFAULT_SERVER}; //看看本地是否有存储的配置，否则用默认配置
    this.dispatch('action:configure', config); //原理上回转化为emit，利用emit构造的命名抽象块
  }

  onConfigure(config) {
    // Save config for next sessions.
    // 设置配置 是一个监听函数，worker
    window.localStorage.setItem("config", JSON.stringify(config)); //设置本地缓存
    this.events.emit("config:change", config); //变化发生时，抛出事件，等待监听者函数处理 // 本类里没有函数监听config.change

    this.auth.configure(config);
    this.auth.authenticate(); //重新登录
  }

  onLogin(info) {
    //登录
    this.store.configure(info);
    this.store.load();
  }

  onCreate(record) {
    this.store.create(record); //同步到store，store负责和远程服务器通信
  }

  onUpdate(record) {
    this.store.update(record);
  }

  onDelete(record) {
    this.store.delete(record);
  }

  onSync() {
    this.store.sync();
  }
}
