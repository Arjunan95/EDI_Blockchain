'use strict';

const user = require('../models/registerether');

exports.getallkey = (usertype) =>

    new Promise((resolve, reject) => {



        console.log("Entering into login fun");

        user.find({
           
            usertype:usertype
             
        }) 
            
            .then(users => {
                console.log("users", users)
               
                resolve({
                    status: 201,
                    usr: users
                })

            })
            .catch(err => {

                if (err.code == 11000) {

                    return reject({
                        status: 409,
                        message: 'cant fetch !'
                    });

                } else {
                    console.log("error occurred" + err);

                    return reject({
                        status: 500,
                        message: 'Internal Server Error !'
                    });
                }
            })
    })