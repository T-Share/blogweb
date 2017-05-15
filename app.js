/**
 * 应用程序的启动（入口）文件
 */
// 加载express模块
var express = require('express');
// 加载模版处理模块
var swig = require('swig');
// 加载数据库模块
var mongoose = require('mongoose');
// 创建app应用 => NodeJs http.createServer();
var app = express();

// 设置静态文件托管
// 当用户访问的URL以/public开始,那么直接返回对应__dirname+'/public下的文件  __dirname：获取当前模块文件所在目录的完整绝对路径
app.use('/public',express.static(__dirname+'/public'));

// 配置模版应用模块
// 定义当前应用所使用的模版引擎
// 第一个参数：模版引擎的名称，同时也是模版文件的后缀（也就是html可以改成tpl，他是自定义的）；
// 第二个参数：表示用于解析模版内容的方法
app.engine('html',swig.renderFile);
// 设置模版文件存放的目录，第一个参数必须是views,第二个参数是目录
app.set('views','./views');
// 注册所使用的模版引擎，第一个参数必须是view engine，第二个参数和app.engine这个方法中定义的模版引擎的名称（第一个参数）是一致的
app.set('view engine','html');

// 在开发过程中需要取消模版缓存
swig.setDefaults({cache:false});


/**
 * 首页
 * @param req:request对象
 * @param res:response对象
 * @param next:函数
 */
//app.get('/',function(request,response,next){
//	response.send('<h1>欢迎光临我的博客</h1>');
	/**
	 * 读取views目录下的制定文件,解析并返回给客户端
	 * 第一个参数：表示模版的文件，相对于views目录 views/index.html
	 * 第二个参数：传递给模版使用的数据
	 */
//	response.render('index');
//});

/**
 * 根据不同的功能划分模块
 */
app.use('/admin',require('./routers/admin'));
//app.use('/api',require('./routers/api'));
//app.use('/',require('./routers/main'));

//开启数据库
mongoose.connect();
// 监听http请求
app.listen(2017);

console.log('server start at http://127.0.0.1:2017/');


//用户发送http请求 -> URL -> 解析路由 -> 找到匹配的规则 -> 执行绑定的函数,返回对应内容值给用户
//
///public -> 静态 -> 直接读取指定目录下的文件,返回给用户
//-> 动态 -> 处理业务逻辑,加载模版,解析模版 -> 返回数据给用户
