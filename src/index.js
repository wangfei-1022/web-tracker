import { injectJsError } from "../src/webTracker/jsError"
import { injectXHR } from "../src/webTracker/xhr"
import { injectConsoleError } from "./webTracker/console"
import { injectBlankScreen } from "../src/webTracker/blankScreen"
import { injectPerf } from "./webTracker/perf"
import { injectLongTask } from "../src/webTracker/longTask"
import { injectPv } from "../src/webTracker/pv"
import log from "../src/log/log"
import excuteQueue from "../src/log/excuteQueue"
import { merge } from "./util/index"

class WebTracker {
  constructor() {
    this.report = {
      PV: false,
      PERFORMANCE: false, //性能
      JS_ERROR: true, //JS
      XHR_ERROR: true, //接口请求
      CONSOLE_ERROR: false, //针对vue
      TIME_ON_PAGE: false, //在线时长
      LONG_TASK: false, //卡顿
      BLANK_SCREEN: false, //白屏
    }
  }

  install(Vue, options) {
    this.init(options)
    Vue.prototype.$webTracker = this
  }

  init(options) {
    options = options || {}
    this.report = merge(this.report, options.report || {})
    options.report = this.report
    this.config = options
    log.init(this.config)
    this._init()
  }

  send(data, callback) {
    //发送数据时先加入执行队列
    excuteQueue.add(data, callback)
  }

  _init() {
    //默认监听js错误、资源请求错误、接口请求错误
    injectJsError()
    injectXHR()
    injectConsoleError()
    this.report && this.report.BLANK_SCREEN && injectBlankScreen()
    this.report && this.report.LONG_TASK && injectLongTask()
    this.report && this.report.PERFORMANCE && injectPerf()
    this.report && this.report.PV && injectPv()
  }
}

export default new WebTracker()
