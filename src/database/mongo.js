const mongoose = require('mongoose');
const {DB_MONGO_PASSWORD, DB_MONGO_USER, DB_MONGO_HOST, APP_DEBUG} = require('../../config');

(async () => {
    try {
        let url = `mongodb://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/refresh_tokens?userAdmin=true`;
        if(APP_DEBUG.toLowerCase() === 'true'){
            url = 'mongodb://127.0.0.1/refresh_tokens';
        }
        
        await mongoose.connect(url, {useNewUrlParser: true});
    } catch (err) {
        global.console.log(err);
    }
})()

module.exports = mongoose;