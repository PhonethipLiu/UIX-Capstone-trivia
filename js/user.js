"use strict";

console.log("user js working?");

let firebase = require("./fb-config"),
    db = require("./db-interaction"),
    currentUser = {
        uid: null,
        fbID: null,
        displayName: null
    };
    
 // call logout when page loads to avoid currentUser.uid   
// db.logOut();

//listens for changed state
firebase.auth().onAuthStateChanged((user) => {
    console.log("USERS.js line 18: onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        currentUser.displayName = user.displayName;
        console.log("USERS.js line 19:current user Logged in?", currentUser.uid);
    } else {
        currentUser.uid = null;
        currentUser.fbID = null;
        currentUser.displayName = null;
        console.log("curent user NOT logged in:", currentUser);
    }   
});

function setUserVars(obj){
    console.log("USERS.js line 42: user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        currentUser.fbId = obj.fbId ? obj.fbId : currentUser.fbId;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        currentUser.displayName = obj.displayName ? obj.displayName : currentUser.displayName;
        resolve(currentUser);
    });
}

function showUser(obj){
    let userDetails = getUserObj();
    console.log("USER.js line 51 // user.showUser: userDetails:", userDetails);
}

// check for users
function checkUserFB(uid){
    db.getFBDetails(uid)
    .then((result) => {
        let data = Object.values(result);
        console.log("user: any data?", data.length);
        if (data.length === 0){
            console.log("need to add this user to FB", data);
            db.addUserFB(makeUserObj(uid))
            .then((result) => {
                console.log("user: user added", uid, result.fbId);
                let tmpUser = {
                    fbId: result.fbId,
                    uid: uid,
                    displayName: result.displayName
                };
                return tmpUser;
            }).then((tmpUser) => {
                return setUserVars(tmpUser);
            });
        } else {
            console.log("user: already a user", data);
            var key = Object.keys(result);
            data[0].fbId = key[0];
            setUserVars(data[0]);
        }
    });
}
  
//call to make user object
function makeUserObj(uid){
    let userObj = { 
        uid: uid,
        displayName: uid.displayName
    }; 
    return userObj;
}


function getUser() {
    return currentUser.uid;
}

function setUser(val) {
    currentUser.uid = val;
}

function getUserObj(){
    return currentUser;
}

module.exports = { 
    checkUserFB,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    makeUserObj
    };