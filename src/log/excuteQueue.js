import log from './log';

class ExcuteQueue {
    constructor() {
        this.state = 'NULL';
        this.list = [];
    }

    add(data) {
        this.list.push(data)
        if (this.state !== 'RUNING') {
            this.next()
            this.state = 'RUNING';
        }
    }

    next() {
        var data = this.list.shift()
        if (data) {
            log.send(data, () => {
                this.state = 'NULL'; 
            })
        }
    }
}

export default new ExcuteQueue()