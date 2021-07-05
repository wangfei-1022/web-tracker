# web-tracker

# 安装

npm install web-tracker --save-dev

# 使用

1. 引入方式

``` javascript
import webTracker from 'web-tracker'
Vue.use(webTracker, {
    host: 'cn-shanghai.log.aliyuncs.com', //必填
    project: 'web-tracker-test', //必填
    logstore: 'web-tracker-test-store', //必填
    appCode: "TEST_PROJECT", //项目名称 必填
    version: "1.0.0", //必填
})
```

2. 代码定向埋点

``` javascript
this.$webTracker.send({
    logType: 'business',
    logCode: this.$t('login.logIn'),
    logName: this.$t('login.logIn'),
    elementType: 'button',
    event: 'click'
})
```

# Log格式说明

| Name        |   Type   | Required  | Description                      |  **Remarks**                                                                      |
| :----       | :------: | :-------: | :------------------------:       | :----------------:                                                                |
| appCode     |  string  |    yes    | 项目代码                          |                                                                                   |
| version     |  string  |    yes    | 项目版本号                        |                                                                                   |
| pageTitle   |  string  |    yes    | 页面标题                          |                                                                                   |
| pageUrl     |  string  |    yes    | 页面地址                          |                                                                                   |
| userAgent   |  string  |    yes    | 浏览器版本                        |                                                                                   |
| timestamp   |  string  |    yes    | 时间戳                            |                                                                                   | 
| logType     |  string  |    yes    | 日志类型                          |  错误日志收集：monitor，业务数据埋点：business                                       |
| logCode     |  string  |    yes    | 日志代码                          |  当logType为monitor时参考下方的错误日志类型[Code]，为business时由业务指定好的日志代码  |
| logName     |  string  |    yes    | 日志名称                          |  当logType为monitor时参考下方的错误日志类型[Name]，为business时由业务指定好的日志名称  |
| elementType |  string  |    yes    | 元素名称                          |  针对错误日志类型，没有对应的元素名称，则默认值为Page                                  |
| stack       |  string  |    no     | 堆栈信息                          |                                                                                  |
| message     |  string  |    no     | 堆栈错误信息                      |                                                                                  |
| fileName    |  string  |    no     | 文件名（当为资源加载错误的时候会有）|                                                                                   |  
| ... |  string  |    no     | ... |  任意添加额外需要传递的数据                            |   

# 错误日志类型

| Code          |   Name     |
| :----         |  :------:  |
| PV            |  PV        |
| PERFORMANCE   |  性能      |
| JS_ERROR      |  JS错误    |
| XHR_ERROR     |  接口请求  |
| CONSOLE_ERROR |  针对vue   |
| TIME_ON_PAGE  |  在线时长  |
| LONG_TASK     |  卡顿      |
| BLANK_SCREEN  |  白屏      |

# 联系方式

QQ:927230462  

微信：wf927230462

# License

[MIT licensed. ](https://opensource.org/licenses/MIT)  

Copyright (c) 2021-present
