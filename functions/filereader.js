var web3 = require('web3')
var web3SocketProvider = new web3.providers.HttpProvider('http://localhost:8545');
const web3Obj = new web3(web3SocketProvider);
var contract = require("../node_modules/truffle-contract");
const smartcurrency_artifacts = require('../build/contracts/SmartCurrency.json')
var SmartCurrency = contract(smartcurrency_artifacts);




// change provider

var accounts;
// var account;
var account;




module.exports.filereader = (URL, sndKey, url, usertype, publicKey) => new Promise((resolve, reject) => {

    var globalVariable = {
        files: [URL, sndKey, url, usertype, publicKey]
    };

    console.log("entering into the web3.js fnc");
    console.log("files.......,", url)

    SmartCurrency.setProvider(web3SocketProvider);

    web3Obj.eth.getAccounts(function(err, accs) {
        if (err != null) {
            alert("There was an error fetching your accounts.");
            return;
        }

        if (accs.length == 0) {
            alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
            return;
        }

        accounts = accs;
        account = accounts[0];
        console.log(account);

    });
    var _to = sndKey;
    console.log(_to)
    var _text = url;
    console.log(_text)

    var rapid;
    console.log("manoj")
    // Entering into solidity
    SmartCurrency.deployed().then(function(instance) {
            // console.log("entering into solidity",Key)
            console.log("entering into solidity", _to)
            console.log("entering into solidity", _text)
            // console.log("entering into solidity",pubKey)
            rapid = instance;


            return rapid.sendMessage(_to, _text, {
                from: account

            });

        }).then(() => resolve({
            status: 201,
            message: "Transaction Complete"

        }))

        .catch(err => {

            if (err.code == 11000) {

                reject({
                    status: 409,
                    message: ' file not found !'
                });

            } else {
                console.log("error occurred" + err);

                reject({
                    status: 500,
                    message: 'Internal Server Error !'
                });
            }
        });

})
