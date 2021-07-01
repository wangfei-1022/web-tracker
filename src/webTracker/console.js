import log from './log';
import { getStackLines } from '../util/index';

export function injectConsoleError() {
    console.error = function (origin) {
        return function (info) {
            if (typeof info === 'string') {
                log.send({
                    kind: 'STABILITY',
                    type: 'ERROR',
                    errorType: 'CONSOLE_ERROR',
                    message: info
                })
            } else if (typeof info === 'object') {
                log.send({
                    kind: 'STABILITY',
                    type: 'ERROR',
                    errorType: 'CONSOLE_ERROR',
                    message: info.message,
                    stack: getStackLines(info.stack)
                })
            }

            origin.call(console, info);
        };
    }(console.error);
}