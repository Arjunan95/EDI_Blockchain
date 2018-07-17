var cors = require('cors');
var mongoose = require('mongoose');
var Promises = require('promise');
var PromiseA = require('bluebird').Promise;
var ursa = require('ursa');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var path = require('path');
var jsdom = require("jsdom");
var http = require('http');
var n = 0;
var count = 0
$ = require('jquery')(new jsdom.JSDOM().window);
const Nexmo = require('nexmo');
//var ipfs = require('ipfs-api')

const nodemailer = require('nodemailer');
// const User = require('./functions/getUser');
const registerUser = require('./functions/registerUser');
const login = require('./functions/login');
const getallkey = require('./functions/getallkey');
const outbox = require('./functions/outbox');
const fetchkey = require('./functions/fetchkey');
const geturl = require('./functions/geturl');
// const fetchkey = require('./functions/fetchkey');
const filereader = require('./functions/filereader');
const getStatus = require('./functions/getStatus');
const getupdate = require('./functions/getupdate');
const newLogin = require('./functions/newLogin');
const keygeneration = require('./functions/keygeneration');
const User = require('./functions/getUser');
var fs = require('fs');
var bitcore = require('bitcore-lib');
var ECIES = require('bitcore-ecies');
var sha256 = require('js-sha256');
var ipfsAPI = require('ipfs-api');
const registerEthers = require("./models/registerether");

var cors = require('cors');
var mongoose = require('mongoose');
var Promises = require('promise');
var cloudinary = require('cloudinary').v2;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
// var mailer = require('express-mailer');
const getotp = require('./functions/getotp');
// const User = require('./functions/getUser');
const mail = require('./functions/mail');
const getkey = require('./functions/getkey');

const SendOtp = require('sendotp');
const sendOtp = new SendOtp('209235Abkzi8ZW2sr5acc5d6f');
const nodecipher = require('node-cipher');
var ipfsAPI = require('ipfs-api');
var output;
var ipfs = ipfsAPI('localhost', 5001)
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

const EthereumEncryption = require('ethereum-encryption');




const nexmo = new Nexmo({
    apiKey: 'be214ba0',
    apiSecret: 'F0WCG2adz2udXrCB'
});
var output;



module.exports = router => {
    router.post('/filereader', cors(), (req, res) => {

        // console.log("ui",req.body)
        const URL = req.body.url;
        console.log(URL);
        var usertype = req.body.usertype;
        console.log(usertype);
        const sndKey = req.body.sndKey;
        console.log(sndKey);
        // var password = req.body.sndKey;
        const Key = req.body.manadd;
        console.log(Key);
        const publicKey = req.body.publickey;
        console.log(publicKey);
    
        const status = req.body.status;
        console.log(status);
        var url = req.body.path;
        console.log("path", url);
        count = count + 1;
        console.log(count);

        var demo = {
            URL: URL,
            usertype: usertype,
            sndKey: sndKey,
            Key: Key,
            publicKey: publicKey,
            status: status,

        }
        outbox
            .outboxUser(URL, usertype, sndKey, Key, publicKey, status)
            .then(result => {
                //  console.log("outboxresult",result)
                var status = "delivered"
                console.log("status", status)
                getupdate.getupdate(usertype, url, status, count)
                    .then(result => {
                        //    console.log("outboxresult",result)
                    })

            })


       

        var fs = require('fs');
    

        fs.readFile('file.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                // console.log("data123", data);
                var obj;
                var json;
                obj = JSON.parse(data); //now it an object
                obj.jsonFileData.push(demo); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('file.json', json, 'utf8', (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                    var testObj = JSON.parse(fs.readFileSync('file.json', 'utf8'));
                    console.log("testObj=====================>", testObj);
                    var arr = obj;
                    console.log(arr.jsonFileData);
                    var json = arr.jsonFileData;
                    console.log("jsonlength123?????????>>>>>", json.length);
                    var i, counter = 0;
                    for (i = 0; i <= json.length - 1; i++) {
                        var message = json[i];
                        // console.log("1234",message)
                    }

                    var cron = require('node-cron');

                    cron.schedule('*/1 * * * *', function() {

                        //do some work
                        var sndKey = message.sndKey;
                        console.log(sndKey)
                        var publicKey = message.publicKey;
                        console.log(publicKey)
                        // console.log("arjun")
                        fs.readdir(message.URL, (err, data) => {

                            data.forEach(data => {
                                if (data)
                                    // console.log("data", data);
                                    var file = data;

                                fs.readFile(message.URL + "/" + file, function(err, data) {

                                    var data = data.toString('base64');
                                    console.log(message.URL + "/" + file)
                                    console.log("manoj")
                                    //Encrypting the file
                                    const publicKey = message.publicKey;
                                    console.log("publickey", publicKey);
                                  
                                    const encrypted = EthereumEncryption.encryptWithPublicKey(publicKey, data);
                                  
                                    var crypted = Buffer(encrypted);
                                   //encrypted file sending into IPFS
                                    ipfs.files.add(crypted, (err, result) => { // Upload buffer to IPFS
                                        if (err) {
                                            console.error(err)
                                            return
                                        }
                                        let url = `${result[0].hash}`
                                        //https://ipfs.io/ipfs/
                                        console.log("url", url)

                                        var name = url;
                                        console.log(file)

                                        fs.unlink(message.URL + "/" + file, (err) => {
                                            if (err) throw err;
                                            console.log('successfully deleted /tmp/hello');
                                        });

                                        console.log(file)
                                   


                                        //entering into the web3.js

                                        filereader
                                            .filereader(URL, sndKey, url, usertype, publicKey)
                                            .then(result => {



                                                res.send({
                                                    "message": "Transaction Complete",
                                                    "status": true,



                                                })

                                            })




                                    })
                                })

                            })
                        })

                    })

                })

                // });  
            }
        });




    })


    ///****************************WEB3JS***************************************************************************



    //do some work




    // })




    //  console.log('running a task every two minutes');
    // });

    router.post('/keygenerator', cors(), (req, res) => {

        // var url = req.body.url;
        // console.log("url",url);
        var usertype = req.body.usertype;
        console.log("url", usertype);
        var privatekey = req.body.privatekey;
        console.log(privatekey);
        const publickey = EthereumEncryption.publicKeyFromPrivateKey(
            privatekey
        );
        console.log(publickey);
        keygeneration
            .keygeneration(usertype, privatekey, publickey)
            .then(result => {
                console.log("resultharini", result);

                res.send({
                    "message": " Stored Successful",
                    "result": result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });

    router.post('/fetchallkey', cors(), (req, res) => {

        var usertype = req.body.usertype;
        console.log("url", usertype);


        getallkey
            .getallkey(usertype)
            .then(result => {
                console.log("resultharini", result);

                res.send({
                    "message": " Stored Successful",
                    "result": result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });

    router.post('/getAck', cors(), (req, res) => {
        var key = req.body.Key;
        console.log(key);
        var ack = req.body.ack
        console.log(ack);
        if (!ack) {
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });
        } else {

            getAck
                .getAck(key, ack)
                .then(function(result) {

                    res.send({
                        "message": "Transaction complete",
                        "status": true,



                    });


                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }).json({
                    status: err.status

                }));
        }
    });



    router.post('/getStatus', cors(), (req, res) => {


        var self = this;
        var sndKey = req.body.sndKey;
        console.log(sndKey)
        var privateKey = req.body.privateKey;
        console.log(privateKey)

        var status = req.body.status;
        console.log("status", status);
        n = n + 1;
        console.log("nvalue", n);
        var IndexNumber = "";
        console.log(IndexNumber);

        for (var i = 0; i <= n; i++)
            IndexNumber = i;
        console.log("numvalue123", n)
        console.log("Indexnumber", IndexNumber)


        fetchkey
            .fetchkey(sndKey, status, IndexNumber)
            .then(function(result) {
                console.log(result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            // Entering into web3.js

        getStatus
            .getStatus(sndKey, privateKey, IndexNumber)
            .then(function(result) {
                console.log(result)

                res.send({
                    "message": result.message[1],
                    "status": true,



                })
            // Downloading files from IPFS
                ipfs.files.cat(result.message[1], function(err, data) {
                    if (err) throw err;
            // Decrypting the file
                    var encryptedfile = data.toString();
                    const message = EthereumEncryption.decryptWithPrivateKey(
                        privateKey, encryptedfile // privateKey
                        // encrypted-data
                    );
                    // console.log("message",message)


                // writing a file into a specified location

                    var URL = "/home/rpqb-desk-003/Aidant_received"
                    const file = result.message[1];
                 
                    console.log("Enter in to the received ")
                    fs.writeFile(URL + "/" + file, message, 'base64', (err) => {
                        if (err) throw err;
                        console.log('Data written to file');

                    }); // write it back 

                    // write it back 
                })


            })

    })
    // })
            .createHash('sha256')
            .update(password)
            .digest('base64');
            console.log("pwd",rpwd);//encryption


        const usertype = req.body.usertype;
        console.log("harini123..<<<", usertype);
        const phonenumber = req.body.phonenumber;
        console.log("phone", phonenumber);
       
        const accountaddress = req.body.accountaddress;
        console.log("accountaddress", accountaddress);
        var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
            otp += possible.charAt(Math.floor(Math.random() * possible.length));
        console.log("otp" + otp);
        var encodedMail = new Buffer(req.body.email).toString('base64');

        if (!firstname || !lastname || !phonenumber || !email || !pwd || !rpwd || !usertype || !accountaddress) {
            res.status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {

            registerUser.registerUser(companyname, firstname, lastname, phonenumber, email, pwd, rpwd, usertype, encodedMail, otp, accountaddress)
                .then(result => {
                    var encodedMail = new Buffer(req.body.email).toString('base64');
                    var transporter = nodemailer.createTransport({
                        host: 'smtp.office365.com',
                        port: 587,
                        secure: false,
                        auth: {
                            user: "manoj.venkateswararaja@rapidqube.com",
                            pass: "Rpqb@123"
                        }
                    });
                    var remoteHost = "119.81.59.59:8000"
                    var link = "http://" + remoteHost + "/email/verify?mail=" + encodedMail;
                    console.log(link);
                    var otptosend = otp;
                    var mailOptions = {
                        transport: transporter,
                        from: "Aidant Service" + "<manoj.venkateswararaja@rapidqube.com>",
                        to: email,
                        subject: 'Aidant Service-OTP Confirmation',

                        html: "Hello,<br> Your Otp is.<br> " + otp
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log("Mail send error: ", error);
                        }
                    });

                    //  sendOtp.send(phonenumber, "AIDANT", otp, function(error, data, response) {
                    //                         console.log(data);
                    //                         console.log("response",response)
                    //                          console.log(otp, "otp")

                    //                       });


                    var otptosend = 'your otp is ' + otp;
                    console.log(otptosend, "otp")
                    if (!phonenumber) {
                        res
                            .status(400)
                            .json({
                                message: 'Invalid Request !'
                            });

                    } else {
                        console.log("entering in to the else part");
                        User
                            .getUser(email, phonenumber, otp)
                            .then(result => {
                                res
                                    .status(result.status)
                                    .json({
                                        message: result.message,
                                        phonenumber: phonenumber,
                                    });

                            })
                            .catch(err => res.status(err.status).json({
                                message: err.message
                            }).json({
                                status: err.status
                            }));

                    }
                })


        }
    

    router.post('/mail', cors(), (req, res) => {



        var email = req.body.email;
        console.log("email", email);
        var otp = req.body.otp;
        console.log("otp", otp);


        if (!email || !otp) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {
            var encodedMail = new Buffer(req.body.email).toString('base64');
            var transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                    user: "manoj.venkateswararaja@rapidqube.com",
                    pass: "Rpqb@123"
                }
            });
            var remoteHost = "119.81.59.59:8000"
            var link = "http://" + remoteHost + "/email/verify?mail=" + encodedMail;
            console.log(link);
            var otptosend = otp;
            var mailOptions = {
                transport: transporter,
                from: '"Aidant Service"<manoj.venkateswararaja@rapidqube.com>',
                to: email,
                subject: 'OTP Confirmation',

                html: "Hello,<br> Your Otp is.<br> " + otp
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Mail send error: ", error);
                }
            });
            mail
                .mail(email, otp)
                .then(result => {
                    res
                        .status(result.status)
                        .json({
                            message: result.message
                        });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });



    router.post('/otp', cors(), (req, res) => {

        console.log("UI123......", req.body)

        const otp = req.body.otp;



        if (!otp) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {



            //var status = result.usr[0]._doc.status

            newLogin
                .newLogin(otp)

                .then(result => {
                    console.log("harini123...>>>", result);

                    res
                        .status(result.status)
                        .json({
                            message: result.message,

                        });

                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });
    router.post('/mail', cors(), (req, res) => {



        var email = req.body.email;
        console.log("email", email);
        var otp = req.body.otp;
        console.log("otp", otp);


        if (!email || !otp) {

            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });

        } else {
            var transporter = nodemailer.createTransport("SMTP", {
                host: 'smtp.office365.com',
                port: 587,
                secure: true,
                auth: {
                    user: "manoj.venkateswararaja@rapidqube.com",
                    pass: "Rpqb@123"
                }
            });

            var mailOptions = {
                transport: transporter,
                from: 'manoj.venkateswararaja@rapidqube.com',
                to: email,
                subject: 'Document requirnment',

                html: "Chennai Super Kings"
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {}
            });


            mail
                .mail(email, otp)
                .then(result => {
                    res
                        .status(result.status)
                        .json({
                            message: result.message
                        });
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
        }
    });




    router.post('/login', cors(), (req, res) => {
        console.log("entering login function in functions ");
        const emailid = req.body.email;
        console.log(emailid);
        const passwordid = req.body.password;
        console.log(passwordid);
        const pwd = crypto
            .createHash('sha256')
            .update(passwordid)
            .digest('base64');
        console.log("pwd", pwd); //encryption


        login
            .loginUser(emailid, pwd)
            .then(result => {
                console.log("resultharini", result);
                console.log("logesh ===>>>", result.users.usertype)
                console.log("Arjun ===>>>", result.users.firstname)
                console.log("Arjun ===>>>", result.users.status)



                res.send({
                    "message": "Login Successful",
                    "status": true,
                    "usertype": result.users.url,
                    "status": result.users.status,
                    "email": result.users.email,
                    "result": result

                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });




    router.post('/outbox', cors(), (req, res) => {
        console.log("entering outbox  functions ");
        const url = req.body.url;
        console.log(url);
        const usertype = req.body.usertype;
        console.log(usertype);
        const publicKey = req.body.publicKey;
        console.log(publickey);
        const Key = req.body.manadd;
        console.log(Key);
        const venpublickey = req.body.vendorkey;
        console.log(venpublickey);
        const status = req.body.status;
        console.log(status);

        outbox
            .outboxUser(url, usertype, publicKey, Key, venpublickey, status)
            .then(result => {
                // console.log("resultharini", result);

                res.send({
                    "message": " Stored Successful",
                    status: result.status,

                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }).json({
                status: err.status
            }));

    });
    router.post('/fetchkey', cors(), (req, res) => {

        console.log(req.body);
        var sndKey = req.body.sndKey;
        console.log("publickey", sndKey);
        var privateKey = req.body.privateKey;
        console.log("publickey", privateKey);
        var IndexNumber = req.body.IndexNumber;
        console.log("publickey", IndexNumber);
        var status = req.body.status;
        console.log("status", status);

        fetchkey
            .fetchkey(sndKey, status)
            .then(function(result) {
                console.log(result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    });

    router.post('/file', cors(), (req, res) => {

        const URL = req.body.url;
        console.log(URL);
        var usertype = req.body.usertype;
        console.log(usertype);
        const Key = req.body.Key;
        console.log(Key);
        var demo = {
            URL: URL,
            usertype: usertype,
            Key: Key
        }



        //  obj.jsonFileData.push({id: 1, square:2});

        //  var json = JSON.stringify(obj);

        var fs = require('fs');
        //  fs.writeFile('myjsonfile.json', json, (err) => {  
        //     if (err) throw err;
        //     console.log('Data written to file');
        // });

        fs.readFile('config.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                console.log("data123", data);
                var obj;
                var json;
                obj = JSON.parse(data); //now it an object
                obj.jsonFileData.push(demo); //add some data
                json = JSON.stringify(obj); //convert it back to json
                fs.writeFile('config.json', json, 'utf8', (err) => {
                    if (err) throw err;
                    console.log('Data written to file');
                    res.status(200).json({
                        message: "upload done"
                    });
                }); // write it back 

            }
        });

    })

    router.post('/getkey', cors(), (req, res) => {

        console.log(req.body);
        var usertype = req.body.usertype;
        console.log("publickey", usertype);


        getkey
            .getkey(usertype)
            .then(function(result) {
                console.log(result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    });

    router.post('/geturl', cors(), (req, res) => {

        console.log(req.body);
        var status = req.body.status;
        console.log("status", status);
        var url = req.body.url;
        console.log("url", url);
        var email = req.body.email;
        console.log("email", email);
        geturl
            .geturl(status, url, email)
            .then(function(result) {
                console.log(result)

                res.send({
                    status: result.status,
                    message: result.usr
                });
            })
            .catch(err => res.status(err.status).json({
                message: err.message
            }));


    });

    //router.get('/companyid',cors(),async(req,res) =>{
    //const companyid= await registerEthers.findOne({ email:req.body.email})
    //     .select('usertype');
    //     res.send(companyid)

    // });
}
