"use strict";

console.log("results js working");

let $ = require('jquery'),
    firebase = require("./fb-config"),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user");

let results = {
        uid: null,
        fbID: null,
        game: null
    };

    //POST results of quiz to user profile 
// *** Not sure if this will work ***

// user.getFBDetails().then((resolve) => {
//     console.log("results.js line 14: resolve for getFBDetails", resolve);
// });

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
        url: `${firebase.getFBsettings().databaseURL}/results.json`,
        type: 'PUT',
        data: JSON.stringify(userResultId)
    }).done((data) => {
        console.log("editUserResult = ?:", editUserResult);
        return data;
    });
}

function setUserResult(obj){
    console.log("result.setUserResult(obj)", obj);
    return new Promise((resolve, reject) => {
        results.fbId = obj.fbID ? obj.fbID : results.fbID;
        results.uid = obj.uid ? obj.uid : results.uid;
        results.game = obj.game ? obj.game : results.game;
        resolve(results);
    });
}

//call to make user object
function makeResultObj(uid){
    let resultObj = { 
        uid: uid,
        fbID: name,
        game: results.game
    }; 
    return resultObj;
}


// function showUser(obj){
//     let userDetails = getUserObj();
//     console.log("user.showUser: userDetails:", userDetails);
// }

// check for user results
function checkUserFB(uid){
    db.getFBDetails(uid)
    .then((results) => {
        let data = Object.values(results);
        console.log("user: any data?", data.length);
        if (data.length === 0){
            console.log("need to add this user to FB", data);
            db.addUserResult(makeResultObj(uid))
            .then((result) => {
                console.log("user: user added", uid, results.name);
                let tmpUserResult = {
                    fbID: results.name,
                    uid: uid,
                   game: results.game
                };
                return tmpUserResult;
            }).then((tmpUserResult) => {
                return setUserResult(tmpUserResult);
            });
        } else {
            console.log("user: already a user", data);
            var key = Object.keys(results);
            data[0].fbID = key[0];
            setUserResult(data[0]);
        }
    });
}


//GET SAVE GAME RESULTS
function getUserResult(){
    return results.game;
}

//Testing ideas out

function setUserResult(val) {
    results.uid = val;
}
  
  
  /****** why doesn't this work? ******/
  function buildResultObj() {
    let resultsObj = {
      uid: user,
      game: templates.quiz,
      results: $("#quiz-save-result").val()
    };
    console.log("what is buildResultObj in main.js", buildResultObj);
    return resultsObj;
  }
  
  editUserResult().then((resolve) => {
    console.log("what is buildResultObj in main.js", resolve);
    buildResultObj(resolve);
},
(reject) => {
    console.log("DOH! something went wrong");
});

module.exports = {
    addUserResult,
    deleteUserResult,
    editUserResult,
    getUserResult,
    setUserResult
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
