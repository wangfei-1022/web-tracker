import tracker from '../util/tracker';
import getLastEvent from '../util/getLastEvent';
import getSelector from '../util/getSelector';
import formatTime from '../util/formatTime';
export function injectJsError() {
    //一般JS运行时错误使用window.onerror捕获处理
    window.addEventListener('error', function (event) {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            tracker.send({//资源加载错误
                kind: 'stability',//稳定性指标
                type: 'error',//resource
                errorType: 'resourceError',
                filename: event.target.src || event.target.href,//加载失败的资源
                tagName: event.target.tagName,//标签名
                timeStamp: formatTime(event.timeStamp),//时间
                selector: getSelector(event.path || event.target),//选择器
            })
        } else {
            tracker.send({
                kind: 'stability',//稳定性指标
                type: 'error',//error
                errorType: 'jsError',//jsError
                message: event.message,//报错信息
                filename: event.filename,//报错链接
                position: (event.lineNo || 0) + ":" + (event.columnNo || 0),//行列号
                stack: getLines(event.error.stack),//错误堆栈
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''//CSS选择器
            })
        }
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以

    //当Promise 被 reject 且没有 reject 处理器的时候，会触发 unhandledrejection 事件
    window.addEventListener('unhandledrejection', function (event) {
        let lastEvent = getLastEvent();
        let message = '';
        let line = 0;
        let column = 0;
        let file = '';
        let stack = '';
        if (typeof event.reason === 'string') {
            message = event.reason;
        } else if (typeof event.reason === 'object') {
            message = event.reason.message;
        }
        let reason = event.reason;
        if (typeof reason === 'object') {
            if (reason.stack) {
                var matchResult = reason.stack.match(/at\s+(.+):(\d+):(\d+)/);
                if (matchResult) {
                    file = matchResult[1];
                    line = matchResult[2];
                    column = matchResult[3];
                }
                stack = getLines(reason.stack);
            }
        }
        tracker.send({//未捕获的promise错误
            kind: 'stability',//稳定性指标
            type: 'error',//jsError
            errorType: 'promiseError',//unhandledrejection
            message: message,//标签名
            filename: file,
            position: line + ':' + column,//行列
            stack,
            selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
        })
    }, true);// true代表在捕获阶段调用,false代表在冒泡阶段捕获,使用true或false都可以
}
function getLines(stack) {
    if (!stack) {
        return '';
    }
    return stack.split('\n').slice(1).map(item => item.replace(/^\s+at\s+/g, '')).join('^');
}