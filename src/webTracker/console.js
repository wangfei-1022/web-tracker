import log from './log';

export function injectConsoleError() {
    console.error = function (origin) {
        return function (info) {
            Log.send({
                kind: 'STABILITY',
                type: 'ERROR',
                errorType: 'CONSOLE_ERROR',
                desc: info
            })
            origin.call(console, info);
        };
    }(console.error);
}