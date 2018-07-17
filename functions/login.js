'use strict';

const user = require('../models/registerether');
exports.loginUser = (email, pwd) =>

    new Promise((resolve, reject) => {
    

        console.log("Entering into login fun");
        console.log(email);
        user.find({
                "email": email ,
            
            })
            .then(users => {
                const dbpin = users[0].pwd;
                console.log(users[0].pwd)
                console.log(users[0]._id)
                console.log(dbpin + "   " + users[0].pwd)

                if (String(pwd) === String(dbpin)) {

                    resolve({
                        status: 200,
                        users: users[0]
                    });

                } else {

                    reject({
                        status: 401,
                        message: 'Invalid Credentials !'
                    });
                }
            })


    });