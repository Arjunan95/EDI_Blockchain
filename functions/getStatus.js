var web3 = require('web3')
var web3SocketProvider = new web3.providers.HttpProvider('http://localhost:8545');
const web3Obj = new web3(web3SocketProvider);
var contract = require("../node_modules/truffle-contract");
const smartcurrency_artifacts = require('../build/contracts/SmartCurrency.json')
var SmartCurrency = contract(smartcurrency_artifacts);
const web3js = new web3(web3SocketProvider);




// change provider

var accounts;
// var account;
var account;




module.exports.getStatus = (sndKey, privateKey, IndexNumber) => new Promise((resolve, reject) => {

    var globalVariable = {
        key: [sndKey, privateKey, IndexNumber]
    };
    //  var sndKey = reckey
    //  console.log(sndKey)

    console.log("entering into the web3.js fnc");
    console.log("files.......,", sndKey)

    var _who = sndKey;
    console.log("address", _who);
    var _index = IndexNumber
    console.log("uint256", _index);
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




    var rapid;

    // Entering into solidity and this is read function
    SmartCurrency.deployed().then(function(instance) {
        rapid = instance;
        console.log("manoj")
        console.log("who,", _who)
        console.log("index", _index)


        return rapid.getMessageByIndex.call(_who, _index, {
            from: account


        });




    }).then((value) => resolve({
        status: 201,
        message: value

    }))




});




function window() {
    // window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        web3 = new web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new web3(new web3.providers.HttpProvider("http://localhost:8545"));



    }

    // })
}
