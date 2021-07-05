import log from './log';

export function injectPv() {
    var connection = navigator.connection;
    log.send({
        logType: 'monitor',
        logCode: 'PV',
        logName: 'PV',
        elementType: 'PAGE',
        effectiveType: connection.effectiveType, //网络环境
        rtt: connection.rtt,//往返时间
        screen: `${window.screen.width}x${window.screen.height}`//设备分辨率
    });
    let startTime = Date.now();
    window.addEventListener('unload', () => {
        let stayTime = Date.now() - startTime;
        log.send({
            logType: 'monitor',
            logCode: 'STAY_TIME',
            logName: '在线时长',
            elementType: 'PAGE',
            stayTime
        });
    }, false);

}