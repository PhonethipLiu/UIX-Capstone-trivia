"use strict";

console.log("new-user js working?");

let firebase = require("./fb-config"),
    db = require("./new-db-interaction"),
    
    currentUser = {
        uid: null,
        displayName: null,
        fbID: null
    };
    
 // call logout when page loads to avoid currentUser.uid 
// db.logOut();

//listens for changed state
firebase.auth().onAuthStateChanged((user) => {
    // console.log("USERS.js line 18: onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        currentUser.displayName = user.displayName;
        // console.log("***   NEW-USERS.js line 23: current user Logged in? ****** ", currentUser);
    } else {
        currentUser.uid = null;
        currentUser.displayName = null;
        currentUser.fbID = null;
        // console.log("**** NEW-USERS.js: curent user NOT logged in: ****** ", currentUser);
    }   
    // console.log("****  NEW-USERS.js line 30: current user Logged in?*****  ", currentUser);
});

function getUser() {
    console.log("****** NEW-USERS.js line 34: getUser() currentUser.uid Logged in? ******", currentUser.uid);
    return currentUser.uid;
}

function setUser(val) {
    console.log("****** NEW-USERS.js line 39: setUser, val *****", val);
    currentUser.uid = val;
    console.log("****** NEW-USERS.js line 41: USER setUser currentUser *****", currentUser);
}

function getUserObj(){
    console.log("**** NEW-USERS.js line 45:  getUserObj currentUser *****", currentUser);
    return currentUser;
}

function getUserName(){
    return currentUser.displayName;
}

function setUserVars(obj){
    // console.log("USERS.js line 54: user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        currentUser.fbID = obj.fbID ? obj.fbID : currentUser.fbID;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        currentUser.displayName = obj.displayName ? obj.displayName : currentUser.displayName;
        resolve(currentUser);
    });
}

function showUser(obj){
    // let userDetails = getUserObj();
    let userDetails = getUserName();
    console.log("**** NEW-USER.js line 66 // user.showUser: userDetails:", userDetails);
    $(".sidebar").prepend(`<h3 class="display-name"> Hi ${userDetails}</h3>`);
}

// call to make user object
function makeUserObj(uid){
    let userObj = { 
        uid: uid,
        displayName: uid.displayName
    }; 
    return userObj;
}

//  check for users
function checkUserFB(uid){
    db.getFBDetails(uid)
    .then((result) => {
        let data = Object.values(result);
        // console.log("user: any data?", data.length);
        if (data.length === 0){
            // console.log("**** New-user line 86: need to add this user to FB", data);
            db.addUserFB(makeUserObj(uid))
            .then((result) => {
                // console.log("user: user added", uid, result.name);
                let tmpUser = {
                    fbID: result.name,
                    uid: uid,
                    displayName: result.displayName
                };
                return tmpUser;
            }).then((tmpUser) => {
                return setUserVars(tmpUser);
            }).then((userObj) => {
                return getUserName(userObj);
            });
        } else {
            // console.log("user: already a user", data);
            var key = Object.keys(result);
            data[0].fbId = key[0];
            setUserVars(data[0])
            .then((resolve) => {
                return resolve;
            });
        }
    });
}
  

module.exports = { 
    checkUserFB,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    showUser
    };