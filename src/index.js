import { injectJsError } from '../src/tracker/jsError';
import { injectXHR } from '../src/tracker/xhr';
import { injectConsoleError } from "./tracker/console"
import { injectBlankScreen } from '../src/tracker/blankScreen';
import { injectPerf } from './tracker/perf';
import { injectLongTask } from '../src/tracker/longTask';
import { injectPv } from '../src/tracker/pv';
import log from '../src/log/log';
import excuteQueue from '../src/log/excuteQueue'
import { merge } from './util/index';

class WebTracker {
  constructor() {
    this.logType = {
      JS_ERROR: true, // JS
      CONSOLE_ERROR: true, // 针对vue
      XHR_ERROR: {
        LOAD: true, // 接口请求
        ERROR: true, // 接口请求
        ABORT: false // 接口请求
      },
      PV: false,
      PERFORMANCE: false, // 性能
      TIME_ON_PAGE: false, // 在线时长
      LONG_TASK: false, // 卡顿
      BLANK_SCREEN: false // 白屏
    }
  }

  install(Vue, options) {
    this.init(options)
    Vue.prototype.$webTracker = this
  }

  init(options) {
    options = options || {}
    this.logType = merge(this.logType, options.logType || {})
    options.logType = this.logType
    this.config = options
    log.init(this.config)
    this._init()
  }

  send(data, callback) {
    //发送数据时先加入执行队列
    excuteQueue.run(data, callback)
  }

  _init() {
    injectXHR(this.logType.XHR_ERROR)
    this.logType && this.logType.JS_ERROR && injectJsError()
    this.logType && this.logType.CONSOLE_ERROR && injectConsoleError()
    this.logType && this.logType.BLANK_SCREEN && injectBlankScreen()
    this.logType && this.logType.LONG_TASK && injectLongTask()
    this.logType && this.logType.PERFORMANCE && injectPerf()
    this.logType && this.logType.PV && injectPv()
  }
}

export default new WebTracker()
