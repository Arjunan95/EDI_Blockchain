'use strict';

const user = require('../models/properties');  
// const user = require('../models/fetchdata');

exports.outboxUser = (URL,usertype,sndKey,Key,publicKey,status) => {
    return new Promise((resolve, reject) => {

    const newUser = new user({

       URL:URL,
       usertype:usertype,
       sndKey:sndKey,
       Key:Key,
       publicKey:publicKey,
        status:status,
    
     
   
    });
    newUser
    .save()
    .then(() => resolve({status: 201, message: 'Stored successfully', status:status}))
            .catch(err => {
    
                    reject({status: 500, message: err});
                })
            });
}