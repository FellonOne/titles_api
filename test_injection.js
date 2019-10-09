const conf = require('./config');
conf.APP_ENV = 'test';

const s1 = require('./test/tree/structure_1');
const s2 = require('./test/tree/structure_2');
const s3 = require('./test/tree/structure_3');

console.log('ENJECTION')
const start = async () => {
    await s1();
    await s2();
    await s3();
}

start().then(() => console.log('end enjections'));
