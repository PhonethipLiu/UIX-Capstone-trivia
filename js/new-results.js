"use strict";

// console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./new-db-interaction"),
    dom = require("./dom-builder"),
    user = require("./new-user");

// let uid = user.getUserObj();

let results = {
    uid: null,
    gameName : null,
    gameResult :null
};

//POST results of quiz to user profile 
function getResultDetails(user){
    console.log("line 20 of results.js: what is user uid in results?", user);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        console.log("Results.js line 24: getResultDetails",resolve);
        return resolve;
    }).fail((error) => {
        console.log("Results.js line 28: getFBResultsDetails:", error);
        return error;
    });
}

function addResult(results) {
    console.log("RESULTS line 34:What is results",  results);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((resultsfbID) => {
        console.log("results.js line 39: what is results?", resultsfbID, results.gameName, results.gameResult); /* This is the updated data for results with saved game results and game name */
        return resultsfbID;
    });
}
  
// // delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("RESULTS.JS line 46: what is deleteUserResult?", resultsId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultsId}.json`,
        method: 'DELETE'
    }).done((data) => {
        console.log("RESULTS.JS line 51: deleteResult = data resolve:", data);
        return data;
    });
}

function editResult(results) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'GET',
        // type: 'PUT',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((fbId) => {
        console.log("results.js line 63: editResult = fbID?:", fbId);/* This returns the FBid for this node*/
        return fbId;
    });
}

//GET SAVE GAME RESULTS
function getResult(){
    return results.gameResult;
}

//SET RESULT VALUE **** MIGHT NOT NEED!!!
function setResult(val) {
    console.log("what is setResult in line 63 of results.js?", results.uid);
    results.uid = val;
}

// function setResultVars(obj){
//     console.log("line 92 results.setResultVars: obj", obj);
//     return new Promise((resolve, reject) => {
//         results.fbId = obj.fbId ? obj.fbId : results.fbId;
//         results.uid = obj.uid ? obj.uid : results.uid;
//         results.gameName = obj.gameName ? obj.gameName: results.gameName;
//         results.gameResult = obj.gameResult ? obj.gameResult: results.gameResult;
//         resolve(results);
//     });
// }

 // call to make object // function is being envoked in dombuilder.js line 174
 function makeResultObj(gameName, gameResult) {
    dom.getTrivia()
    .then((resolve) => {
        let data = Object.values(resolve);
        console.log("***** NEW-result.js line 97; make call for trivia resolve", data[0]); /* This returns the first object of trivia */
    
        let resultNew = {
            uid: user.getUser(),
            gameName : data[0].name,
            gameResult : data[0].results[2]
        };    
    addResult(resultNew);
        // console.log("what is currentUser in line 96 of results.js",results.uid.uid); /* This returns the user uid to results node */
        console.log("what is resultNew in line 107 of results.js", resultNew);
    });
}

module.exports = {
    getResultDetails,   
    addResult,
    deleteResult,
    editResult,
    getResult,
    setResult,
    // setResultVars,
    makeResultObj
};
