
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/home","pages/component/custom","pages/component/loading","pages/component/toast","pages/test/layer","pages/test/iframe","pages/resources/iframe","pages/resources/sniffing","pages/play/playlist","pages/chat/index","pages/menu/collect","pages/resources/menu","pages/play/upload","pages/play/record","pages/play/single","pages/play/online","pages/user/login","pages/user/register","pages/user/index","pages/user/security"],"window":{"navigationBarTextStyle":"white","navigationBarTitleText":"爱上我网","navigationBarBackgroundColor":"#F8F8F8","navigationStyle":"custom","backgroundColor":"#F8F8F8","rpxCalcMaxDeviceWidth":800},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"video","compilerVersion":"3.0.7","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{}},{"path":"/pages/index/home","meta":{},"window":{}},{"path":"/pages/component/custom","meta":{},"window":{}},{"path":"/pages/component/loading","meta":{},"window":{}},{"path":"/pages/component/toast","meta":{},"window":{}},{"path":"/pages/test/layer","meta":{},"window":{}},{"path":"/pages/test/iframe","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/resources/iframe","meta":{},"window":{}},{"path":"/pages/resources/sniffing","meta":{},"window":{}},{"path":"/pages/play/playlist","meta":{},"window":{}},{"path":"/pages/chat/index","meta":{},"window":{}},{"path":"/pages/menu/collect","meta":{},"window":{}},{"path":"/pages/resources/menu","meta":{},"window":{}},{"path":"/pages/play/upload","meta":{},"window":{}},{"path":"/pages/play/record","meta":{},"window":{}},{"path":"/pages/play/single","meta":{},"window":{}},{"path":"/pages/play/online","meta":{},"window":{}},{"path":"/pages/user/login","meta":{},"window":{"navigationBarTextStyle":"black"}},{"path":"/pages/user/register","meta":{},"window":{"navigationBarTextStyle":"black"}},{"path":"/pages/user/index","meta":{},"window":{}},{"path":"/pages/user/security","meta":{},"window":{}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
