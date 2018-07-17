// import "../stylesheet/app.css";
import BigNumber from 'bignumber.js';
// import cron from '../../node_modules/cron'
// Import libraries we need.
import {
    default as Web3
} from 'web3';
import { default as contract } from 'truffle-contract'
// var fs = require('fs');
// Import our contract artifacts and turn them into usable abstractions.
import smartcurrency_artifacts from '../../build/contracts/SmartCurrency.json'
// import smartcurrencyE_artifacts from '../../build/contracts/SmartCurrencyE.json'
// import pending from '../../app/javascripts/pending.js'
// MetaCoin is our usable abstraction, which we'll use through the code below.
var SmartCurrency = contract(smartcurrency_artifacts);
// var SmartCurrencyE = contract(smartcurrencyE_artifacts);
// var Account = contract(account_artifacts);
// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
// var account;
var account;
// var test = [];
// var columnDefs = [
//     {headerName: "AccountNumber", field: "accountnumber"},
//     {headerName: "AccountHolderName", field: "accountholdername"},
//     {headerName: "Bank", field: "bank"},
//     {headerName: "Amount", field: "amount"},
//     {headerName: "IssuedDate", field: "issueddate"},
//     {headerName: "Status", field:"status"}
// ];
// var rowData1=[];
// var rowData = [
//     {accountnumber: "24567654", accountholdername: "Risabh", bank:"SBI",amount:"10000",issueddate:"11/11/2017",status:"validation in progress"},
//     {accountnumber: "24534355", accountholdername: "Arun", bank:"ICICI",amount:"1500",issueddate:"12/11/2017",status:"validation in progress"},
//     {accountnumber: "24546467", accountholdername: "Uma", bank:"YES",amount:"2000",issueddate:"13/11/2017",status:"validation in progress"},
// ];
// specify the data
window.App = {
   
    start: function() {
        var self = this;
        // Bootstrap the MetaCoin abstraction for Use.
        //MetaCoin.setProvider(web3.currentProvider);
        SmartCurrency.setProvider(web3.currentProvider);
        // SmartCurrencyE.setProvider(web3.currentProvider);
       
        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }
            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }
          
            accounts = accs;
            account=accounts[0];
            console.log(account);
            // web3.eth.defaultAccount = web3.eth.accounts[0]
           
           
        
            // self.accountStatus();
        });
    },
    setStatus: function(message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },
    
    addDetails:function(){
        var self = this;
        var key = document.getElementById('publicID').value;
        console.log("address...>>>" +key);
        var URL =  document.getElementById('URL').value;
        console.log("address...>>>" +URL);
        var file = "file.jpg"
        console.log(file)
        // var fileInput="/home/rpqb-desk-003/Ethreum-project/app/image/ven.jpg"
        // fileInput.addEventListener('change', function(e) {
        //         var file = fileInput;
        //     console.log(file)
          
        //         var reader = new FileReader();
              
        //         reader.onload = function(e) {
        //           fileDisplayArea.innerText = reader.result;
        //         }
        
        //         reader.readAsText(file);  
        // console.log(file) 
            
        //       // Put the rest of the demo code here.
        //     });
            
        
        // var updateString=[key,URL,file]
   
     
           var rapid;
           SmartCurrency.deployed().then(function(instance) {
               rapid = instance;
               return rapid.StoreDocument(key.toString(),file.toString(),{
                   from: account
               });
          }).then(function(value) {
            console.log("data stored")
                           self.setStatus("Transaction complete!");
                           
                           
               
                       }).catch(function(e) {
                           console.log(e);
                           self.setStatus("Error Approving transaction due to insufficient Balance");
                       });
           console.log(file);
           
        
      
//        console.info('cron job completed');
   
//    cronJob.start();
                    
   
    //     fs.readdir("/home/rpqb-desk-003/Ethreum-project/app/image/", (err, files) => {
    //         console.log(files.length)
    //         if(files.length>0){
    //              var name = files;
    // var file = files;
    // console.log(file) 
    //     var updateString=[fname,manAddrs,venAddrs,tot]
    //             var rapid;
    //     SmartCurrency.deployed().then(function(instance) {
    //         rapid = instance;
    //         return rapid.StoreDocument(key.toString(),name.toString(),updateString.toString(),files.toString(),{
    //             from: account
    //         });
    //    }).then(function(value) {
    //                     self.setStatus("Transaction complete!");
    //                     console.log("data stored")
                        
            
    //                 }).catch(function(e) {
    //                     console.log(e);
    //                     self.setStatus("Error Approving transaction due to insufficient Balance");
    //                 });
                
    //         }
    //         else{
    //             error();
    //         }
    //       files.forEach(file => {
    //         console.log(file);
    //      });
    //    })
    //     var rapid;
    //     SmartCurrency.deployed().then(function(instance) {
    //         rapid = instance;
    //         return rapid.StoreDocument(key.toString(),name.toString(),updateString.toString(),{
    //             from: account
    //         });
    //    }).then(function(value) {
    //                     self.setStatus("Transaction complete!");
    //                     console.log("data stored")
                        
            
    //                 }).catch(function(e) {
    //                     console.log(e);
    //                     self.setStatus("Error Approving transaction due to insufficient Balance");
    //                 })
                    
                },

    RegDetails:function(){
        var self = this;
        var fname = document.getElementById("fname").value;
        console.log("address...>>>" +fname);
        var lname =  document.getElementById("lname").value;
        console.log("address...>>>" +lname);
        var email_id = document.getElementById("email_id").value;
        console.log("lol----",email_id)
        var phno = document.getElementById("phno").value;
        console.log("Coinreciever:------>" + phno);
        var pass = document.getElementById("pass").value;
        console.log("lol----",pass)
        var repass =(document.getElementById("repass").value);
        console.log("lol----",repass)
        var usertype = (document.getElementById("usertype").value);
        console.log("Coinreciever:------>" + usertype);
        
        var updateString=[fname,manAddrs,venAddrs,tot]
        // updateString.toString();
        console.log("lol-------->",updateString);
        var rapid;
        SmartCurrency.deployed().then(function(instance) {
            rapid = instance;
            return rapid.StoreDocument(key.toString(),name.toString(),updateString.toString(),{
                from: account
            });
       }).then(function(value) {
                        self.setStatus("Transaction complete!");
                        console.log("data stored")
                        
            
                    }).catch(function(e) {
                        console.log(e);
                        self.setStatus("Error Approving transaction due to insufficient Balance");
                    });
    },
    
 
 
    myFunction: function() {
        var self = this;
        var key = document.getElementById("mykey").value;
        console.log("address...>>>" +key);
        
        // var balance = new BigNumber(key);
        // console.log(balance);
// or var balance = web3.eth.getBalance(someAddress);
 // toString(10) converts it to a numbe
       var name = document.getElementById("myFile").value;
       console.log("doc" +name);
       // doc.disabled = true;
       var value = "1000"
       this.setStatus("Initiating transaction... (please wait)");
 var updateString = []
    //    console.log(updateString)
   
       var rapid;
       SmartCurrency.deployed().then(function(instance) {
           console.log("manoj");
           rapid = instance;
           console.log("inside....");
           return rapid.StoreDocument(key.toString(),name.toString(),value.toString(),{
               from: account
               
           });
       
        }).then(function(value) {
            self.setStatus("Transaction complete!");
            console.log("data stored")
            
        }).catch(function(e) {
            console.log(e);
            self.setStatus("Error Approving transaction due to insufficient Balance");
        });
       
    
},
AddressGenerator: function() {
    var self = this;

    var meta;

    SmartCurrency.deployed().then(function(instance) {
        meta = instance;
        return meta.AddressGenerator.call(account, {
            from: account
        });
    }).then(function(value) {
        var balance_element = document.getElementById("address");
        balance_element.innerHTML = value.valueOf();
        // alert("Keep Your Account Number Safe");
    }).catch(function(e) {
        console.log(e);

    });
},


getStatus: function(){
    var key = (document.getElementById("mykey").value);
       
           console.log(key)
    var self = this;
    var rapid;
    
    SmartCurrency.deployed().then(function(instance){
        rapid = instance;
        
           
            
        return rapid.documentStructs.call(key,{
            from: account
        
        });
    
    }).then(function(value) {
        console.log("manoj",value)
        var print = document.getElementById("getStatus");
        print.innerHTML = value.toString();

        // console.log("print",print.innerHTML);
        var dateArray = print.innerHTML.split(',');
        console.log("output",dateArray);
        $('#printbox').html($(dateArray[0]))
        var docs = dateArray[0];
        document.getElementById("docs").innerHTML = docs;
        var name = dateArray[1];
        document.getElementById("name").innerHTML = name;
        var manAddrs = dateArray[2];
        document.getElementById("manAddrs").innerHTML = manAddrs;
        var venAddrs = dateArray[3];
        document.getElementById("venAddrs").innerHTML = venAddrs;
        var tot = dateArray[4];
        document.getElementById("tot").innerHTML = tot;
        console.log(name);
        console.log(manAddrs);
        console.log(venAddrs);
     
    }).catch(function(e) {
        console.log(e);
        self.setStatus("Error getting balance; see log.");
    });
},
}
 
window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
            // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        
    }
      
    App.start();
});