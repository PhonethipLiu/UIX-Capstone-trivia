"use strict";

// console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./new-db-interaction"),
    dom = require("./dom-builder").default,
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
    console.log("RESULTS line 34:What is results", results);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((fbID) => {
        console.log("results.js line 39: what is results?", fbID.name, results.gameName, results.gameResult); /* This is the updated data for results with saved game results and game name */
        return fbID;
    });
}
  
// // delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("RESULTS.JS line 46: what is deleteUserResult?", resultsId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultsId[0]}.json`,
        method: 'DELETE'
    }).done((data) => {
        console.log("RESULTS.JS line 51: deleteResult = data resolve:", data);
        return data;
    });
}


function editResult(resultsId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultsId}.json`,
        type: 'GET',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((data) => {
        console.log("results.js line 66: editResult = fbID?:", data);/* This returns the FBid for this node*/
        return data;
    });
}

 // call to make object // function is being envoked in dombuilder.js line 174
 function makeResultObj(gameName, gameResult) {
    dom.getTrivia()
    .then((resolve) => {
        let data = Object.values(resolve);
        console.log("***** NEW-result.js line 87; make call for trivia resolve", data[0]); /* This returns the first object of trivia */

        let resultNew = {
            uid: user.getUser(),
            gameName : data[0].name,
            gameResult : data[0].results[2],
        }; 

        // let fbID = addResult(resultNew);
        addResult(resultNew);
        //     .then(result)

        // console.log("fbID", fbID);

        // // resultNew.fbID = addResult(resultNew);

        // alert("resultNew", resultNew);

        return dom.printGameResults(resultNew);
         });
}



module.exports = {
    getResultDetails,   
    addResult,
    deleteResult,
    editResult,
    makeResultObj
};
