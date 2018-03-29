"use strict";

console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./db-interaction"),
    dom = require("./dom-builder"),
    user = require("./user");

let results = {
    user : user.getUserObj(),
    game_name : null,
    game_result : null
    };

    //POST results of quiz to user profile 
function getResult(uid){
    console.log("line 125 of results.js: what is user uid in results?", uid);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${uid}"`
    }).done((resultsUid) => {
        console.log("Results.js line 23: getResults:",resultsUid);
        return resultsUid;
    }).fail((error) => {
        console.log("Results.js line 26: getFBResultsDetails:", error);
        return error;
    });
}

function addResult(results) {
    console.log("results.js line 38: addUserResult", results);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((resultsId) => {
        console.log("results.js line 39: what is addResult(resultObj)?", resultsId);
        return resultsId;
    });
}

//GET SAVE GAME RESULTS
function getResult(){
    return results.game;
}

//Testing ideas out
function setResult(val) {
    results.uid = val;
}
  
// delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("what is deleteUserResult in line 56 of results.js?", resultsId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultsId}.json`,
        method: 'DELETE'
    }).done((data) => {
        return data;
    });
}

function editResult(results) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'GET',
        // type: 'PUT',
        // data: JSON.stringify(result),
        dataType: 'json'
    }).done((userID) => {
        console.log("results.js line 73: editResult = ?:", editResult);
        return userID;
    });
}

function setResult(obj){
    console.log("results.setResultVars: obj", obj);
    return new Promise((resolve, reject) => {
        results.fbId = obj.fbID ? obj.fbID : results.fbID;
        results.uid = obj.uid ? obj.uid : results.uid;
        resolve(results);
    });
}

//   //call to make object
function makeResultObj(results){
    results = {
        user : user.getUserObj(),
        game_name : null,
        game_result : null
        };    
    console.log("what is makeResultObj(uid) in line 94 of results.js", results);
    return results;
}

//call the function to add results node to firebase and then return all the result object
addResult(results).then((resolve) => {
    console.log("results.js line 100: what is buildResultObj in results.js",resolve);
    makeResultObj();
    return resolve;
    },
    (reject) => {
    console.log("results.js line 104 :DOH! something went wrong with the add UserResult()");
});

module.exports = {   
    addResult,
    deleteResult,
    editResult,
    getResult,
    setResult,
    makeResultObj
};
