import React, { PropTypes } from "react";

//app 业务逻辑写这里

export class Form extends React.Component { //表单组件
  static contextTypes = {
    controller: PropTypes.object.isRequired
  };

  constructor(props) { //props是什么 类似上下文 原型链？
    super(props);
    this.state = {record: this.props.record || {}};   // props和state是react最核心的两个概念
  }

  onFormSubmit(event) {
    event.preventDefault();
    const action = this.props.record ? 'update' : 'create';
    this.context.controller.dispatch(`action:${action}`, this.state.record); //触发事件,处理事件的控制器已经写好，很好的流
  }

  onChange(field, event) {
    const newrecord = Object.assign({}, this.state.record, {[field]: event.target.value});
    this.setState({record: newrecord});
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit.bind(this)}>
        <input autofocus name="label" type="text"
               placeholder="Label"
               value={this.state.record.label}
               onChange={this.onChange.bind(this, "label")} />
        <button type="submit">{this.props.record ? "Save" : "Add"}</button>
      </form>
    );
  }
}


export class Item extends React.Component {
  static contextTypes = {
    controller: PropTypes.object.isRequired
  };

  onItemClick() {
    this.context.controller.dispatch('action:edit', this.props.index)
  }

  onDeleteClick() {
    this.context.controller.dispatch('action:delete', this.props.item);
  }

  render() {
    if (!this.props.editing) {
      return (
        <li key={this.props.index} className={this.props.item._status}
            onClick={this.onItemClick.bind(this)}>{this.props.item.label}</li>
      );
    }
    return (
      <li key={this.props.index}>
        <Form record={this.props.item}/>
        <button onClick={this.onDeleteClick.bind(this)}>Delete</button>
      </li>
    );
  }
}


export class List extends React.Component {
  static contextTypes = {
    controller: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this.state = {current: null};
  }

  componentDidMount() {
    this.context.controller.on("action:edit", (index) => {
      this.setState({current: index});
    });
    this.context.controller.on("action:update, action:delete", () => {
      this.setState({current: null});
    });
  }

  render() {
    return (
      <ul>{
        this.props.items.map((item, i) => {
          return <Item key={i}
                       index={i}
                       item={item}
                       editing={i === this.state.current}/>;
        })
      }</ul>
    );
  }
}


export class Preferences extends React.Component {
  static contextTypes = {
    controller: PropTypes.object.isRequired
  };

  onChange(event) {
    const config = {server: event.target.value};
    this.context.controller.dispatch("action:configure", config);
  }

  render() {
    return (
      <div className="preferences">
        <input id="toggle" type="checkbox"></input>
        <label htmlFor="toggle">Preferences</label>
        <form>
          <label>Server
            <input value={this.props.server}
                   onChange={this.onChange.bind(this)}/>
          </label>
        </form>
      </div>
    );
  }
}



//这个是app入口
export default class App extends React.Component {
  static childContextTypes = {
    controller: PropTypes.object
  };

  constructor(props) {
    super(props);   //props放初始化数据（诸如下拉菜单选项），一直不变的，state就是放要变的（诸如购物车物品总价）
    this.state = {busy: false, error: "", items: []}; //内部转态
  }

  getChildContext() {
    // Pass the controller to child components.
    return {
      controller: this.props.controller //父子组件传递数据
    };
  }

  componentDidMount() { //非父子组件传递数据 使用全局的事件监听/发布 , 通过setState来改变UI
    this.props.controller.on("store:busy", state => {
      //setState会trigger的dom的rerendering
      this.setState({busy: state, error: ""}); //组件内部state改变才会导致重渲染，父组件传递的props发生变化，也会执行
    });
    this.props.controller.on("store:change", state => {
      this.setState({items: state.items});
    });
    this.props.controller.on("store:error", error => {
      this.setState({error: error.message});
    });
    this.props.controller.on("config:change", config => {   // 在这里被绑定，在控制器中没绑定 ,此前的on函数就是留待现在扩展  props类似上下文？只是一个{}？
      this.setState({server: config.server});
    });

    // Start the application!
    this.props.controller.dispatch('action:start');
  }

  onSyncClick() {
    this.props.controller.dispatch('action:sync');
  }
  //state和Props变化时都会重新渲染  setstate
  // 参数都是 this.state
  render() {
    const disabled = this.state.busy ? "disabled" : "";
    return (
      <div className={disabled}>
        <div className="error">{this.state.error}</div>
        <Form />
        <List items={this.state.items}/>
        <button onClick={this.onSyncClick.bind(this)} disabled={disabled}>Sync(同步数据)!</button>
        <Preferences server={this.state.server} />
      </div>
    );
  }
}
