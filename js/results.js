"use strict";

console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./db-interaction"),
    user = require("./user");

    //POST results of quiz to user profile 
// *** Not sure if this will work ***

user.getFBDetails().then((resolve) => {
    console.log("results.js line 14: resolve for getFBDetails", resolve);
});


function addUserResult(userResultObj) {
    console.log("db-interactions line 109: addUserResult", userResultObj);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(userResultObj),
        dataType: 'json'
    }).done((userResultObj) => {
        console.log("what is addResult(resultGameObj)?", userResultObj);
        return userResultObj;
    });
}

// delete results of quiz from user profile
function deleteUserResult(userResultId) {
    console.log("what is deleteUserResult in line 123 of db-interactions?", userResultId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${userResultId}.json`,
        method: 'DELETE'
    }).done((data) => {
        return data;
    });
}

function editUserResult(userResultObj, userResultId) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${userResultId}.json`,
        type: 'PUT',
        data: JSON.stringify(userResultId)
    }).done((data) => {
        return data;
    });
}

module.exports = {
    addUserResult,
    deleteUserResult,
    editUserResult
};

// post game results counter to user uid?
// function correctAnswer (postRef, uid) {
//     postRef.transaction(function(post) {
//         if (post) {
//             if (post.answer && post.answer[uid]){
//                 post.answerCount-- ;
//                 post.answer[uid] = null;
//             } else {
//                 post.answerCount++;
//                 if (!post.answer) {
//                     post.answer = {};
//                 }
//                 post.answer[uid] = true;
//             }
//         }
//         return post;
//     });
// }
