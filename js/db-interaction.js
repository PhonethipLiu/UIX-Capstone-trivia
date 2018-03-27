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
        console.log("db-interaction.js line 34 -- addUserFB:", fbID);
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
        console.log("db-interaction.js line 46 --user object", userObj);
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

// function getGame(index) {
//     console.log("url", firebase.getFBsettings().databaseURL);
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/trivia/${index}.json`
//     }).done((triviaData) => {
//         console.log("triviaData :", triviaData);
//         return triviaData;
//     });
// }

// //Get trivia game
// function getTrivia(trivia) {
//     $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/trivia/${trivia}.json`,
//     }).done((trivia) => {
//         console.log("bd interaction line 123: trivia json data:", trivia);
//         return trivia;
//     }).fail((error) => {
//         return error;
//     });
// }


module.exports = {
    getFBDetails,
    addUserFB,
    updateUserFB,
    createUser,
    loginUser,
    logInGoogle,
    logOut
    // ,
    // getGame,
    // getTrivia
};




