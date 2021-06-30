import { injectJsError } from '../src/webTracker/jsError';
import { injectXHR } from '../src/webTracker/xhr';
import { injectConsoleError } from "./webTracker/console"
import { injectBlankScreen } from '../src/webTracker/blankScreen';
import { injectPerf } from './webTracker/perf';
import { injectLongTask } from '../src/webTracker/longTask';
import { injectPv } from '../src/webTracker/pv';
import log from '../src/webTracker/log';
import { merge } from './util/index'

class WebTracker {
    constructor() {
        this.log = log;
        this.config = {
            PV: false,
            PERFORMANCE: false,  //性能
            JS_ERROR: true,      //JS
            XHR_ERROR: true,       //接口请求
            CONSOLE_ERROR: false, //针对vue
            TIME_ON_PAGE: false, //在线时长
            LONG_TASK: false,  //卡顿
            BLANK_SCREEN: false //白屏
        };
    }
    init(config) {
        this.config = merge(this.config, config);
        this.log.init(this.config);
        this._init();
    }
    _init() {
        //默认监听js错误、资源请求错误、接口请求错误
        injectJsError();
        injectXHR();
        this.config && this.config.BLANK_SCREEN && injectBlankScreen();
        this.config && this.config.LONG_TASK && injectLongTask();
        this.config && this.config.PERFORMANCE && injectPerf();
        this.config && this.config.PV && injectPv();
        this.config && this.config.CONSOLE_ERROR && injectConsoleError();
    }
}

export default new WebTracker();