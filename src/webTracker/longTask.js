import log from './log';
import { formatTime, getLastEvent, getSelector } from '../util/index';

export function injectLongTask() {
    new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
            if (entry.duration > 100) {
                let lastEvent = getLastEvent();
                requestIdleCallback(() => {
                    log.send({
                        logType: 'monitor',
                        logCode: 'LONG_TASK',
                        logName: '卡顿',
                        eventType: lastEvent.type,
                        startTime: formatTime(entry.startTime),// 开始时间
                        duration: formatTime(entry.duration),// 持续时间
                        elementType: lastEvent ? getSelector(lastEvent.path || lastEvent.target) : ''
                    });
                });
            }
        });
    }).observe({ entryTypes: ["longtask"] });
}