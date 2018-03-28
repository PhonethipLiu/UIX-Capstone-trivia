"use strict";

console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./db-interaction"),
    dom = require("./dom-builder"),
    user = require("./user");

let results = {
    uid : user.getUser(),
    game_name : "Testing game name",
    game_result : "test game results"
    };
    //POST results of quiz to user profile 
// *** Not sure if this will work ***

// user.getFBDetails().then((resolve) => {
//     console.log("results.js line 14: resolve for getFBDetails", resolve);
// });

function getResult(uid){
    console.log("line 125 of results.js: what is user uid in results?", uid);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json?orderBy="uid"&equalTo="${uid}"`
    }).done((resultsUid) => {
        console.log("Results.js line 28: getResults:",resultsUid);
        return resultsUid;
    }).fail((error) => {
        console.log("Results.js line 31s: getFBResultsDetails:", error);
        return error;
    });
}

function addResult(results) {
    console.log("results.js line 38: addUserResult", results);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'POST',
        data: JSON.stringify(results),
        dataType: 'json'
    }).done((resultsId) => {
        console.log("results.js line 45: what is addResult(resultObj)?", resultsId);
        return resultsId;
    });
}

//GET SAVE GAME RESULTS
function getResult(){
    return results.game;
}

//Testing ideas out
function setResult(val) {
    results.uid = val;
}
  
// delete results of quiz from user profile
function deleteResult(resultsId) {
    console.log("what is deleteUserResult in line 59 of results.js?", resultsId);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results/${resultsId}.json`,
        method: 'DELETE'
    }).done((data) => {
        return data;
    });
}

function editResult(result) {
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'GET',
        // type: 'PUT',
        // data: JSON.stringify(result),
        dataType: 'json'
    }).done((userID) => {
        console.log("results.js line 66: editResult = ?:", editResult);
        return userID;
    });
}

function setResult(obj){
    console.log("results.setResultVars: obj", obj);
    return new Promise((resolve, reject) => {
        results.fbId = obj.fbID ? obj.fbID : results.fbID;
        results.uid = obj.uid ? obj.uid : results.uid;
        resolve(results);
    });
}

// function showUser(obj){
//     let userDetails = getUserObj();
//     console.log("user.showUser: userDetails:", userDetails);
// }

  /****** why doesn't this work? ******/
//   function buildResultObj() {
//     let resultObj = {
//       uid: user.currentUser.uid,
//       game: dom.quiz,
//       results: $("#quiz-save-result").val()
//     };
//     console.log("what is buildResultObj in line 141 of results.js", resultObj);
//     return resultObj;
//   }

//   //call to make user object
function makeResultObj(resultsObj){
    let resultObj = { 
        game: "",
        game_result: ""
    }; 
    console.log("what is makeResultObj(uid) in line 139 of results.js", resultObj);
    return resultObj;
}

//call the function to add results node to firebase and then return all the result object
addResult(results).then((resultsObj) => {
    console.log("results.js line 113: what is buildResultObj in results.js", resultsObj);
//     makeResultObj(resultsObj);
    },
    (reject) => {
    console.log("results.js line 117 :DOH! something went wrong with the add UserResult()");
});

// check for user results
// function checkUserFB(uid){

//     .then((results) => {
//         let data = Object.values(results);
//         console.log("user: any data?", data.length);
//         if (data.length === 0){
//             console.log("need to add this user to FB", data);
//             db.addResult(makeResultObj())
//             .then((results) => {
//                 console.log("user: user added", uid, results.name);
//                 let resultsObj = {
//                     fbID: results.name,
//                     uid: uid,
//                 };
//                 return results ;
//             }).then((results ) => {
//                 return setResult(results);
//             });
//         } else {
//             console.log("user: already a user", data);
//             var key = Object.keys(results);
//             data[0].fbID = key[0];
//             setResult(data[0]);
//          }
//     });
// }

module.exports = {
    addResult,
    deleteResult,
    editResult,
    getResult,
    setResult
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
