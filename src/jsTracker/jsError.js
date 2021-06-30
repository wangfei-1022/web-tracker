import log from './log';
import { getLastEvent, getSelector, formatTime } from '../util/index';

export function injectJsError() {
    window.addEventListener('error', function (event) {
        let lastEvent = getLastEvent();
        if (event.target && (event.target.src || event.target.href)) {
            Log.send({
                kind: 'STABILITY',
                type: 'ERROR',
                errorType: 'RESOURCE_ERROR',
                filename: event.target.src || event.target.href,
                tagName: event.target.tagName,
                timeStamp: formatTime(event.timeStamp),
                selector: getSelector(event.path || event.target),
            })
        } else {
            log.send({
                kind: 'STABILITY',
                type: 'ERROR',
                errorType: 'JS_ERROR',
                message: event.message,
                filename: event.filename,
                position: (event.lineNo || 0) + ":" + (event.columnNo || 0),
                stack: getLines(event.error.stack),
                selector: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
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
        log.send({
            kind: 'STABILITY',
            type: 'ERROR',
            errorType: 'PROMISE_ERROR',
            message: message,
            filename: file,
            position: line + ':' + column,
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