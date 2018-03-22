"use strict";

console.log("results js working");

// let $ = require('jquery'),
//     firebase = require("./fb-config"),
//     quiz = require("./dom-builder");
    

// // GET trivia content from firebase
// function getTrivia(gameObj){
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/trivia/${gameObj}.json`
//     }).done((gameObj) => {
//         console.log("get trivia game:", gameObj);
//         return resolve;    
//     }).fail((error) => {
//         console.log("getFBDetails:", error);
//         return error;
//     });
// }

// function addUserFB(userObj){
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/user.json`,
//         type: 'POST',
//         data: JSON.stringify(userObj),
//         dataType: 'json'
//     }).done((fbID) => {
//         console.log("addUserFB:", fbID);
//         return fbID;
//     });
// }