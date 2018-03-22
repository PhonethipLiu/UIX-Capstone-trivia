"use strict";

console.log("db-interaction working");

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
        console.log("getFBDetails:", resolve);
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
    }).done((fbID) => {
        console.log("addUserFB:", fbID);
        return fbID;
    });
}

function updateUserFB(userObj){
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/user/${userObj.fbID}.json`,
        type: 'PUT',
        data: JSON.stringify(userObj),
        dataType: 'json'
    }).done((userID) => {
        console.log("user object", userObj);
        return userID;
    });
}

//return promise
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

function logInGoogle() {
    return firebase.auth().signInWithPopup(provider); 
}

function logOut (){
    return firebase.auth().signOut();
}


// *************************************
// LET THE GAMES BEGIN!!!! 
// *************************************

function getGame(index) {
    console.log("url", firebase.getFBsettings().databaseURL);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia${index}.json`
    }).done((triviaData) => {
        console.log("triviaData :", triviaData);
        return triviaData;

    });
}

//add results of quiz to user profile 
// *** Not sure if this will work ***
function addResult(resultModalObj) {
    console.log("addResult", resultModalObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(resultModalObj),
        dataType: 'json'
    }).done((resultId) => {
        return resultId;
    });
}

// delete results of quiz from user profile
function deleteResult(resultId) {
    $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultId}.json`,
        method: 'DELETE'
    }).done((data) => {
        return data;
    });
}

//Get trivia by gameId
function getTrivia(trivia) {
    $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia/${trivia}.json`,
    }).done((trivia) => {
        console.log("trivia json data:", trivia);
        return trivia;
    }).fail((error) => {
        return error;
    });
}

module.exports = {
    getFBDetails,
    addUserFB,
    updateUserFB,
    createUser,
    loginUser,
    logInGoogle,
    logOut,
    getGame,
    deleteResult,
    addResult,
    getTrivia
};

// not sure if I should condense Trivia questions and quizzes to one folder called games so that it will streamline functions?



