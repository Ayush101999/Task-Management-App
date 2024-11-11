const mongoose = require('mongoose')
const mongURI = "mongodb://127.0.0.1:27017/taskManagement"


/* This function connects to MongoDB using the URI specified in the mongURI variable. */
const connectToMongo = ()=>{
    const status = mongoose.connect(mongURI);
    console.log("connect sucessfully", status);
}

module.exports = connectToMongo;