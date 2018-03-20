"use strict";

let $ = require('jquery'),
    firebase = require("./fb-config");

// Get trivial
function getTrivia1(user) {
    console.log("url", firebase.getFBsettings().databaseURL);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia.json?orderBy="uid"&equalTo="${user}"`
    }).done((trivia1Data) => {
        return trivia1Data;
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
function getTrivia(gameId) {
    $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/trivia/${gameId}.json`,
    }).done((trivia1Data) => {
        return trivia1Data;
    }).fail((error) => {
        return error;
    });
}

module.exports = {
    getTrivia,
    deleteResult,
    addResult,
    getTrivia1 
};

// not sure if I should condense Trivia questions and quizzes to one folder called games so that it will streamline functions?



