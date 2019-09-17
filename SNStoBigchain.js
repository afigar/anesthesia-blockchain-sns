'use strict';
const driver = require('bigchaindb-driver');
const serverless = require('serverless-http');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});

const alice = new driver.Ed25519Keypair();
const conn = new driver.Connection('http://test-bigchaindb.for-our.info:9984/api/v1/');

function addslashes(string) {
  return string.replace(/\\/g, '\\\\').
      replace(/\u0008/g, '\\b').
      replace(/\t/g, '\\t').
      replace(/\n/g, '\\n').
      replace(/\f/g, '\\f').
      replace(/\r/g, '\\r').
      replace(/'/g, '\\\'').
      replace(/"/g, '\\"');
};

module.exports.handler = async (event) => {
  const auxmessage = event.Records[0].Sns.Message;
  console.log('Message received from SNS:', auxmessage); 
  const tx = driver.Transaction.makeCreateTransaction(
   {
      datetime: new Date().toString(),
      location: 'Maternity',
      or: 'or#11',
      device: {
          model: 'Philips Intellivue MP40',
          id: '0009FB04D99B',
      }
   },
  
   { datetime: new Date().toString(),
      location: 'Maternity',
      or: 'or#11',
      device: {
          model: 'Philips Intellivue MP40',
          id: '0009FB04D99B',
      },
      message: auxmessage
    },
    [ driver.Transaction.makeOutput(
        driver.Transaction.makeEd25519Condition(alice.publicKey))],
    alice.publicKey)
      const txSigned = driver.Transaction.signTransaction(tx, alice.privateKey)
      await conn.postTransactionCommit(txSigned).then(function(retrievedTx){
      },function(err){
        console.log(err)
      });
  const result = txSigned
  console.log(txSigned)
  return result
}

