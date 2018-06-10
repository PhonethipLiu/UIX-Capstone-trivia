"use strict";

console.log("new-user js working?");

import firebase from "./fb-config";
import { getFBDetails, addUserFB } from "./new-db-interaction";
let currentUser = {
    uid: null,
    displayName: null,
    fbID: null
};
    

//listens for changed state
firebase.auth().onAuthStateChanged((user) => {
    
    if (user) {
        currentUser.uid = user.uid;
        currentUser.displayName = user.displayName;
        
    } else {
        currentUser.uid = null;
        currentUser.displayName = null;
        currentUser.fbID = null;
    }   
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
    getFBDetails(uid)
    .then((result) => {
        let data = Object.values(result);
        // console.log("user: any data?", data.length);
        if (data.length === 0){
            addUserFB(makeUserObj(uid))
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
  

export default {
    checkUserFB,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    showUser
};