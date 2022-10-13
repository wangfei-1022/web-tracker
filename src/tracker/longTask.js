import excuteQueue from '../log/excuteQueue';
import { formatTime } from '../util/index';

export function injectLongTask() {
    new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
            if (entry.duration > 100) {
                requestIdleCallback(() => {
                    excuteQueue.add({
                        logType: 'monitor',
                        logCode: 'LONG_TASK',
                        logName: '卡顿',
                        eventType: lastEvent.type,
                        startTime: formatTime(entry.startTime),// 开始时间
                        duration: formatTime(entry.duration),// 持续时间
                    });
                });
            }
        });
    }).observe({ entryTypes: ["longtask"] });
}