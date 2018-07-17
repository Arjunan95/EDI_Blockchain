const user = require('../models/registerether'); 

exports.getupdate = ( usertype,url,status,count) => {

    return new Promise((resolve, reject) => {
        console.log("Entering in to the function")
        console.log("outboxarjun")
        user.findOneAndUpdate({
            usertype:usertype,
            // url:url
            
           
        }, {
            $set: {
            status:status,
             count:count

            }
        }, {
            new: true
        })
            .then(users => {
                // console.log("users", users)
               
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
};