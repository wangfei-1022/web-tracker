import log from './log';
import { getStackLines } from '../util/index';

export function injectConsoleError() {
    console.error = function (origin) {
        return function (info) {
            if (typeof info === 'string') {
                log.send({
                    logType: 'monitor',
                    type: 'ERROR',
                    logCode: 'CONSOLE_ERROR',
                    logName: '控制台错误',
                    message: info,
                    elementType: 'page'
                })
            } else if (typeof info === 'object') {
                log.send({
                    logType: 'monitor',
                    logCode: 'CONSOLE_ERROR',
                    logName: '控制台错误',
                    message: info.message,
                    stack: getStackLines(info.stack),
                    elementType: 'page'
                })
            }

            origin.call(console, info);
        };
    }(console.error);
}