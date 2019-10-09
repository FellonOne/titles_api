const moment = require('moment');

const previous = (index) => {
    index+=1;
    const today = moment();
    const needDate = today.add(-index, 'month');

    const month = (parseInt(needDate.month()+1, 10) < 10) ? `0${parseInt(needDate.month()+1, 10)}` : (parseInt(needDate.month()+1, 10));
    const year = parseInt(needDate.year(), 10);
    const yearMonth = `${year}${month}`;
    return yearMonth;
}

const now = () => {
    return previous(0);
    const date = new Date();
    const month = (parseInt(date.getMonth()+1, 10) < 10) ? `0${parseInt(date.getMonth()+1, 10)}` : (parseInt(date.getMonth()+1, 10));
    const year = parseInt(date.getFullYear(), 10);

    const yearMonth = `${year}${month}`;
    return yearMonth;
}

module.exports = {
    now,
    previous
}