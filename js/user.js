"use strict";

console.log("user js working?");

let firebase = require("./fb-config"),
    db = require("./db-interaction"),
    currentUser = {
        uid: null
    };
    
 // call logout when page loads to avoid currentUser.uid   
// db.logOut();

//listens for changed state
firebase.auth().onAuthStateChanged((user) => {
    console.log("USERS.js line 18: onAuthStateChanged", user);
    if (user) {
        currentUser.uid = user.uid;
        console.log("USERS.js line 21:current user Logged in?", currentUser.uid);
    } else {
        currentUser.uid = null;
        console.log("curent user NOT logged in:", currentUser);
    }   
});

function setUser(val) {
    console.log("users.js line 30: what is the getUser()", currentUser.uid);
    currentUser.uid = val;
}

function getUser() {
    return currentUser.uid;
}
function getUserObj(){
    console.log("users.js line 38: what is the getUser()", currentUser);
    return currentUser;
}

function setUserVars(obj){
    console.log("USERS.js line 42: user.setUserVars: obj", obj);
    return new Promise((resolve, reject) => {
        // currentUser.fbId = obj.fbId ? obj.fbId : currentUser.fbId;
        currentUser.uid = obj.uid ? obj.uid : currentUser.uid;
        resolve(currentUser);
    });
}

function showUser(obj){
    let userDetails = getUserObj();
    console.log("user.showUser: userDetails:", userDetails);
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
                console.log("user: user added", uid, result.name);
                let tmpUser = {
                    fbId: result.name,
                    uid: uid
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
        // fbID: name
    }; 
    return userObj;
}

module.exports = { 
    checkUserFB,
    getUser,
    setUser,
    setUserVars,
    getUserObj,
    makeUserObj
    };