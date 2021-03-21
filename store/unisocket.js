var wsConnectionOrder = {
    socketTask:null,
    host: 'ws://192.168.1.12:8282', //websocket地址
    timeoutObj: null, //心跳实例
    pingInterval: 10, //心跳间隔
    pingWait: 0, //心跳已等待时间
    isrestart: false, //是否正在重连
    restartInterval: 10, //重连尝试次数
    restartWait: 0, //重连已尝试次数
    onMessage:null,
    //初始化webSocket长连接
    initWebSocket: function(onMessage=null) {
        onMessage = onMessage==null ? this.onMessage : onMessage,
        this.onMessage = onMessage
        var host = this.host
        if(this.socketTask != null && this.socketTask.readyState==1) return false
        var socketTask = uni.connectSocket({
            url: host,
            success: function() {}
        });
        socketTask.onOpen(function(){
            wsConnectionOrder.restartWait = 0;
            //开始websocket心跳
            wsConnectionOrder.startWsHeartbeat();
            console.log('wsOpen');
        })
        socketTask.onMessage(function(res){
            onMessage(res)
        })
        socketTask.onError(function(){
            console.log('onError')
            if (wsConnectionOrder.restartWait < wsConnectionOrder.restartInterval) {
                wsConnectionOrder.reconnect();
            }
        })
        socketTask.onClose(function(){
            console.log('onClose')
            if (wsConnectionOrder.restartWait < wsConnectionOrder.restartInterval) {
                wsConnectionOrder.reconnect();
            }
        })
        this.socketTask = socketTask;
        return this;
    },
    sendSocketMessage: function(data) {
        wsConnectionOrder.startWsHeartbeat();
        if (typeof data == 'object') {}
        uni.sendSocketMessage({
            data: typeof data == 'object' ? JSON.stringify(data) : data
        });
    },
    //重启websocket
    reconnect: function() {
        console.log('重启函数'+wsConnectionOrder.restartWait);
        var _this = this;
        _this.restartWait++;
        if (_this.isrestart)
            return;
        _this.isrestart = true;
        uni.closeSocket();
        clearTimeout(_this.timeoutObj);
        setTimeout(function() {
            _this.initWebSocket();
            _this.isrestart = false;
        }, 1000);
    },
    //开启websocket
    startWsHeartbeat: function() {
        var _this = this;
        if(_this.socketTask.readyState!=1) return;
        _this.timeoutObj && clearTimeout(_this.timeoutObj);
        _this.timeoutObj = setTimeout(function() {
            wsConnectionOrder.sendSocketMessage({
                type: 'ping',
                data: new Date().getTime()
            });
        }, _this.pingInterval * 1000);
    },
};

export default wsConnectionOrder;
