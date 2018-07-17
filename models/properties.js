'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const propertiespageSchema = mongoose.Schema({
   
   
    usertype:  String,
    status: String,
    Key: String,
    sndKey: String,
    publicKey:String,
    privateKey:String,
    IndexNumber: String,
    URL: String,
    count: String
});
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/digitalId', { useMongoClient: true });
    mongoose.connect('mongodb://harini:Harini!96@ds119406.mlab.com:19406/mortgage', {
        useNewUrlParser: true
    // useMongoClient: true
});
module.exports = mongoose.model('properties', propertiespageSchema);