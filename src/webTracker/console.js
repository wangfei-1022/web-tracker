import log from './log';

export function injectConsoleError() {
    console.error = function (origin) {
        return function (info) {
            if(typeof info === 'string'){
                Log.send({
                    kind: 'STABILITY',
                    type: 'ERROR',
                    errorType: 'CONSOLE_ERROR',
                    message: info
                })
            }else if(typeof info === 'object'){
                Log.send({
                    kind: 'STABILITY',
                    type: 'ERROR',
                    errorType: 'CONSOLE_ERROR',
                    message: info.message,
                    stack: info.stack
                })
            }
            origin.call(console, info);
        };
    }(console.error);
}