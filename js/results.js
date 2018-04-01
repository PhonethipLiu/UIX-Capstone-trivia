"use strict";

// console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./db-interaction"),
    dom = require("./dom-builder"),
    user = require("./user");

// let uid = user.getUserObj();
let results = {
    uid: null,
    gameName : null,
    gameResult :null
};

//POST results of quiz to user profile 
function getResultDetails(uid){
    console.log("line 31 of results.js: what is user uid in results?",uid);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${uid}"`
    }).done((resolve) => {
        console.log("Results.js line 35: getResultDetails",resolve);
        return resolve;
    }).fail((error) => {
        console.log("Results.js line 38: getFBResultsDetails:", error);
        return error;
    });
}

function addResult(results) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((resultsFBid) => {
        console.log("results.js line 34: what is resultsFBid ?", resultsFBid);
        return resultsFBid;
    });
}
  
// // delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("what is deleteUserResult in line 69 of results.js?", resultsId);
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
        // type: 'GET',
        type: 'PUT',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((userId) => {
        console.log("results.js line 86: editResult = ?:", editResult);
        return userId;
    });
}

//GET SAVE GAME RESULTS
function getResult(){
    return results.game_result;
}

//SET RESULT VALUE **** MIGHT NOT NEED!!!
function setResult(val) {
    console.log("what is setResult in line 63 of results.js?", results.uid);
    results.uid = val;
}

function setResultVars(obj){
    console.log("line 92 results.setResultVars: obj", obj);
    return new Promise((resolve, reject) => {
        results.fbId = obj.fbId ? obj.fbId : results.fbId;
        results.uid = obj.uid ? obj.uid : results.uid;
        results.gameName = obj.gameName ? obj.gameName: results.gameName;
        results.gameResult = obj.gameResult ? obj.gameResult: results.gameResult;
        resolve(results);
    });
}
 // call to make object
//  function makeResultObj(gameName, gameResult) {
//     let resultNew = {
//         uid: uid.uid,
//         gameName : gameName,
//         gameResult : gameResult
//     };    
//         console.log("what is currentUser in line 106 of results.js", results.uid);
//         console.log("what is resultNew in line 107 of results.js", resultNew);
//         addResult(resultNew).then((resolve)=> {
//             console.log("results.js line 108: what is addResult(resultNew)?",  resolve);
//         return resolve;
//         });
//     }


//testing
function makeResultObj(gameName, gameResult) {
    user.getUserObj()
    .then((resolve) => {
        let data = Object.values(resolve);
        console.log("what is currentUser in line 110 of results.js", data);
        let resultNew = {
            uid: data.uid,
            gameName : gameName,
            gameResult : gameResult
        };    
        return resultNew;
    }).then((resultNew) => {
        return addResult(resultNew);
        // .then((resolve)=> {
        //     console.log("results.js line 117: what is addResult(resultNew)?",  resolve);
        // return resolve;
        // });
    });
}


// envoking the function to run
// **** Need to use in event listener for modal results **** //
// makeResultObj();


//call the function to add results node to firebase and then return all the result object
// addResult(results).then((resolve) => {
//     makeResultObj(resolve);
//     console.log("results.js line 101: what is addResult(results)?", resolve);
//     return resolve;
//     },
//     (reject) => {
//     console.log("results.js line 104 :DOH! something went wrong with the add UserResult()");
// });

module.exports = {
    getResultDetails,   
    addResult,
    deleteResult,
    editResult,
    getResult,
    setResult,
    setResultVars,
    makeResultObj
};
