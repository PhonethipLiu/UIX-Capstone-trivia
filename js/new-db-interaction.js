"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config"),
    provider = new firebase.auth.GoogleAuthProvider();
    
/**********************************/
//         USER CALL TO FB
/**********************************/

// POST - Submits data to be processed to a specified resource.
// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource.


//*** GET USER ***//
function getFBDetails(user){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        console.log("*********** new-db line 19: getFBDetails resolve  ***********", resolve);
        return resolve;
    }).fail((error) => {
        console.log("getFBDetails:", error);
        return error;
    });
}

//*** SET USER / Submits data to user ***//
function addUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json`,
        type: 'POST',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((fbID) => {
        console.log("*********** new-db-interaction line 34: addUserFB fbID *********** ", fbID);  /* this shows user firebaseID */
        return fbID;
    });
}

// UPDATE USER data //
function updateUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.fbID}.json`,
        type: 'PUT',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userId) => {
        console.log("*********** new-db-interaction line 46: updateUserFB ***********", userId);
        return userId;
    });
}

// login with Gmail account info
function logInGoogle() {
    return firebase.auth().signInWithPopup(provider); 
}

function logOut (){
    return firebase.auth().signOut();
}

// *************************************
// RESULTS CALL TO FIREBASE
// *************************************

// POST - Submits data to be processed to a specified resource.
// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource.

// GET RESULTS 
function getResultDetails(user){
    console.log("db.js: line 84 what is user uid in results?",user);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        console.log("*********** new-db-interaction line 81: getResultDetails resolve ************",resolve);
        return resolve;
    }).fail((error) => {
        console.log("db.js:Results.js line 38: getFBResultsDetails:", error);
        return error;
    });
}

// POST RESULTS / add data to FB
// function addResult(results) {
//     console.log("db.js: Line 97 results addUserResult", results);
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/results.json`,
//         type: 'POST',
//         data: JSON.stringify(results),
//         dataType: 'json'
//     }).done((results) => {
//         console.log("*********** new-db-interaction line 98: what is addResult(results)? ***************", results);
//         return results;
//     });
// }
  
// delete results of quiz from user profile
function deleteResult(fbID) {
    console.log("*********** new-db-interaction line 105 what is deleteUserResult(fbID)? ****************", fbID);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${fbID}.json`,
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
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((userId) => {
        console.log("db.js:line 128, what is editResult?:", editResult);
        return userId;
    });
}

    module.exports = {
        getFBDetails,
        addUserFB,
        updateUserFB,
        logInGoogle,
        logOut,
        getResultDetails,   
        /*addResult,*/
        deleteResult,
        editResult
    };    