var events = require("events");
var eventEmitter = new events.EventEmitter();
// 监听器1
var listener1 = function listener1 (){
	console.log("监听器 listener1 启动");
}
// 监听器2
var listener2 = function listener2 (){
	console.log("监听器 listener2 启动");
}
// 绑定 connection 事件,处理函数为 listener1 
eventEmitter.addListener("connection",listener1);
// 绑定 connection 事件,处理函数为 listener2
eventEmitter.on("connection",listener2);

var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners + "个监听器监听连接事件");
// 处理 connection 
eventEmitter.emit("connection");
// 移除 绑定的listener1函数
eventEmitter.removeListener("connection",listener1);
console.log("listener1 将不受监听");
// 触发连接事件
eventEmitter.emit("connection");
var eventListeners = require("events").EventEmitter.listenerCount(eventEmitter,"connection");
console.log(eventListeners + "个监听器监听连接事件");

