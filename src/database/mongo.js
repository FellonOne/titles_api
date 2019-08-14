const mongoose = require('mongoose');
const {DB_MONGO_PASSWORD, DB_MONGO_USER, APP_DEBUG} = require('../../config');

(async () => {
    try {
        let url = `mongodb://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@auth_mongodb/refresh_tokens?userAdmin=true`;
        if(APP_DEBUG === 'true'){
            url = 'mongodb://auth_mongodb/refresh_tokens';
        }
            
        await mongoose.connect(url, {useNewUrlParser: true});
    } catch (err) {
        global.console.log(err);
    }
})()

module.exports = mongoose;