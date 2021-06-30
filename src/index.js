import { injectJsError } from '../src/jsTracker/jsError';
import { injectXHR } from '../src/jsTracker/xhr';
import { injectConsoleError } from "./jsTracker/console"
import { injectBlankScreen } from '../src/jsTracker/blankScreen';
import { injectPerf } from './jsTracker/perf';
import { longTask } from '../src/jsTracker/longTask';
import { injectPv } from '../src/jsTracker/injectPv';
import log from '../src/jsTracker/log';

class JsTracker {
    constructor() {
        this.log = log
        this.config = {
            JS_ERROR: true,
            XHR_ERROR: true,
            PERFORMANCE: false,
            CONSOLE_ERROR: false, //针对vue
            PV: false,
            TIME_ON_PAGE: false, //在线时长
            LONG_TASK: false,
            BLANK_SCREEN: false
        }
    }
    init(config) {
        this.config = config
        this.log.init(config)
        this._init()
    }
    _init() {
        //默认监听js错误、资源请求错误、接口请求错误
        injectJsError();
        injectXHR();
        this.config && this.config.LONG_TASK && injectBlankScreen();
        this.config && this.config.LONG_TASK && longTask();
        this.config && this.config.PERFORMANCE && injectPerf();
        this.config && this.config.PV && injectPv();
        this.config && this.config.CONSOLE_ERROR && injectConsoleError();
    }
}

export default new JsTracker();