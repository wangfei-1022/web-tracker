import log from './log';

class ExcuteQueue {
    constructor() {
        this.state = 'NULL';
        this.list = [];
    }

    add(data, callback) {
        this.list.push({
            data,
            callback
        })
        if (this.state !== 'RUNING') {
            this.state = 'RUNING';
            this.next();
        }
    }

    run(){
        this.state = 'RUNING';
        this.next();
    }

    next() {
        var item = this.list.shift();
        if (item && item.data) {
            log.send(item.data, () => {
                this.state = 'NULL';
                if(item.callback && typeof item.callback == 'function'){
                    item.callback();
                }
            })
        }
    }
}

export default new ExcuteQueue()