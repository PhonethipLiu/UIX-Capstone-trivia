"use strict";

// console.log("db-interaction working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    quiz = require("./dom-builder"),
    provider = new firebase.auth.GoogleAuthProvider();

// *************************************
// DB INTERACTION USING FIREBASE
// *************************************

// GET USER!!!! 
function getFBDetails(user){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json?orderBy="uid"&equalTo="${user}"`
    }).done((resolve) => {
        // console.log("db: line 19: getFBDetails:", resolve);
        return resolve;
    }).fail((error) => {
        console.log("getFBDetails:", error);
        return error;
    });
}

function addUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user.json`,
        type: 'POST',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((fbId) => {
        // console.log("db-interaction.js line 34 -- addUserFB:", fbID);  /* this shows user firebaseID */
        return fbId;
    });
}

function updateUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.fbId}.json`,
        type: 'PUT',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userId) => {
        console.log("db-interaction.js line 46 --user object", userObj);
        return userId;
    });
}

//create user with email login return promise
function createUser(userObj){
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error:", errorCode, errorMessage);
    });
}

function loginUser(userObj){
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
    .catch(function(error){
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log("error:", errorCode, errorMessage);
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
// GET RESULTS
// *************************************

//POST results of quiz to user profile 
function getResultDetails(uid){
    console.log("db.js: line 84 what is user uid in results?",uid);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${uid}"`
    }).done((resolve) => {
        console.log("db.js:Results.js line 35: getResultDetails",resolve);
        return resolve;
    }).fail((error) => {
        console.log("db.js:Results.js line 38: getFBResultsDetails:", error);
        return error;
    });
}

function addResult(results) {
    console.log("db.js: Line 97 results addUserResult", results);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((results) => {
        console.log("results.js line 40x: what is addResult(results)?", results);
        return results;
    });
}
  
// delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("db.js: line 111, what is deleteUserResult?", resultsId);
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
        console.log("db.js:line 128, what is editResult?:", editResult);
        return userId;
    });
}

module.exports = {
    getFBDetails,
    addUserFB,
    updateUserFB,
    // createUser, 
    // loginUser,
    logInGoogle,
    logOut,
    getResultDetails,   
    addResult,
    deleteResult,
    editResult
    // getGame,
    // getTrivia
};




