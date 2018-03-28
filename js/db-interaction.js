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
        // console.log("db-interaction.js line 34 -- addUserFB:", fbID);  /* this shows user firebaseID */
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

// GET USER!!!! 
// function getFBDetails(user){
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/user.json?orderBy="uid"&equalTo="${user}"`
//     }).done((resolve) => {
//         console.log("getFBDetails:", resolve);
//         return resolve;
//     }).fail((error) => {
//         console.log("getFBDetails:", error);
//         return error;
//     });
// }


// //Get trivia game
// function getFBResults(uid) {
//     $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${uid}"`,
//     }).done((resolve) => {
//         console.log("bd interaction line 123: trivia json data:", resolve);
//         return resolve;
//     }).fail((error) => {
//         console.log("getFBResults(uid)", error);
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




