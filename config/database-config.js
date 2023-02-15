const mongoose = require('mongoose');
const connect = async() => {
    await mongoose.connect("mongodb://localhost/chatapp");  //connect to mongo DB server
}

module.exports = connect;