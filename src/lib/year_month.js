module.exports = {
    now: () => {
        const date = new Date();
        const month = (parseInt(date.getMonth()+1, 10) < 10) ? `0${parseInt(date.getMonth()+1, 10)}` : (parseInt(date.getMonth()+1, 10));
        const year = parseInt(date.getFullYear(), 10);
    
        const yearMonth = `${year}${month}`;
        return yearMonth;
    }
}