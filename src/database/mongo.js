const mongoose = require('mongoose');
const cf = require('../../config');

mongoose.set('useCreateIndex', true);
(async () => {
    try {
        let connect = `mongodb://${cf.DB_MONGO_HOST}:${cf.DB_MONGO_PASSWORD}@${cf.DB_MONGO_HOST}/${cf.DB_MONGO_BASE}?userAdmin=true`;
        if(cf.APP_DEBUG === 'true'){
            connect = `mongodb://${cf.DB_MONGO_HOST}/${cf.DB_MONGO_BASE}`;
        }

        await mongoose.connect(connect, {useNewUrlParser: true});
    } catch (err) {
        global.console.log(err);
    }
})()

module.exports = mongoose;